/* eslint-disable @typescript-eslint/restrict-template-expressions */
/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import Modal from "react-modal";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

interface CardCollectionProps {
  to: string;
  imgUrl: string;
  media: string;
  info: string;
  removeHandler?: () => void;
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
  alignItems: "center",
  gap: "10px",
  width: "100%",
});

const ctaStyle = css({
  display: "flex",
  justifyContent: "center",
  width: "100%",

  "& button": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "8px 12px",
    borderRadius: "10px",
    fontFamily: "inherit",
    gap: "4px",
    backgroundColor: "#d95050",
    color: "#fff",
  },
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

const CardCollection: React.FC<CardCollectionProps> = ({
  to,
  imgUrl,
  media,
  info,
  removeHandler,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
          <h1>{media}</h1>
          <h4>{info}</h4>
          <p>Are you sure you want to remove this collection?</p>
          <div>
            <button
              onClick={() => {
                setModalIsOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              onClick={removeHandler}
              style={{ backgroundColor: "#d95050" }}
            >
              Remove
            </button>
          </div>
        </div>
      </Modal>
      <Link to={to}>
        <img src={imgUrl} width={150} height={150} alt={media} />
      </Link>
      <div css={infoWrapperStyle}>
        <p css={titleStyle}>{media}</p>
        <p css={infoTextStyle}>{info}</p>
        <div css={ctaStyle}>
          <button
            onClick={() => {
              setModalIsOpen(true);
              console.log(media);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              width={14}
              height={14}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
            <p>Remove</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardCollection;
