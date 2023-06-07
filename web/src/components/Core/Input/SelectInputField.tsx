import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  HStack,
  Text,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useField, useFormikContext } from "formik";
import { InputHTMLAttributes, CSSProperties } from "react";

interface optionValue {
  value: string | number;
  label: string;
}

interface groupOption {
  label: string;
  options: optionValue[];
}

type SelectInputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  optionValues: optionValue[] | groupOption[];
};

const SelectInputField: React.FC<SelectInputFieldProps> = ({
  label,
  optionValues,
  required = false,
  size: _size,
  ...props
}) => {
  const [field, { error }] = useField(props);
  const { setFieldValue } = useFormikContext();

  const groupStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };
  const groupBadgeStyles: CSSProperties = {
    backgroundColor: "#EBECF0",
    borderRadius: "2em",
    color: "#172B4D",
    display: "inline-block",
    fontSize: 12,
    fontWeight: "normal",
    lineHeight: "1",
    minWidth: 1,
    padding: "0.16666666666667em 0.5em",
    textAlign: "center",
  };
  const formatGroupLabel = (data: groupOption) => (
    <div style={groupStyles}>
      <span style={{ color: "orange", fontWeight: "bold", fontSize: 17 }}>
        {data.label}
      </span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );
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
        </HStack>
        <Select
          {...field}
          {...props}
          id={field.name}
          formatGroupLabel={formatGroupLabel}
          options={optionValues}
          onChange={(value) => setFieldValue(field.name, value)}
        />
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
    </Box>
  );
};

export default SelectInputField;
