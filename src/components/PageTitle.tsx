/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

interface PageTitleProps {
  title?: string;
}

const pageTitleStyle = css({
  fontSize: "24px",
  paddingBottom: "12px",
  width: "65%",
  borderBottom: "4px solid #ff8d07",
  borderBottomRightRadius: "10%",
});

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return <h1 css={pageTitleStyle}>{title}</h1>;
};

export default PageTitle;
