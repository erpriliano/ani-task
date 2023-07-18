/** @jsxImportSource @emotion/react */
import React, { Fragment } from "react";
import { css } from "@emotion/react";
import { Routes } from "react-router-dom";

import { Header, Footer } from "./index";

interface LayoutProps {
  children: React.ReactNode;
}

const mainStyle = css({
  minHeight: "100vh",
});

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <main css={mainStyle}>
        <Routes>{children}</Routes>
      </main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
