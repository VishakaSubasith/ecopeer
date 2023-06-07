import NextImage from "next/image";

interface AppLogoProps {
  width?: number | string;
  height?: number | string;
}

const AppLogo: React.FC<AppLogoProps> = ({ height = 60, width = 200 }) => {
  return (
    <NextImage
      src="/images/logo.svg"
      alt="logo"
      width={width}
      height={height}
      priority={true}
    />
  );
};

export default AppLogo;
