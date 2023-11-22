import { createGlobalStyle } from "styled-components";
import { CartContextProvider } from "@/components/CartContext";

const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'Comfortaa';
  src: local('Comfortaa Regular'), local('Comfortaa-Regular'),
       url('/fonts/static/Comfortaa-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Comfortaa';
  src: local('Comfortaa Bold'), local('Comfortaa-Bold'),
       url('/fonts/static/Comfortaa-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}

body {
  background-color: #DDD0C8;
  padding: 0;
  margin: 0;
  font-family: 'Comfortaa', sans-serif;
}
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}
