/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { Card, NoCollection, PageTitle } from "../components";
import { Link } from "react-router-dom";

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
  const data = localStorage.getItem("collection");
  const parsedData =
    data !== null && data !== undefined ? JSON.parse(data) : [];

  if (data === null) return <NoCollection />;

  return (
    <div style={{ padding: "24px" }}>
      <PageTitle title="My Collection" />
      <div css={contentWrapperStyle}>
        {parsedData.map((media: any) => (
          <Link key={media.id} to={`/detail/${media.id as string}`}>
            <Card {...media} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyCollection;
