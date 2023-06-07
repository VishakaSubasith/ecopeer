import React, { useEffect, useState } from "react";
import { Text, Box, Flex, Image, HStack, Stack } from "@chakra-ui/react";

type Slide = {
  img: string;
  label: string;
  description: string;
};

interface carouselProps {
  slides: Slide[];
  carouselHeight?: string;
  slidesInterval?: number;
}

const arrowStyles = {
  cursor: "pointer",
  //   pos: "absolute" as const,
  top: "50%",
  w: "auto",
  mt: "-22px",
  p: "16px",
  color: "gray.600",
  fontWeight: "bold",
  fontSize: "18px",
  transition: "0.6s ease",
  borderRadius: "0 3px 3px 0",
  //   userSelect: "none",
  _hover: {
    opacity: 0.8,
    bg: "black",
  },
};

const Carousel: React.FC<carouselProps> = ({
  slides,
  carouselHeight = "400px",
  slidesInterval = 5000,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesCount = slides.length;

  const ANIMATION_DIRECTION = "right";

  useEffect(() => {
    const prevSlide = () => {
      setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
    };

    const nextSlide = () => {
      setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
    };

    const automatedSlide = setInterval(() => {
      ANIMATION_DIRECTION.toLowerCase() === "left" ? prevSlide() : nextSlide();
    }, slidesInterval);
    return () => clearInterval(automatedSlide);
  }, [slidesCount]);

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };
  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };
  const setSlide = (slide: number) => {
    setCurrentSlide(slide);
  };
  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };

  return (
    <>
      <Flex
        // maxWidth={"200px"}
        w="full"
        bg={"white"}
        p={0}
        borderRadius={"2xl"}
        alignItems="center"
        justifyContent="center"
      >
        <Flex w="full" pos="relative" overflow="hidden">
          <Flex h={carouselHeight} w="full" {...carouselStyle}>
            {slides.map((slide, sid) => (
              <Flex
                justifyContent={"center"}
                key={`slide-${sid}`}
                boxSize="full"
                flex="none"
              >
                {/* <Text
                  color="white"
                  fontSize="xs"
                  p="8px 12px"
                  pos="absolute"
                  top="0"
                >
                  {sid + 1} / {slidesCount}
                </Text> */}
                <Image
                  borderRadius={"2xl"}
                  src={slide.img}
                  minHeight={"full"}
                  // boxSize="full"
                  // backgroundSize="unset"
                />
              </Flex>
            ))}
          </Flex>
          <Text
            {...arrowStyles}
            pos={"absolute"}
            userSelect={"none"}
            left="0"
            onClick={prevSlide}
          >
            &#10094;
          </Text>
          <Text
            {...arrowStyles}
            pos={"absolute"}
            userSelect={"none"}
            right="0"
            onClick={nextSlide}
          >
            &#10095;
          </Text>
          <HStack justify="center" pos="absolute" bottom="8px" w="full">
            {Array.from({ length: slidesCount }).map((_, slide) => (
              <Box
                key={`dots-${slide}`}
                cursor="pointer"
                boxSize={["7px", "9px", "15px"]}
                m="0 2px"
                bg={
                  currentSlide === slide ? "blackAlpha.800" : "blackAlpha.500"
                }
                rounded="50%"
                display="inline-block"
                transition="background-color 0.6s ease"
                _hover={{ bg: "blackAlpha.800" }}
                onClick={() => setSlide(slide)}
              ></Box>
            ))}
          </HStack>
        </Flex>
      </Flex>
      <Stack
        p="8px 12px"
        // pos="absolute"
        bottom="24px"
        textAlign="center"
        w="full"
        mb="8"
        // color="white"
      >
        <Text fontSize="2xl">{slides[currentSlide].label}</Text>
        <Text hidden fontSize="lg">
          {slides[currentSlide].description}
        </Text>
      </Stack>
    </>
  );
};

export default Carousel;
