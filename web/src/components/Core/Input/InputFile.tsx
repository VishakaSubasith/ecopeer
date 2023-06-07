import { AttachmentIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormErrorMessage,
  Box,
  Image,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes, useRef, useState } from "react";

type InputFileProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  //   label: string;
  //   helperText?: string;
  showImagePreview?: boolean;
};

const InputFile: React.FC<InputFileProps> = ({
  //   label,
  //   helperText,
  size: _size,
  showImagePreview = true,
  ...props
}) => {
  const [field, { error }, { setValue }] = useField(props);
  const [previewImage, setPreviewImage] = useState<string>("");
  const inputFileRef = useRef<HTMLInputElement>(null);

  const uploadOnClickHandler = () => {
    inputFileRef.current?.click();
  };
  return (
    <Box mb={5}>
      <FormControl isInvalid={!!error}>
        {/* <HStack mt={2}>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <Text alignSelf={"flex-start"} fontSize={"xs"} textColor={"gray.700"}>
            {helperText}
          </Text>
        </HStack> */}
        <Input
          ref={inputFileRef}
          //   {...field}
          display={"none"}
          w={"auto"}
          {...props}
          id={field.name}
          border={"1px solid"}
          accept="image/*"
          type="file"
          onChange={async (event) => {
            event.target.files;
            const cfiles = event.target.files;
            if (cfiles) {
              const fileInfo = cfiles[0];
              setValue(fileInfo);
              if (showImagePreview) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setPreviewImage(reader.result as string);
                };
                reader.readAsDataURL(fileInfo);
              }
            }
          }}
        />
        <VStack width={"fit-content"}>
          <Button
            size={"sm"}
            onClick={uploadOnClickHandler}
            leftIcon={<AttachmentIcon />}
          >
            画像アップロード
          </Button>

          {showImagePreview && (
            <Image
              borderRadius={8}
              mb={6}
              h={100}
              w={100}
              src={previewImage}
              alt=""
            />
          )}
        </VStack>

        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
    </Box>
  );
};

export default InputFile;
