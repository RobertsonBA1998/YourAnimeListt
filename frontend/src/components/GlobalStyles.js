import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0px;
    background-color:  #1a1a1a;
    font-family: 'Varela Round', sans-serif;
  }

  h1, h2, h3{
   color: #cccccc;
   margin-left: 20px;


   }

  span, p{
    color:white

  }

`;

export default GlobalStyles;
