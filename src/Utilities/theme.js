import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

// Define the colors for both light and dark modes
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
    initialColorMode: 'light', // Sets the default to light mode
    useSystemColorMode: false, // Don't use the system's color mode, use the default value
  },
  colors,
  fonts: {
    body: "Work Sans, sans-serif", // Set body font
    heading: "Work Sans, sans-serif", // Set heading font
  },
  textStyles: {
    myTextStyle: {
      fontSize: "18px",
      fontWeight: "400",
      lineHeight: "1.8em",
    },
  },
  styles: {
    global: (props) => ({
      '*': {
        textStyle: "myTextStyle",
        boxSizing: 'border-box',
      },
      html: {
        height: '100%',
      },
      body: {
        bg: mode(colors.background.light, colors.background.dark)(props), // Apply background based on mode
        color: mode(colors.text.light, colors.text.dark)(props), // Apply text color based on mode
        minHeight: '100%', // Ensure the background color covers the full page
        margin: 0, // Reset margin for body
        padding: 0, // Reset padding for body
      },
      '#root': {
        height: '100%', // Ensure the root element covers the entire height of the viewport
      },
    }),
  },
});

export default theme;
