/** @jsxImportSource @emotion/react */
import React from "react";
import { css, keyframes } from "@emotion/react";

interface ErrorTextProps {
  message?: string;
}

const fadeIn = keyframes`
  0%: { opacity: 0; }
  50%: { opacity: 0.5; }
  100%: { opacity: 1; }
`;

const errorTextStyle = css`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  animation: ${fadeIn} 3s linear infinite;
  justify-content: center;
  align-items: center;
  height: 100vh;
  display: flex;
`;

const ErrorText: React.FC<ErrorTextProps> = ({ message }) => {
  return <p css={errorTextStyle}>Error: {message}</p>;
};

export default ErrorText;
