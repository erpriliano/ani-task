/** @jsxImportSource @emotion/react */
import React, { Fragment, useCallback, useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { css } from "@emotion/react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_MEDIA_BY_ID } from "../api/query";
import { ErrorText, Loading, PageTitle } from "../components";
import { type MediaByIdData } from "../api/interface";

const detailWrapperStyle = css({
  padding: "24px",
});

const bannerStyle = css({
  width: "100%",
  marginBottom: "24px",

  "& img": {
    width: "100%",
    height: "auto",
    objectFit: "cover",
    borderRadius: "6px",
  },
});

const propertyStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  marginTop: "12px",
});

const descriptionStyle = css({
  marginTop: "12px",
  fontSize: "14px",
  lineHeight: "1.25rem",
});

const buttonStyle = css({
  padding: "8px 16px",
  borderRadius: "10px",
  fontFamily: "inherit",
  color: "#fff",
  fontWeight: "bold",
  backgroundColor: "#FF8D07",
});

const createWrapperStyle = css({
  marginTop: "18px",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",

  "& input": {
    padding: "12px 16px",
    borderRadius: "4px",
    fontFamily: "inherit",
  },
});

const ctaStyle = css({
  display: "flex",
  justifyContent: "center",
  marginTop: "24px",

  "& button": buttonStyle,
});

const AnimeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [collectionName, setCollectionName] = useState<string>("");
  const [selectedCollection, setSelectedCollection] = useState<string[]>([]);
  const [collectionList, setCollectionList] = useState<string[]>([]);
  const { loading, error, data } = useQuery<MediaByIdData>(GET_MEDIA_BY_ID, {
    variables: { id },
  });
  const [isCollectionExist, setIsCollectionExist] = useState<boolean>(false);
  const animatedComponents = makeAnimated();

  const createCollection = useCallback((): void => {
    const collection = localStorage.getItem("collectionName");

    if (collection === null) {
      localStorage.setItem("collectionName", JSON.stringify([collectionName]));
      setIsCollectionExist(true);
      setCollectionName("");
    } else {
      const parsedCollection = JSON.parse(collection);
      const check = parsedCollection.some(
        (collection: any) => collection === collectionName,
      );

      if (check as boolean) {
        alert("Collection already exists");
      } else {
        parsedCollection.push(collectionName);
        localStorage.setItem(
          "collectionName",
          JSON.stringify(parsedCollection),
        );
      }
      setCollectionName("");
    }
  }, [collectionName]);

  useEffect(() => {
    const collection = localStorage.getItem("collectionName");

    if (collection === null) {
      setIsCollectionExist(false);
    } else {
      setIsCollectionExist(true);
      setCollectionList(JSON.parse(collection));
    }
  }, [createCollection]);

  const saveAnimeToCollection = (collections: string[]): void => {
    if (collections.length === 0) {
      alert("Please choose a collection");
      return;
    }
    collections.forEach((collection) => {
      const animeCollection = localStorage.getItem(collection);
      if (animeCollection === null) {
        localStorage.setItem(collection, JSON.stringify([data?.Media]));
      } else {
        const parsedCollection = JSON.parse(animeCollection);
        const check = parsedCollection.some(
          (media: any) => media.id === data?.Media.id,
        );
        if (check as boolean) {
          alert("Anime already in collection");
        } else {
          parsedCollection.push(data?.Media);
          localStorage.setItem(collection, JSON.stringify(parsedCollection));
        }
      }
    });
  };

  if (loading) return <Loading />;
  if (error != null) return <ErrorText message={error.message} />;

  return (
    <div css={detailWrapperStyle}>
      <div css={bannerStyle}>
        <img src={data?.Media.bannerImage} alt={data?.Media.title.english} />
      </div>
      <div>
        <PageTitle title={data?.Media.title.english ?? "No English Title"} />
        <div css={propertyStyle}>
          <p>{data?.Media.title.romaji}</p>
          <p>Popularity: {data?.Media.popularity}</p>
          <p>Score: {data?.Media.averageScore}</p>
          <p>
            Year: {data?.Media.startDate.year} - {data?.Media.endDate.year}
          </p>
          <p>Genres: {data?.Media.genres.join(", ")}</p>
          <p>Episodes: {data?.Media.episodes}</p>
        </div>
        <div css={descriptionStyle}>
          <p>{data?.Media.description}</p>
        </div>
        <div style={{ marginTop: "24px" }}>
          <PageTitle title="Create Collection" />
          <div css={createWrapperStyle}>
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
            <div css={ctaStyle}>
              <button onClick={createCollection}>Add Collection</button>
            </div>
          </div>
        </div>
        {isCollectionExist && (
          <Fragment>
            <div style={{ marginTop: "24px" }}>
              <PageTitle title="Your Collection" />
            </div>
            <div
              style={{
                marginTop: "12px",
              }}
            >
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={[]}
                isMulti
                options={collectionList?.map((collection: string) => ({
                  value: collection,
                  label: collection,
                }))}
                onChange={(e) => {
                  console.log(e);
                  setSelectedCollection(
                    e.map((item: any) => item.value as string),
                  );
                }}
              />
            </div>
            <div css={ctaStyle}>
              <button
                onClick={() => {
                  saveAnimeToCollection(selectedCollection);
                }}
              >
                Add to Collection
              </button>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default AnimeDetail;
