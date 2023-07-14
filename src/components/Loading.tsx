/** @jsxImportSource @emotion/react */
import React from "react";
import { css, keyframes } from "@emotion/react";

const fadeIn = keyframes`
  0%: { opacity: 0; }
  50%: { opacity: 0.5; }
  100%: { opacity: 1; }
`;

const loadingStyle = css`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  animation: ${fadeIn} 3s linear infinite;
  justify-content: center;
  align-items: center;
  height: 100vh;
  display: flex;
`;

const Loading: React.FC = () => {
  return <p css={loadingStyle}>Loading ...</p>;
};

export default Loading;
