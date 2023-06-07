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
  Spinner,
  Link,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { UserType, useUserRatingsQuery } from "../../generated/graphql";
import { AiOutlineStar } from "react-icons/ai";

type ModalRating = Array<{
  __typename?: "Rating";
  id: number;
  rating: number;
  comment: string;
  evaluator: {
    __typename?: "User";
    id: number;
    solarPowerPlantOwner?: {
      __typename?: "SolarPowerPlantOwner";
      id: number;
      nickname?: string | null;
    } | null;
    solarPowerPlantMaintainer?: {
      __typename?: "SolarPowerPlantMaintainer";
      id: number;
      name: string;
    } | null;
  };
}>;

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number | null ;
  maintainerName: string | undefined | null;
  maintainerAddress: string | undefined | null;
  userType: UserType;
}

const RatingModal: React.FC<RatingModalProps> = ({
  isOpen,
  onClose,
  userId,
  maintainerName,
  maintainerAddress,
  userType,
}) => {
  // @ts-ignore
  const [{ data, fetching }] = useUserRatingsQuery({variables: { input: { userId } }, pause: userId < 0,});

  const [currentRatings, setCurrentRatings] = useState<ModalRating | undefined>(
    []
  );

  const closeHandler = () => {
    setCurrentRatings([]);
    onClose();
  };

  const fiveStar = data?.userRatings.filter((rating) => rating.rating === 5);
  const fourStar = data?.userRatings.filter((rating) => rating.rating === 4);
  const threeStar = data?.userRatings.filter((rating) => rating.rating === 3);
  const twoStar = data?.userRatings.filter((rating) => rating.rating === 2);
  const oneStar = data?.userRatings.filter((rating) => rating.rating === 1);

  const ratings = data?.userRatings.map((rating) => rating.rating);
  const totalRatingCount = ratings ? ratings.length : 0;

  const combinedRatings = [oneStar, twoStar, threeStar, fourStar, fiveStar];

  const ratingsInfo = combinedRatings.map((rating, index) => ({
    ratingValue: index + 1,
    ratingPercentage:
      rating && ratings && rating.length > 0 && ratings.length > 0
        ? ((rating.length / ratings.length) * 100).toFixed(0)
        : 0,
    ratingCount: rating ? rating.length : 0,
    ratings: rating,
  }));

  const totalRatingValue = ratings?.reduce((prev, next) => prev + next, 0);
  const averateRating =
    totalRatingValue && ratings
      ? (totalRatingValue / ratings?.length).toFixed(2)
      : 0;

  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>メンテナの評価</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {fetching ? (
            <Spinner />
          ) : (
            <>
              <Box>
                <Box my={3}>
                  <Text>会社名: {maintainerName} </Text>
                  <Text>会社住所： {maintainerAddress}</Text>
                </Box>

                <Text
                  fontWeight={"bold"}
                  fontSize={"lg"}
                  my={3}
                >{`平均スコア　${averateRating} (${totalRatingCount}件)`}</Text>

                {ratingsInfo.reverse().map((rating) => (
                  <Flex key={rating.ratingValue}>
                    <Flex flex={"2"}>
                      <Text mr={2}>{rating.ratingValue}</Text>

                      {[...Array(rating.ratingValue)].map((_, index) => (
                        <AiOutlineStar key={`${rating.ratingValue}-${index}`} />
                      ))}
                    </Flex>
                    <Link
                      color={"blue"}
                      flex={"5"}
                      onClick={() => setCurrentRatings(rating.ratings)}
                    >
                      {`${rating.ratingPercentage}% (${rating.ratingCount} 件)`}
                    </Link>
                  </Flex>
                ))}
              </Box>
              <Box>
                <Heading mt={3} mb={2} size={"md"}>
                  コメント
                </Heading>
                {currentRatings?.map((rating) =>
                  (userType as UserType) === UserType.Maintainer ? (
                    <Text key={rating.id}>
                      {rating.evaluator.solarPowerPlantOwner?.nickname}
                      {rating.rating} {rating.comment}
                    </Text>
                  ) : (
                    (userType as UserType) === UserType.Owner && (
                      <Text key={rating.id}>
                        {rating.evaluator.solarPowerPlantMaintainer?.name}
                        {rating.rating} {rating.comment}
                      </Text>
                    )
                  )
                )}
              </Box>
            </>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={closeHandler}>
            閉じる
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RatingModal;
