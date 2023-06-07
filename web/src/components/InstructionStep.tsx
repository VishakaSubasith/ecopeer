import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import React from "react";

interface StepProps {
  section: string;
  steps: {
    title: string;
    text: string[];
  }[];
}

const InstructionStep = ({ section, steps }: StepProps) => {
  return (
    <Box mb={12}>
      <Heading mb={5}>{section}</Heading>
      {steps.map((step, index) => (
        <VStack mb={5} spacing={1} key={index} alignItems={"flex-start"}>
          <Text fontWeight={"bold"} fontSize={"lg"}>
            {step.title}
          </Text>
          {step.text.map((t, index) => (
            <Text key={index}>{t}</Text>
          ))}
        </VStack>
      ))}
    </Box>
  );
};

export default InstructionStep;
