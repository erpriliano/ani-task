/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { type Media } from "../api/interface";

type CardProps = Omit<Media, "id">;

const cardStyle = css({
  width: "240px",
  height: "180px",
  backgroundColor: "#7d7d7d",
  borderRadius: "10px",
  padding: "10px",
  display: "flex",
  alignItems: "center",
  boxShadow: "#3f3f46 0px 0px 10px 2px;",

  "& a": {
    textDecoration: "none",
    color: "black",
  },

  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "5px",
  },

  "@media (max-width: 768px)": {
    width: "100%",
  },
});

const contentStyle = css({
  marginLeft: "12px",
  padding: "10px",
  display: "flex",
  justifyContent: "center",
  flex: 1,
  height: "100%",
  flexDirection: "column",

  "& h3": {
    fontSize: "20px",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  "& h5": {
    display: "none",
  },

  "& p": {
    fontSize: "12px",
    marginTop: "4px",
  },

  "@media (max-width: 768px)": {
    "& h3": {
      fontSize: "16px",
    },

    "& h5": {
      marginTop: "6px",
      display: "block",
      fontSize: "12px",
    },
  },

  "@media (min-width: 768px)": {
    "& h3": {
      display: "none",
    },

    "& h5": {
      marginTop: "6px",
      fontSize: "12px",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
});

const getGenres = (genres: string[]): string => {
  return genres.slice(0, 3).join(", ") + ", more...";
};

const Card: React.FC<CardProps> = ({
  title,
  coverImage,
  averageScore,
  genres,
}) => {
  return (
    <div css={cardStyle}>
      <div style={{ height: "" }}>
        <img src={coverImage.medium ?? ""} alt={title.english} />
      </div>
      <div css={contentStyle}>
        <h3>{title.english ?? "No English Title"}</h3>
        <h5>{title.romaji}</h5>
        <p>&#9733; {averageScore}</p>
        <p>{getGenres(genres)}</p>
      </div>
    </div>
  );
};

export default Card;
