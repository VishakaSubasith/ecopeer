import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  Switch,
  Text,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  switchOption?: boolean;
  helperText?: string;
  helperTextColor?: string;
  notes?: string;
  required?: boolean;
  formSize?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  switchOption,
  helperText,
  helperTextColor,
  notes,
  required = false,
  size: _size,
  formSize,
  ...props
}) => {
  const [field, { error }] = useField(props);
  let privateSwitch = null;
  if (switchOption) {
    privateSwitch = <Switch id={field.name} colorScheme={"facebook"} />;
  }
  return (
    <Box mb={5}>
      <FormControl isInvalid={!!error}>
        <HStack mt={2}>
          <FormLabel htmlFor={field.name}>
            {label}
            {required ? (
              <Text as={"span"} color={"red.600"}>
                *
              </Text>
            ) : null}
          </FormLabel>
          <Text
            alignSelf={"flex-start"}
            fontSize={"xs"}
            textColor={helperTextColor ? helperTextColor : "gray.700"}
          >
            {helperText}
          </Text>
          <Spacer />
          {notes && <Text>{notes}</Text>}
          {privateSwitch}
        </HStack>
        <Input {...field} {...props} id={field.name} size={formSize} />
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
    </Box>
  );
};

export default InputField;
