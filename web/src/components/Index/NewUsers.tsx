import React from "react";
import NextImage from "next/image";
import { Box, Stack } from "@chakra-ui/react";
import NewUserCard from "../Core/Cards/NewUserCard";

interface NewUsersProps {
  users: { date: number; name: string | null | undefined }[] | undefined;
}

const NewUsers: React.FC<NewUsersProps> = ({ users }) => {
  return (
    <Box mt={10}>
      <NextImage
        src={"/images/sections/peers1.png"}
        height={100}
        width={1500}
        alt=""
      />
      <Stack direction={"column"} mt={5}>
        {users?.map((user, index) => (
          <NewUserCard
            key={index}
            date={user.date}
            name={user.name ? user.name : "New User"}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default NewUsers;
