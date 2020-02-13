import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  #root {
    display: grid;
    height: 100vh;
    grid-template-columns: 100px 250px 1fr;
    grid-template-rows: auto 1fr auto;
  }
`;
