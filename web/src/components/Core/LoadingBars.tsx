import { Stack, Skeleton } from "@chakra-ui/react";

interface LoadingBarsProps {
    // bars?: number;
    // height?: string;
}

const LoadingBars: React.FC<LoadingBarsProps> = ({}) => {
  return (
    <Stack>
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
    </Stack>
  );
};

export default LoadingBars;
