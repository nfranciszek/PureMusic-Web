// Import necessary modules
import { extendTheme } from "@chakra-ui/react";

// Create a custom theme
const theme = extendTheme({
    fonts: {
        body: "Work Sans, sans-serif",
        heading: "Work Sans, sans-serif",
      },
      textStyles: {
        // Define a custom text style
        myTextStyle: {
          fontSize: "18px",
          fontWeight: "400",
          lineHeight: "1.8em",
        },
      },
      // Apply the custom text style to all text elements
      styles: {
        global: {
          // Apply the custom text style to all text elements
          "*": {
            textStyle: "myTextStyle",
          },
        },
      },
    });

// Export the custom theme
export default theme;