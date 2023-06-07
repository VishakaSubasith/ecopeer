import {
  FormControl,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import { OwnerType } from "../../../generated/graphql";

interface CheckboxOption {
  label: string;
  value: OwnerType;
}

type InputCheckBoxProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  options: CheckboxOption[];
  helperText?: string;
  defaultValue?:string;
};

const InputCheckBox: React.FC<InputCheckBoxProps> = ({
  options,
  size: _size,
  helperText, defaultValue  ,

  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <RadioGroup
          defaultValue={defaultValue}
      >
        <Stack direction="row">
          {options.map((option) => (
            <Radio
              key={option.value}
              {...field}
              {...props}
              value={option.value}
            >
              {option.label}
            </Radio>
          ))}
          <Spacer />
          {helperText && <Text>{helperText}</Text>}
        </Stack>
      </RadioGroup>
    </FormControl>
  );
};

export default InputCheckBox;
