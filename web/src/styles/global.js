import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  body {
    background: #15171a no-repeat center top;
    -webkit-font-smoothing: antialiased;
  }
  body, input, button {
    font: 14px Roboto, sans-serif;
  }
  button {
    cursor: pointer;
  }
  #root {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 10px 50px;
  }

`;
