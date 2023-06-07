const Button = {
  variants: {
    shadow: {
      shadow: "md",
      rounded: "lg",
      border: "1px",
      borderColor: "gray.100",
      px: 5,
      py: 1.5,
      height: "min",
    },
    solid: {
      rounded: "xl",
    },
    ghost: (props: { colorMode: string; }) => ({
      textColor: props.colorMode === 'dark' ? 'white' : 'black',
    }),
  },
  defaultProps: {
    colorScheme: "orange",
    borderRadius: "100px",
  },
};

export default Button;
