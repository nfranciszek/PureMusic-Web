import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

const colors = {
  brand: {

    light: '#06e4ed',  // Example primary color for light mode
    dark: '#ffffff',   // Example primary color for dark mode
  },
background: {
  light: '#ffffff',  // Background color for light mode
  dark: '#000000',   // Background color for dark mode
},
text: {
  light: '#000000',  // Text color for light mode
  dark: '#ffffff',   // Text color for dark mode
},
};

const theme = extendTheme({
config: {
  initialColorMode: 'dark', // Force dark mode
  useSystemColorMode: false, // Disable system preference
},
colors, // Your color scheme
styles: {
  global: (props) => ({
    body: {
      bg: props.colorMode === 'dark' ? colors.background.dark : colors.background.light,
      color: props.colorMode === 'dark' ? colors.text.dark : colors.text.light,
    },
  }),
},
});

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
      <ChakraProvider theme={theme}>
          <App/>
        </ChakraProvider>
      </BrowserRouter>
    </React.StrictMode>
);
