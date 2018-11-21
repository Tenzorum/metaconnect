import React, { Component } from 'react';
// import logo from './logo.svg';
import Root from "./Root";
// import './App.css';
import { createGlobalStyle } from "styled-components";
import { globalStyles } from "./styles";
const GlobalStyle = createGlobalStyle`${globalStyles}`;



class App extends Component {
  render() {
    return (
      <div>
        <GlobalStyle/>
        <Root/>
      </div>
    );
  }
}

export default App;
