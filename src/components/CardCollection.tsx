/* eslint-disable @typescript-eslint/restrict-template-expressions */
/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

interface CardCollectionProps {
  to: string;
  imgUrl: string;
  media: string;
  info: string;
}

const titleStyle = css({
  width: "100%",
  textAlign: "center",
  fontWeight: "bold",
  letterSpacing: "2px",
});

const infoWrapperStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "10px",
  width: "100%",
});

const infoTextStyle = css({
  fontSize: "12px",
  fontWeight: "lighter",
  textAlign: "center",
});

const cardStyle = css({
  backgroundColor: "#7d7d7d",
  width: "100%",
  boxShadow: "#3f3f46 0px 0px 10px 2px;",
  display: "flex",

  "& a": {
    width: "100%",
    padding: "4px",

    "& img": {
      width: "100%",
      objectFit: "cover",
      borderRadius: "5px",
    },
  },
});

const CardCollection: React.FC<CardCollectionProps> = ({
  to,
  imgUrl,
  media,
  info,
}) => {
  return (
    <div css={cardStyle}>
      <Link to={to}>
        <img src={imgUrl} width={150} height={150} alt={media} />
      </Link>
      <div css={infoWrapperStyle}>
        <p css={titleStyle}>{media}</p>
        <p css={infoTextStyle}>{info}</p>
      </div>
    </div>
  );
};

export default CardCollection;
