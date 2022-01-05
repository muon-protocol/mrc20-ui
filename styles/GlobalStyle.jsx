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
      font-family: Montserrat;
      background: #f8f8ff;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
      -moz-osx-font-smoothing: grayscale;
      font-smoothing: antialiased;
      -webkit-font-smoothing: antialiased;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    @font-face {
      font-family: 'Montserrat';
      font-weight:normal;
      src: url(/fonts/montserrat-v18-latin-regular.eot) format('eot'),
        url(/fonts/montserrat-v18-latin-regular.ttf) format('turetype'),
        url(/fonts/montserrat-v18-latin-regular.woff) format('woff');
      font-display: block;
    }
    @font-face {
      font-family: 'Montserrat';
      font-weight:bold;
      src:  url(/fonts/Montserrat-Bold.ttf) format('turetype'),
        url(/fonts/Montserrat-Bold.woff) format('woff');
      font-display: block;
    }
    /* @font-face {
      font-family: 'FH Oscar';
      src: url(/fonts/FHOscar-Regular.eot) format('eot'),
        url(/fonts/FHOscar-Regular.ttf) format('turetype'),
        url(/fonts/FHOscar-Regular.woff) format('woff');
    }

    @font-face {
      font-family: 'Reckless';
      src: url(/fonts/Reckless-Regular.eot) format('eot'),
        url(/fonts/Reckless-Regular.ttf) format('turetype'),
        url(/fonts/Reckless-Regular.woff) format('woff');
    } */

    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type='number'] {
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
