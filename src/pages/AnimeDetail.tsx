/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/** @jsxImportSource @emotion/react */
import React, { Fragment, useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { css } from "@emotion/react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_MEDIA_BY_ID } from "../api/query";
import { ErrorText, Loading, PageTitle } from "../components";
import { type MediaByIdData } from "../api/interface";
import {
  COLLECTIONS,
  MAX_LENGTH,
  MY_ANIME_COLLECTION,
  REGEX,
} from "../utils/constants";
import { getLocalStorageValue } from "../utils/localStorage";

const selectCustomStyle = {
  option: (baseStyle: any, state: any) => ({
    ...baseStyle,
    color: state.isFocused ? "#fff" : "#000",
    backgroundColor: state.isFocused ? "#FF8D07" : "#fff",
  }),
};

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

const errorTextStyle = css({
  color: "red",
  marginTop: "8px",
  fontSize: "12px",
});

const AnimeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const animatedComponents = makeAnimated();
  const [collectionName, setCollectionName] = useState<string>("");
  const [selectedCollection, setSelectedCollection] = useState<string[]>([]);
  const [collectionList, setCollectionList] = useState<string[]>([]);
  const [myCollectionList, setMyCollectionList] = useState<string[]>([]);
  const [isCollectionExist, setIsCollectionExist] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const { loading, error, data } = useQuery<MediaByIdData>(GET_MEDIA_BY_ID, {
    variables: { id },
  });

  const handleCreateCollection = (): void => {
    const collections = getLocalStorageValue(COLLECTIONS);

    if (collectionName === null || collectionName === "") {
      setErrorText("Collection name cannot be empty");
      return;
    } else if (
      !REGEX.test(collectionName) ||
      collectionName.length > MAX_LENGTH
    ) {
      setErrorText(
        "Collection name must be alphanumeric and max 10 characters",
      );
      return;
    } else {
      if (collections.length === 0) {
        collections.push(collectionName);
      } else {
        const check = collections.some(
          (collection: any) => collection === collectionName,
        );

        if (check) {
          setErrorText("Collection already exists");
        } else {
          collections.push(collectionName);
        }
      }
      localStorage.setItem(COLLECTIONS, JSON.stringify(collections));
    }
    setIsCollectionExist(true);
    setCollectionList(collections);
    setCollectionName("");
    setErrorText("");
  };

  useEffect(() => {
    const collections = getLocalStorageValue(COLLECTIONS);

    if (collections.length > 0) {
      setIsCollectionExist(true);
      setCollectionList(collections);
    }
  }, []);

  useEffect(() => {
    const myAnimeCollection = getLocalStorageValue(MY_ANIME_COLLECTION);

    const detailAnime = myAnimeCollection.filter(
      (media: any) => media.id === data?.Media.id,
    )[0];

    if (detailAnime) {
      setMyCollectionList(detailAnime.collectionName);
    }
  }, [data]);

  const saveAnimeToCollection = (collections: string[]): void => {
    if (collections.length === 0) {
      alert("Please choose a collection");
      return;
    }

    const myAnimeCollection = getLocalStorageValue(MY_ANIME_COLLECTION);

    let detailAnime = myAnimeCollection.filter(
      (media: any) => media.id === data?.Media.id,
    )[0];

    if (!detailAnime) {
      detailAnime = {
        ...data?.Media,
        collectionName: collections,
      };
      myAnimeCollection.push(detailAnime);
      localStorage.setItem(
        MY_ANIME_COLLECTION,
        JSON.stringify(myAnimeCollection),
      );
    } else {
      const getExistingCollection = detailAnime.collectionName;
      const newCollection = [
        ...new Set([...getExistingCollection, ...collections]),
      ];

      const filteredCollection = myAnimeCollection.filter(
        (media: any) => media.id !== data?.Media.id,
      );

      detailAnime = {
        ...data?.Media,
        collectionName: newCollection,
      };

      filteredCollection.push(detailAnime);
      localStorage.setItem(
        MY_ANIME_COLLECTION,
        JSON.stringify(filteredCollection),
      );
    }
    setMyCollectionList(detailAnime.collectionName);
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
          <p data-testid="anime-title">{data?.Media.title.romaji}</p>
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
        {myCollectionList.length > 0 && (
          <div style={{ marginTop: "24px" }}>
            <PageTitle title="Collections" />
            <div style={{ display: "flex", gap: "4px", marginTop: "10px" }}>
              {myCollectionList.map((collection) => (
                <Link key={collection} to={`/my-collection/${collection}`}>
                  {collection}
                </Link>
              ))}
            </div>
          </div>
        )}
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
            <p css={errorTextStyle}>{errorText}</p>
            <div css={ctaStyle}>
              <button onClick={handleCreateCollection}>
                Create Collection
              </button>
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
                styles={selectCustomStyle}
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={[]}
                isMulti
                options={collectionList?.map((collection: string) => ({
                  value: collection,
                  label: collection,
                }))}
                onChange={(e) => {
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
