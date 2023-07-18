/* eslint-disable @typescript-eslint/restrict-template-expressions */
/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { css } from "@emotion/react";
import { CardCollection, NoCollection, PageTitle } from "../components";

const pageWrapperStyle = css({
  padding: "24px",
});

const contentWrapperStyle = css({
  marginTop: "24px",
  display: "grid",

  gridTemplateColumns: "repeat(5, 1fr)",
  gridGap: "24px",
  alignItems: "center",
  justifyItems: "center",

  "@media (max-width: 768px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },

  "@media (max-width: 1024px)": {
    gridTemplateColumns: "repeat(3, 1fr)",
  },

  "@media (max-width: 480px)": {
    gridTemplateColumns: "repeat(1, 1fr)",

    "& a": {
      width: "100%",
    },
  },
});

const headerStyle = css({
  display: "flex",
  justifyContent: "space-between",

  "& button": {
    padding: "8px 16px",
    fontFamily: "inherit",
    fontWeight: "bold",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#FF8D07",
    borderRadius: "50%",
  },
});

const modalContent = css({
  display: "flex",
  flexDirection: "column",
  paddingTop: "24px",

  "& input": {
    padding: "12px 16px",
    borderRadius: "4px",
    fontFamily: "inherit",
    margin: "24px 12px 0px 12px",
  },

  "& button": {
    padding: "8px 16px",
    borderRadius: "10px",
    fontFamily: "inherit",
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "#FF8D07",
    margin: "0 12px 24px 12px",
  },
});

const modalCustomStyle = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  content: {
    height: "fit-content",
    margin: "auto",
    backgroundColor: "#676767",
  },
};

const errorTextStyle = {
  color: "red",
  margin: "6px 0 12px 0",
  fontSize: "12px",
  padding: "0 12px",
};

const MyCollection: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [collectionName, setCollectionName] = useState<string>("");
  const [collections, setCollections] = useState<any>([]);
  const [myCollections, setMyCollections] = useState<any>([]);
  const [errorText, setErrorText] = useState<string>("");

  const handleAddCollection = (): void => {
    const collection = localStorage.getItem("collectionName");
    const parsedCollection = collection !== null ? JSON.parse(collection) : [];
    const maxLength = 10;
    const regex = /^[a-zA-Z0-9\s]+$/;

    if (collectionName === null || collectionName === "") {
      setErrorText("Collection name cannot be empty");
    } else if (
      !regex.test(collectionName) ||
      collectionName.length > maxLength
    ) {
      setErrorText(
        "Collection name must be alphanumeric and max 10 characters",
      );
    } else {
      if (parsedCollection.length === 0) {
        parsedCollection.push(collectionName);
      } else {
        const check = parsedCollection.some(
          (collection: any) => collection === collectionName,
        );

        if (check as boolean) {
          setErrorText("Collection already exist");
        } else {
          parsedCollection.push(collectionName);
        }
      }
      setErrorText("");
      setModalIsOpen(false);
    }

    localStorage.setItem("collectionName", JSON.stringify(parsedCollection));
    setCollectionName("");
    setCollections(parsedCollection);
  };

  useEffect(() => {
    const collection = localStorage.getItem("collectionName");
    const parsedCollection = collection !== null ? JSON.parse(collection) : [];
    const myCollection = localStorage.getItem("myCollection");
    const parsedMyCollection =
      myCollection !== null ? JSON.parse(myCollection) : [];
    setCollections(parsedCollection);
    setMyCollections(parsedMyCollection);
  }, []);

  const handleRemoveCollection = (collectionName: string): void => {
    console.log(collectionName);
    const collections = localStorage.getItem("collectionName");
    const parsedCollections =
      collections !== null ? JSON.parse(collections) : [];
    const myCollection = localStorage.getItem("myCollection");
    const parsedMyCollection =
      myCollection !== null ? JSON.parse(myCollection) : [];

    const updatedCollections = parsedCollections.filter(
      (collection: any) => collection !== collectionName,
    );
    localStorage.setItem("collectionName", JSON.stringify(updatedCollections));

    const updatedMyCollection = parsedMyCollection.map((myCollection: any) => ({
      ...myCollection,
      collectionName: myCollection.collectionName.filter(
        (collection: any) => collection !== collectionName,
      ),
    }));
    localStorage.setItem("myCollection", JSON.stringify(updatedMyCollection));
    setCollections(updatedCollections);
  };

  if (collections.length === 0) return <NoCollection />;

  return (
    <div css={pageWrapperStyle}>
      <Modal
        ariaHideApp={false}
        style={modalCustomStyle}
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setModalIsOpen(false);
        }}
      >
        <div css={modalContent}>
          <h2 style={{ textAlign: "center" }}>Add Collection</h2>
          <input
            type="text"
            value={collectionName}
            onChange={(e) => {
              setCollectionName(e.target.value);
            }}
            onBlur={(e) => {
              setCollectionName(e.target.value);
            }}
          />
          <p css={errorTextStyle}>{errorText}</p>
          <button onClick={handleAddCollection}>Add</button>
        </div>
      </Modal>
      <div css={headerStyle}>
        <PageTitle title="My Collection" />
        <button
          onClick={() => {
            setModalIsOpen(true);
          }}
        >
          +
        </button>
      </div>
      <div css={contentWrapperStyle}>
        {collections.map((media: any) => {
          const result = myCollections.filter((item: any) =>
            item.collectionName.includes(media),
          );

          return (
            <CardCollection
              key={media}
              imgUrl={
                result.length === 0
                  ? "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                  : result[0].coverImage.medium
              }
              media={media}
              info={
                result.length === 0
                  ? "No collections"
                  : `Has ${result.length} collections`
              }
              to={`/my-collection/${media}`}
              removeHandler={() => {
                handleRemoveCollection(media);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MyCollection;
