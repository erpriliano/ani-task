/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

const textStyle = css`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  justify-content: center;
  align-items: center;
  height: 100vh;
  display: flex;

  & a {
    color: #ff8d07;
    margin-left: 6px;
  }
`;

const NoCollection: React.FC = () => {
  return (
    <p css={textStyle}>
      Go add your <Link to="/">collection</Link>
    </p>
  );
};

export default NoCollection;
