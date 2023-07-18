/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

interface PaginatorProps {
  next: () => void;
  prev: () => void;
}

const paginatorStyle = css({
  marginTop: "24px",
  display: "flex",
  width: "100%",
  justifyContent: "center",
  gap: "24px",

  "& button": {
    padding: "8px 16px",
    borderRadius: "10px",
  },

  "& p": {
    fontSize: "18px",
  },
});

const Paginator: React.FC<PaginatorProps> = ({ next, prev }) => {
  return (
    <div data-testid="paginator" css={paginatorStyle}>
      <button onClick={next}>
        <p>&larr;</p>
      </button>
      <button onClick={next}>
        <p>&rarr;</p>
      </button>
    </div>
  );
};

export default Paginator;
