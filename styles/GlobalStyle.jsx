import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }

    html,
    body {
      overflow-y:auto;
      font-family: Koulen;
      color:#000000;
      background: #000;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    @font-face {
      font-family: 'Koulen';
      src:  url(/fonts/Koulen-Regular.ttf);
    }

    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type='number'] {
      font-family: 'Koulen';
      -moz-appearance: textfield;
      -moz-appearance: textfield;
      border:0; 
    }

    .ReactModal__Body--open {
      overflow-y: hidden;
    }

    /* width */
    ::-webkit-scrollbar {
      width: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 20px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

`
export default GlobalStyle
