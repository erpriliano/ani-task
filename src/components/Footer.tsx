/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { MY_GH_URL } from "../utils/constants";

const footerStyle = css({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80px",
  width: "100%",
  backgroundColor: "#333",
  color: "#fff",
});

const footerText = css({
  fontSize: "12px",
  fontWeight: "lighter",

  "& a": {
    color: "#fff",
    textDecoration: "none",
  },

  "& a:hover": {
    color: "#b7d0ea",
  },
});

const Footer: React.FC = () => {
  return (
    <footer css={footerStyle}>
      <p css={footerText}>
        &copy; 2023 -{" "}
        <a
          href={MY_GH_URL}
          target="_blank"
          rel="norefferer noopener noreferrer"
        >
          erprilianoAbbas
        </a>
      </p>
    </footer>
  );
};

export default Footer;
