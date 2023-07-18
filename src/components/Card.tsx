/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import Modal from "react-modal";
import { css } from "@emotion/react";
import { type Media } from "../api/interface";
import { Link } from "react-router-dom";

type CardType = Omit<Media, "id">;
interface CardProps extends CardType {
  cta?: boolean;
  to: string;
  handleRemove?: () => void;
}

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

  "& button": {
    padding: "8px 16px",
    borderRadius: "10px",
    fontFamily: "inherit",
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "#FF8D07",
    width: "fit-content",
    margin: "14px auto 0",
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

const modalContent = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",

  "& h2": {
    textAlign: "center",
  },

  "& div": {
    display: "flex",
    marginTop: "18px",
  },

  "& p": {
    fontSize: "14px",
    textAlign: "center",
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

const Card: React.FC<CardProps> = ({
  title,
  coverImage,
  averageScore,
  genres,
  cta = false,
  handleRemove,
  to,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const getGenres = (genres: string[]): string => {
    return genres.slice(0, 3).join(", ") + ", more...";
  };

  return (
    <div css={cardStyle}>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        style={modalCustomStyle}
        onRequestClose={() => {
          setModalIsOpen(false);
        }}
      >
        <div css={modalContent}>
          <h2>{title.english}</h2>
          <p>Are you sure you want to remove this anime from collection?</p>
          <div>
            <button
              onClick={() => {
                setModalIsOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleRemove}
              style={{ backgroundColor: "#d95050" }}
            >
              Remove
            </button>
          </div>
        </div>
      </Modal>
      <div>
        <Link to={to}>
          <img src={coverImage.medium ?? ""} alt={title.english} />
        </Link>
      </div>
      <div css={contentStyle}>
        <h3>{title.english ?? "No English Title"}</h3>
        <h5>{title.romaji}</h5>
        <p>&#9733; {averageScore}</p>
        <p>{getGenres(genres)}</p>
        {cta && (
          <button
            onClick={() => {
              setModalIsOpen(true);
            }}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
