import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Text,
  HStack,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes } from "react";

type InputTextAreaProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  label: string;
  helperText?: string;
  helperTextColor?: string;
};

const InputTextArea: React.FC<InputTextAreaProps> = ({
  label,
  helperText,
  helperTextColor = "gray.700",
  size: _size,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    // <Box mb={5}>
      <FormControl isInvalid={!!error} mb={5}>
        <HStack mt={2}>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <Text
            alignSelf={"flex-start"}
            fontSize={"xs"}
            textColor={helperTextColor}
          >
            {helperText}
          </Text>
        </HStack>
        <Textarea {...field} {...props} id={field.name} />
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
    // </Box>
  );
};

export default InputTextArea;
