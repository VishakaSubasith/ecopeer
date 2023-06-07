import { StarIcon } from "@chakra-ui/icons";
import {
  Container,
  SimpleGrid,
  Heading,
  Text,
  Stack,
  StackDivider,
  Spinner,
  HStack,
  List,
  ListItem,
  IconButton,
  Button,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import Carousel from "../../components/Core/Carousel";
import MainLayout from "../../components/Layout/MainLayout";
import {
  useAddJobToFavoriteMutation,
  useIsMaintainerFavoriteJobQuery,
  useJobQuery,
  useMeQuery,
  useRemoveJobFromFavoriteMutation,
  UserType,
} from "../../generated/graphql";
import { convertJobStatus } from "../../utils/enumMapper";
import { formatCurrency, formatDate } from "../../utils/formaters";
import { useGetIntId } from "../../utils/useGetIntId";
// import NextImage from "next/image";
import RatingModal from "../../components/User/ratingModal";

interface jobProps {}

const Job: React.FC<jobProps> = ({}) => {
  const jobId = useGetIntId();
  const [{ data, fetching }] = useJobQuery({
    variables: { jobId },
    requestPolicy: "network-only",
  });
  const [{ data: dataMe }] = useMeQuery();
  const [{ data: dataIsFavorite }, getIsFavorite] =
    useIsMaintainerFavoriteJobQuery({
      variables: { input: { jobId } },
      requestPolicy: "network-only",
    });

  const [, addToFavorite] = useAddJobToFavoriteMutation();
  const [, removeFromFavorite] = useRemoveJobFromFavoriteMutation();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const toggleFavoriteHandler = async (
    isFavorite: boolean | undefined,
    jobId: number
  ) => {
    if (isFavorite) {
      await removeFromFavorite({ jobId });
      getIsFavorite();
    } else {
      await addToFavorite({ jobId });
      getIsFavorite();
    }
  };

  const isFavorite = dataIsFavorite?.isMaintainerFavoriteJob;

  return (
    <MainLayout>
      <Container maxW={"5xl"} py={12}>
        {data?.job.jobFiles && data.job.jobFiles.length > 0 && (
          <Carousel
            slides={data.job.jobFiles.map((slide) => ({
              img: slide.storageLocation,
              label: slide.filename,
              description: slide.filename,
            }))}
          />
        )}

        {fetching && !data && <Spinner />}

        {!fetching && data && (
          <SimpleGrid my={5} columns={{ base: 1, md: 2 }} spacing={10}>
            <Stack spacing={4}>
              {dataMe?.me?.userType === UserType.Maintainer && (
                <HStack>
                  <Text>仕事を公募している人：</Text>
                  <Link onClick={onOpen} color={"blue.400"}>
                    {data.job.solarPowerPlant.solarPowerPlantOwner?.nickname}
                  </Link>
                </HStack>
              )}
              <HStack>
                <Text
                  textTransform={"uppercase"}
                  color={"blue.400"}
                  fontWeight={600}
                  fontSize={"sm"}
                  bg={"blue.50"}
                  p={2}
                  alignSelf={"flex-start"}
                  rounded={"md"}
                >
                  {convertJobStatus(data?.job.status)}
                </Text>
                <Text
                  textTransform={"uppercase"}
                  color={"blue.400"}
                  fontWeight={600}
                  fontSize={"sm"}
                  bg={"blue.50"}
                  p={2}
                  alignSelf={"flex-start"}
                  rounded={"md"}
                >
                  {data?.job.category}
                </Text>
                {dataMe?.me?.userType === UserType.Maintainer && (
                  <Button
                    leftIcon={<StarIcon />}
                    variant={"outline"}
                    color={isFavorite ? "orange.400" : "gray"}
                    aria-label="お気に入り"
                    onClick={() =>
                      toggleFavoriteHandler(isFavorite, data.job.id)
                    }
                  >
                    お気に入り
                  </Button>
                )}
              </HStack>
              <Text color={"gray.900"} fontWeight={300} fontSize={"2xl"}>
                No: {data.job.id}
              </Text>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              >
                {data?.job.title}
              </Heading>
              <Text color={"gray.500"} fontSize={"2xl"} fontWeight={300}>
                {data?.job.shortDescription}
              </Text>
              <Text fontSize={"lg"}>{data?.job.longDescription}</Text>
              <Stack
                spacing={4}
                divider={<StackDivider borderColor={"gray.100"} />}
              ></Stack>
            </Stack>
            <Stack>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={"yellow.500"}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                情報
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    希望予算:
                  </Text>{" "}
                  {formatCurrency(data?.job.budget)}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    応募期限:
                  </Text>{" "}
                  {formatDate(data?.job.applicationDeadline)}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    希望開始時期:
                  </Text>{" "}
                  {formatDate(data?.job.startDate)}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    希望完了時期:
                  </Text>{" "}
                  {formatDate(data?.job.endDate)}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    関連する設備認定ID:
                  </Text>{" "}
                  {data?.job.solarPowerPlant.officialId
                    ? data?.job.solarPowerPlant.officialId
                    : "利用不可"}
                </ListItem>
              </List>
            </Stack>
          </SimpleGrid>
        )}
      </Container>
      {data?.job.solarPowerPlant.solarPowerPlantOwner?.user?.id && (
        <RatingModal
          isOpen={isOpen}
          onClose={onClose}
          userId={data.job.solarPowerPlant.solarPowerPlantOwner.user.id}
          maintainerName={data?.job.solarPowerPlant.solarPowerPlantOwner?.nickname}
          // maintainerAddress={
          //   data?.job.solarPowerPlant.solarPowerPlantOwner?.address
          // }
          maintainerAddress={null}
          userType={UserType.Owner}
        />
      )}
    </MainLayout>
  );
};

export default Job;
