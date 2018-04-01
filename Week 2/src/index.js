import React from "react";
import { render } from "react-dom";
import Demo from "./demo";
import { MuiThemeProvider, createMuiTheme } from 'material-ui-next/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#0D47A1' }, //#00135F
    secondary: { main: '#FF1744' }, //#E20A17
  },
});

const rootElement = document.querySelector("#root");
if (rootElement) {
  render(
    <MuiThemeProvider theme={theme}>
      <Demo/>
    </MuiThemeProvider>,
    rootElement
  );
}
