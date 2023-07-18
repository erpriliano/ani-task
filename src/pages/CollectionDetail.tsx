/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useParams } from "react-router-dom";
import { Card, PageTitle } from "../components";
import { MY_ANIME_COLLECTION } from "../utils/constants";
import { getLocalStorageValue } from "../utils/localStorage";

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

const CollectionDetail: React.FC = () => {
  const { media } = useParams<{ media: string }>();
  const [myCollection, setMyCollection] = useState<any>([]);

  useEffect(() => {
    const myAnimeCollection = getLocalStorageValue(MY_ANIME_COLLECTION);

    const dataCollection = myAnimeCollection.filter((item: any) =>
      item.collectionName.includes(media),
    );
    setMyCollection(dataCollection);
  }, []);

  const handleRemove = (id: number): void => {
    const myAnimeCollection = getLocalStorageValue(MY_ANIME_COLLECTION);

    const updatedCollections = myAnimeCollection.map((collection: any) => {
      if (collection.id === id) {
        collection.collectionName = collection.collectionName.filter(
          (data: any) => data !== media,
        );
      }
      return collection;
    });

    localStorage.setItem(
      MY_ANIME_COLLECTION,
      JSON.stringify(updatedCollections),
    );

    const filteredCollection = updatedCollections.filter((collection: any) =>
      collection.collectionName.includes(media),
    );

    setMyCollection(filteredCollection);
  };

  return (
    <div css={pageWrapperStyle}>
      <PageTitle title={media} />
      <div css={contentWrapperStyle}>
        {myCollection.length === 0 && <p>Still empty :(</p>}
        {myCollection.map((data: any) => (
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          <Card
            key={data.id}
            {...data}
            cta={media !== null}
            handleRemove={() => {
              handleRemove(data.id);
            }}
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            to={`/detail/${data.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionDetail;
