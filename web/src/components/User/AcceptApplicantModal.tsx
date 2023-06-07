import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Link,
  HStack,
  Checkbox,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { formatCurrency } from "../../utils/formaters";

interface AcceptApplicantModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: number | undefined;
  maintainerId: number;
  maintainerName: string;
  suggestedPrice: number;
  budget: number | undefined;
  approveHandler: (maintainerId: number) => void;
}

const AcceptApplicantModal: React.FC<AcceptApplicantModalProps> = ({
  isOpen,
  onClose,
  jobId,
  maintainerId,
  maintainerName,
  suggestedPrice,
  budget,
  approveHandler,
}) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>確認</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Box my={3}>
              <Text>No: {jobId} </Text>
              <Text>希望予算: {formatCurrency(budget)}</Text>
              <Text>会社名: {maintainerName} </Text>
              <Text>応募価格: {formatCurrency(suggestedPrice)} </Text>
              <Text>で発注しますか？</Text>
            </Box>
            <HStack>
              <Checkbox
                id="isOwner"
                isChecked={isConfirmed}
                onChange={() => setIsConfirmed(!isConfirmed)}
                mr={10}
              />
              <Box>
                <Text as={"span"}>
                  <NextLink passHref href={"/about/terms"}>
                    <Link color={"blue.400"}>利用規約 </Link>
                  </NextLink>
                </Text>
                <Text>に同意する</Text>
              </Box>
            </HStack>
            <Text>（原則として、発注後のキャンセルはできません）</Text>
          </Box>
          <Button
            colorScheme="green"
            onClick={() => approveHandler(maintainerId)}
            ml={3}
            isDisabled={!isConfirmed}
          >
            発注する
          </Button>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            閉じる
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AcceptApplicantModal;
