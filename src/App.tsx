import React, { Fragment } from "react";
import { Global, css } from "@emotion/react";

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
`;

function App(): React.ReactElement {
  return (
    <Fragment>
      <Global styles={globalStyles} />
      <div>Hello World</div>
    </Fragment>
  );
}

export default App;
