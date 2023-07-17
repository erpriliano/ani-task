import React, { Fragment } from "react";
import { Global, css } from "@emotion/react";
import { Route } from "react-router-dom";

import { Layout } from "./components";
import { AnimeDetail, CollectionDetail, Home, MyCollection } from "./pages";

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #676767;
    font-family: Montserrat, sans-serif;
    color: #fff;
  }

  a {
    text-decoration: none;
    color: #fff;
  }
`;

function App(): React.ReactElement {
  return (
    <Fragment>
      <Global styles={globalStyles} />
      <Layout>
        <Route path="/" element={<Home />} />
        <Route path="/my-collection" element={<MyCollection />} />
        <Route path="/detail/:id" element={<AnimeDetail />} />
        <Route path="/my-collection/:media" element={<CollectionDetail />} />
      </Layout>
    </Fragment>
  );
}

export default App;
