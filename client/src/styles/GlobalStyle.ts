import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;600&family=Source+Code+Pro:wght@400;600&display=swap');

  * {
    margin: 0;
    padding: 0;
    border: 0;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 16px;
    font-weight: normal;
    color: white;
    strong {
      font-weight: 600;
    }
  }
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
  html {
    overflow-y: auto;
    ::-webkit-scrollbar {
      width: 12px;
      height: 125px;
    }
    
    ::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.darkGray};
      border-radius: 6px;
    }

    ::-webkit-scrollbar-track {
      background-color: ${({ theme }) => theme.black};
    }
  }
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
    margin: 0;
    padding: 0;
    border: 0;
  }
  ol, ul, li {
    list-style: none;
  }
  a { 
    text-decoration: none;
    color: inherit;
  }
  img { 
    max-width: 100%;
    border: 0;
    vertical-align: middle;
  }
  input, select, button, textarea {
    vertical-align: middle;
  }
  button, input[type=button] {
    cursor: pointer;
  }
  table { 
    border-collapse: collapse;
  }
  button { 
    background-color: transparent;
  }
  textarea {
    resize: none;
  }
  a:link, a:visited, a:hover, a:active {
    text-decoration: none;
  }
`
