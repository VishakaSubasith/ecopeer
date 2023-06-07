import React from "react";
import {
  chakra,
  Flex,
  Icon,
  useColorModeValue,
  Button,
  useBreakpointValue,
  Stack,
  SimpleGrid,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";

interface tableProps {
    columnNames: string[];
}

const data = [
  { name: "Josef", created: "A few seconds ago" },
  { name: "Sage", created: "A few hours ago" },
];
const Newtable: React.FC<tableProps> = ({columnNames}) => {
  return (
    <Stack
      direction={{ base: "column" }}
      w="full"
      bg={{ md: useColorModeValue("white", "gray.800") }}
      shadow="lg"
    >
      {/* {data.map((token, tid) => {
        return (
          <Flex
            direction={{ base: "row", md: "column" }}
            bg={useColorModeValue("white", "gray.800")}
            key={tid}
          >
            {useBreakpointValue({ base: true, md: tid === 0 }) && (
              <SimpleGrid
                spacingY={3}
                columns={{ base: 1, md: 4 }}
                w={{ base: 120, md: "full" }}
                textTransform="uppercase"
                bg={useColorModeValue("gray.100", "gray.800")}
                color={useColorModeValue("gray.500", "gray.500")}
                py={{ base: 1, md: 4 }}
                px={{ base: 2, md: 10 }}
                fontSize="md"
                fontWeight="hairline"
              >
                {columnNames.map((name) => <span>{name}</span>)}
                <chakra.span textAlign={{ md: "right" }}>Actions</chakra.span>
              </SimpleGrid>
            )}
            <SimpleGrid
              spacingY={3}
              columns={{ base: 1, md: 4 }}
              w="full"
              py={2}
              px={10}
              fontWeight="hairline"
            >
              <span>{token.name}</span>
  

              <chakra.span
                // textOverflow="ellipsis"
                // overflow="hidden"
                // whiteSpace="nowrap"
              >
                {token.created}
              </chakra.span>
              <Flex>
                <Button
                  size="sm"
                  variant="solid"
                  leftIcon={<Icon as={BellIcon} />}
                  colorScheme="purple"
                >
                  View Profile
                </Button>
              </Flex>
              <Flex justify={{ md: "end" }}>
                <ButtonGroup variant="solid" size="sm" spacing={3}>
                  <IconButton
                    colorScheme="blue"
                    aria-label={"icon"}
                    icon={<BellIcon />}
                  />
                  <IconButton
                    aria-label={"icon"}
                    colorScheme="green"
                    icon={<BellIcon />}
                  />
                  <IconButton
                    aria-label={"icon"}
                    colorScheme="red"
                    variant="outline"
                    icon={<BellIcon />}
                  />
                </ButtonGroup>
              </Flex>
            </SimpleGrid>
          </Flex>
        );
      })} */}
    </Stack>
  );
};

export default Newtable;
