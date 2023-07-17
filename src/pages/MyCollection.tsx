/* eslint-disable @typescript-eslint/restrict-template-expressions */
/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { CardCollection, NoCollection, PageTitle } from "../components";

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

const MyCollection: React.FC = () => {
  const data = localStorage.getItem("collectionName");
  const myCollection = localStorage.getItem("myCollection");
  const parsedData =
    data !== null && data !== undefined ? JSON.parse(data) : [];
  const parsedCollection =
    myCollection !== null ? JSON.parse(myCollection) : [];

  if (parsedData.length === 0) return <NoCollection />;

  return (
    <div style={{ padding: "24px" }}>
      <PageTitle title="My Collection" />
      <div css={contentWrapperStyle}>
        {parsedData.map((media: any) => {
          const result = parsedCollection.filter((item: any) =>
            item.collectionName.includes(media),
          );

          if (result.length === 0) {
            return (
              <CardCollection
                key={media}
                imgUrl="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                media={media}
                info="No collections"
                to={`/my-collection/${media}`}
              />
            );
          } else {
            return (
              <CardCollection
                key={media}
                imgUrl={result[0].coverImage.medium}
                media={media}
                info={`Has ${result.length} collections`}
                to={`/my-collection/${media}`}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default MyCollection;
