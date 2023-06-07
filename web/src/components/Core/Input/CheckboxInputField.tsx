import {
  Box,
  FormControl,
  HStack,
  FormLabel,
  FormErrorMessage,
  Checkbox,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type CheckboxInputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  isCheckboxDisabled?: boolean;
  "aria-invalid"?: true | undefined;
  formLabelComponent?: React.ReactElement;
};

const CheckboxInputField: React.FC<CheckboxInputFieldProps> = ({
  label,
  isCheckboxDisabled = false,
  formLabelComponent,
  size: _size,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <Box mb={5}>
      <FormControl isInvalid={!!error}>
        <HStack mt={2} alignItems={"baseline"}>
          <Checkbox
            {...field}
            {...props}
            id={field.name}
            isDisabled={isCheckboxDisabled}
          />

          <FormLabel htmlFor={field.name}>
            {formLabelComponent ? formLabelComponent : label}
          </FormLabel>
        </HStack>
        {error ? (
          <FormErrorMessage colorScheme={"facebook"}>{error}</FormErrorMessage>
        ) : null}
      </FormControl>
    </Box>
  );
};

export default CheckboxInputField;
