import { extendTheme } from "@chakra-ui/react";
import breakpoints from "./foundations/breakpoints";
import fonts from "./foundations/fonts";
import colors from "./foundations/colors";
import Button from "./components/button";
const overrides = {
  fonts,
  breakpoints,
  colors,
  components: {
    Button,
  },
};
export default extendTheme(overrides);
