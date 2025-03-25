import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { mode } from '@chakra-ui/theme-tools';

const colors = {
  brand: {
    light: '#06e4ed',
    dark: '#ffffff',
  },
  background: {
    light: '#ffffff',
    dark: '#000000',
  },
  text: {
    light: '#000000',
    dark: '#ffffff',
  },
};

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors,
  styles: {
    global: (props) => ({
      body: {
        bg: mode(colors.background.light, colors.background.dark)(props),
        color: mode(colors.text.light, colors.text.dark)(props),
      },
    }),
  },
});


  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
          <App/>
        </ChakraProvider>
      </BrowserRouter>
    </React.StrictMode>
);
