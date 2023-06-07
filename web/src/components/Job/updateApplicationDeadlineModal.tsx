import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import InputField from "../Core/InputField";

interface updateApplicationDeadlineProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: number | null;
  submitReOpenJobHandler: (
    jobId: number,
    applicationDeadline: string,
    startDate: string,
    endDate: string
  ) => void;
}

interface ErrorFields {
  applicationDeadline?: string;
}

const UpdateApplicationDeadlineModal: React.FC<
  updateApplicationDeadlineProps
> = ({ isOpen, onClose, jobId, submitReOpenJobHandler }) => {
  let updateDeadlineRef: HTMLButtonElement | null;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>応募期限を選択</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Formik
            initialValues={{
              applicationDeadline: "",
              startDate: "",
              endDate: "",
            }}
            validate={(values) => {
              const errors: ErrorFields = {};

              if (new Date(values.applicationDeadline) < new Date()) {
                errors.applicationDeadline =
                  "応募期限は明日以降で指定してください。";
              }
              return errors;
            }}
            onSubmit={(values) => {
              if (jobId) {
                submitReOpenJobHandler(
                  jobId,
                  values.applicationDeadline,
                  values.startDate,
                  values.endDate
                );
              }
            }}
          >
            {() => (
              <Form>
                <InputField
                  label="仕事の応募期限"
                  type="date"
                  name="applicationDeadline"
                />
                <InputField
                  label="仕事の希望開始時期"
                  type="date"
                  name="startDate"
                  required
                />
                <InputField
                  label="仕事の希望完了時期"
                  type="date"
                  name="endDate"
                  required
                />
                <Button
                  ref={(node) => (updateDeadlineRef = node)}
                  type={"submit"}
                  display={"none"}
                ></Button>
              </Form>
            )}
          </Formik>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} mr={3}>
            キャンセル
          </Button>
          <Button colorScheme="blue" onClick={() => updateDeadlineRef?.click()}>
            送信
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateApplicationDeadlineModal;
