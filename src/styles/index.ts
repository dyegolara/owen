import { createGlobalStyle } from "styled-components";
import "styles/minireset.css";
import "styles/commons.css";

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
}

body,
html {
  width: 100%;
  min-width: 100%;
  height: 100%;
  min-height: 100%;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
}

#app {
  position: relative;
  display: block;
  width: 100%;
  min-width: 100%;
  height: 100%;
  min-height: 100%;
  margin: 0;
  padding: 0;
}
`;

export default GlobalStyle;
