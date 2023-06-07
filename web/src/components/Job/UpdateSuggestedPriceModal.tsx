import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import InputField from "../Core/InputField";
import { formatCurrency } from "../../utils/formaters";

interface UpdateSuggestedPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSuggesterPrice: number | null;
  jobId: number | null;
  submitSuggestedPriceHandler: Function;
}

interface ErrorFields {
  suggestedPrice?: string;
}

const UpdateSuggestedPriceModal: React.FC<UpdateSuggestedPriceModalProps> = ({
  isOpen,
  onClose,
  initialSuggesterPrice,
  jobId,
  submitSuggestedPriceHandler,
}) => {
  let updatePriceRef: HTMLButtonElement | null;

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">応募価格を変更</DrawerHeader>

        <DrawerBody>
          <Box mt={10}>
            {jobId && initialSuggesterPrice ? (
              <Formik
                initialValues={{
                  suggestedPrice: initialSuggesterPrice,
                }}
                validate={(values) => {
                  const errors: ErrorFields = {};

                  if (values.suggestedPrice < 3000) {
                    errors.suggestedPrice =
                      "3000円以上の金額を入力してください";
                  }
                  return errors;
                }}
                onSubmit={(values) => {
                  submitSuggestedPriceHandler(jobId, values.suggestedPrice);
                }}
              >
                {() => (
                  <Form>
                    <Text>
                    現在の応募価格: {formatCurrency(initialSuggesterPrice)}
                    </Text>
                    <InputField
                      type="number"
                      name={"suggestedPrice"}
                      label="新しい価格で応募する(単位：円）"
                    />
                    <Button
                      ref={(node) => (updatePriceRef = node)}
                      type={"submit"}
                      display={"none"}
                    ></Button>
                  </Form>
                )}
              </Formik>
            ) : (
              "ジョブを選択"
            )}
          </Box>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={onClose}>
            キャンセル
          </Button>
          <Button colorScheme="blue" onClick={() => updatePriceRef?.click()}>
            送信
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default UpdateSuggestedPriceModal;
