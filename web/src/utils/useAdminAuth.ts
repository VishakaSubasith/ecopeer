import { useMeQuery, UserType } from "../generated/graphql";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAdminAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();
  useEffect(() => {
    if (!fetching && (!data?.me || data?.me?.userType != UserType.Admin)) {
      router.replace("/login?next=" + router.pathname);
    }
  }, [fetching, data, router]);
};
