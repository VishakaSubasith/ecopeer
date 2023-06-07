import NextImage from "next/image";
interface powerPlantMarkerProps {}

const powerPlantMarker: React.FC<powerPlantMarkerProps> = ({}) => {
  return (
    <NextImage
      priority={true}
      src={`/images/icons/owner.png`}
      width={"25px"}
      height={"25px"}
      alt="marker"
    />
  );
};

export default powerPlantMarker;
