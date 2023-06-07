import { Stack } from "@chakra-ui/react";
import React, { MouseEventHandler } from "react";
import CategoryToggleIcon from "./CategoryToggleIcon";

interface MapCategoryToggleIconsProps {
  generatorToggle: boolean;
  powerPlantOwnerToggle:boolean;
  // professionalGeneratorToggle: boolean;
  maintainerToggle: boolean;
  jobToggle: boolean;
  lowVoltagePowerPlantToggle: boolean;
  highVoltagePowerPlant: boolean;
  seminarToggle: boolean;
  offPartyToggle: boolean;
  generatorToggleHandler: MouseEventHandler<HTMLDivElement>;
  powerPlantOwnerToggleHandler: MouseEventHandler<HTMLDivElement>;
  // professionalGeneratorToggleHandler: MouseEventHandler<HTMLDivElement>;
  maintainerToggleHandler: MouseEventHandler<HTMLDivElement>;
  jobToggleHandler: MouseEventHandler<HTMLDivElement>;
  lowVoltagePowerPlantToggleHandler: MouseEventHandler<HTMLDivElement>;
  highVoltagePowerPlantHandler: MouseEventHandler<HTMLDivElement>;
  seminarToggleHandler: MouseEventHandler<HTMLDivElement>;
  offPartyToggleHandler: MouseEventHandler<HTMLDivElement>;
}

const MapCategoryToggleIcons: React.FC<MapCategoryToggleIconsProps> = ({
  generatorToggle,
  powerPlantOwnerToggle,
  // professionalGeneratorToggle,
  maintainerToggle,
  jobToggle,
  lowVoltagePowerPlantToggle,
  highVoltagePowerPlant,
  seminarToggle,
  offPartyToggle,
  generatorToggleHandler,
  powerPlantOwnerToggleHandler,
  // professionalGeneratorToggleHandler,
  maintainerToggleHandler,
  jobToggleHandler,
  lowVoltagePowerPlantToggleHandler,
  highVoltagePowerPlantHandler,
  seminarToggleHandler,
  offPartyToggleHandler,
}) => {
  return (
    <Stack
      direction={"row"}
      flexWrap={["wrap", "nowrap"]}
      justifyContent={["space-around"]}
      my={6}
    >
      <CategoryToggleIcon
        toggle={powerPlantOwnerToggle}
        toggleHandler={powerPlantOwnerToggleHandler}
        label={"発電所オーナー"}
        imageLocation={"/images/icons/owner.png"}

      />
      {/* <CategoryToggleIcon
        toggle={professionalGeneratorToggle}
        toggleHandler={professionalGeneratorToggleHandler}
        label={"発電者兼業者"}
        imageLocation={"/images/icons/professionalGenerator.jpg"}
      /> */}
      <CategoryToggleIcon
        toggle={maintainerToggle}
        toggleHandler={maintainerToggleHandler}
        label={"業者"}
        imageLocation={"/images/icons/maintainer.png"}
      />
      <CategoryToggleIcon
        toggle={jobToggle}
        toggleHandler={jobToggleHandler}
        label={"お仕事"}
        imageLocation={"/images/icons/job.png"}
      />
      <CategoryToggleIcon
        toggle={lowVoltagePowerPlantToggle}
        toggleHandler={lowVoltagePowerPlantToggleHandler}
        label={"低圧発電所"}
        imageLocation={"/images/icons/lowVoltagePowerplant.png"}
      />
      <CategoryToggleIcon
        toggle={highVoltagePowerPlant}
        toggleHandler={highVoltagePowerPlantHandler}
        label={"高圧発電所"}
        imageLocation={"/images/icons/highVoltagePowerplant.png"}
      />
      <CategoryToggleIcon
        toggle={seminarToggle}
        toggleHandler={seminarToggleHandler}
        label={"セミナー"}
        imageLocation={"/images/icons/seminar.png"}
        comingSoon
      />
      <CategoryToggleIcon
        toggle={offPartyToggle}
        toggleHandler={offPartyToggleHandler}
        label={"オフ会"}
        imageLocation={"/images/icons/offParty.png"}
        comingSoon
      />
    </Stack>
  );
};

export default MapCategoryToggleIcons;
