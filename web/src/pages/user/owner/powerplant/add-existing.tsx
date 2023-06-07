import {
  Heading,
  Input,
  Button,
  Text,
  Link,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import React from "react";
import MainLayout from "../../../../components/Layout/MainLayout";
import PowerPlantInfoCard from "../../../../components/PowerPlant/PowerPlantInfoCard";
import {
  useOwnerSolarPowerPlantsQuery,
  useSearchSolarPowerPlantsByOfficialIdQuery,
  useClaimPowerPlantMutation,
} from "../../../../generated/graphql";
import NextLink from "next/link";

interface addExistingProps {}

const AddExisting: React.FC<addExistingProps> = ({}) => {
  const [, fetchPlants] = useOwnerSolarPowerPlantsQuery({
    requestPolicy: "network-only",
  });
  const [value, setValue] = React.useState("");
  const inputOnChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => setValue(event.target.value);

  const [{ data: dataSearchSolarPowerPlants }, searchSolarPowerPlants] =
    useSearchSolarPowerPlantsByOfficialIdQuery({
      variables: { officialId: value, limit: 15 },
      pause: !value || value.length < 3,
      requestPolicy: "network-only",
    });

  const [, claimPowerPlant] = useClaimPowerPlantMutation();

  const claimOnClickHandler = async (powerPlantId: number) => {
    const response = await claimPowerPlant({ powerPlantId: powerPlantId });
    searchSolarPowerPlants({ requestPolicy: "network-only" });
    fetchPlants({ requestPolicy: "network-only" });
  };

  return (
    <MainLayout showSidebar>
      <Heading>発電所を検索する</Heading>
      <Text color={"red.600"}>
        ※あなたの発電所が、許可していない他の人にリンクされている場合、
        <NextLink passHref href={"/about/contact-us"}>
          <Link color={"blue.400"}>お問合せ</Link>
        </NextLink>
        よりご連絡下さい。
      </Text>
      <HStack
        direction={"row"}
        alignItems={"center"}
        // shadow={"md"}
        p={4}
        // rounded={"lg"}
        mb={2}
        justifyContent={"space-between"}
      >
        <Input
          rounded={"xl"}
          shadow={"md"}
          // width={"md"}
          placeholder={"設備認定IDで検索"}
          value={value}
          onChange={inputOnChangeHandler}
        />
        <Button
          onClick={() => {
            searchSolarPowerPlants();
          }}
        >
          検索する
        </Button>
      </HStack>

      <SimpleGrid columns={1} spacing={3}>
        {dataSearchSolarPowerPlants?.searchSolarPowerPlantsByOfficialId.map(
          (solarPowerPlant) => (
            <PowerPlantInfoCard
              key={solarPowerPlant.id}
              officialId={solarPowerPlant.officialId}
              location={solarPowerPlant.location}
              classification={solarPowerPlant.classification}
              ownerName={solarPowerPlant.solarPowerPlantOwner?.nickname}
              // ownerAddress={solarPowerPlant.solarPowerPlantOwner?.address}
              ownerAddress={""}
              linked={solarPowerPlant.linked}
              name={solarPowerPlant.name}
              totalPowerOutput={solarPowerPlant.totalPowerOutput}
            >
              {solarPowerPlant.solarPowerPlantOwner?.user ? (
                <Button disabled>My発電所登録済</Button>
              ) : (
                <Button onClick={() => claimOnClickHandler(solarPowerPlant.id)}>
                  My発電所に登録する
                </Button>
              )}
            </PowerPlantInfoCard>
          )
        )}
      </SimpleGrid>
    </MainLayout>
  );
};

export default AddExisting;
