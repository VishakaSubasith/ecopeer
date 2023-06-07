import { useRouter } from "next/router";

export const useGetStrId = () => {
  const router = useRouter();
  return router.query.id ? router.query.id as string: "";
};
