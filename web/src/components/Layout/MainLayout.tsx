import { Box } from "@chakra-ui/layout";
import {
  Drawer,
  DrawerContent,
  Flex,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import AppFooter from "./AppFooter";
import AppNavbar from "./AppNavbar";
import Head from "next/head";
import MobileNav from "./SidebarNav/MobileNav";
import { useRouter } from "next/router";
import {
  useLogoutMutation,
  useMeQuery,
  UserType,
} from "../../generated/graphql";
import SidebarContent from "./SidebarNav/SidebarContent";
import { SidebarLinkItem } from "../../utils/types";
import { ArrowUpIcon, ViewIcon } from "@chakra-ui/icons";
import {
  BsCheckLg,
  BsFillCalendarCheckFill,
  BsFillChatLeftFill,
} from "react-icons/bs";
import { TiSpanner } from "react-icons/ti";
import { FaSolarPanel, FaGlassMartiniAlt } from "react-icons/fa";
import { RiMoneyCnyBoxFill } from "react-icons/ri";
import { GiSpanner } from "react-icons/gi";

const OwnerLinkItems: SidebarLinkItem[] = [
  { name: "Myビジネス", icon: BsCheckLg, url: "/approvedJobs" },
  { name: "My仕事", icon: GiSpanner, url: "/user/owner/job" },
  { name: "My発電所", icon: FaSolarPanel, url: "/user/owner/powerplant" },
  {
    name: "Myセミナー",
    icon: BsFillCalendarCheckFill,
    url: "/user/hold-seminar",
  },
  { name: "Myオフ会", icon: FaGlassMartiniAlt, url: "/user/off-party" },
  { name: "Myチャット", icon: BsFillChatLeftFill, url: "/chat" },
  // { name: "My仲間", icon: ViewIcon, url: "#" },
  // { name: "Myペイ", icon: RiMoneyCnyBoxFill, url: "/user/owner/job/payment" },
  // { name: "My知恵", icon: ViewIcon, url: "#" },
];

const MaintainerLinkItems: SidebarLinkItem[] = [
  {
    name: "Myビジネス",
    icon: BsCheckLg,
    url: "/user/maintainer/job",
  },
  {
    name: "Myセミナー",
    icon: BsFillCalendarCheckFill,
    url: "/user/hold-seminar",
  },
  { name: "Myオフ会", icon: FaGlassMartiniAlt, url: "/user/off-party" },
  { name: "Myチャット", icon: BsFillChatLeftFill, url: "/chat" },
];

const getLinkItems = (userType: UserType | undefined) => {
  let linkItems: SidebarLinkItem[] = [];
  if (userType === UserType.Owner) {
    linkItems = OwnerLinkItems;
  }
  if (userType === UserType.Maintainer) {
    linkItems = MaintainerLinkItems;
  }
  return linkItems;
};

interface MainLayoutProps {
  varient?: "normal" | "pure";
  showSidebar?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  varient = "normal",
  showSidebar = false,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  // Mutations
  const [, logout] = useLogoutMutation();

  // Queries
  const [{ data: dataMe, fetching }] = useMeQuery();

  // Handlers
  const logoutHandler = () => {
    logout();
    router.push("/");
  };

  const getUserLabel = () => {
    if (dataMe?.me?.userType == UserType.Owner) {
      return "発電所オーナー";
    }
    if (dataMe?.me?.userType == UserType.Maintainer) {
      return "業者";
    }
    if (dataMe?.me?.userType === UserType.Admin) {
      return "Admin";
    } else return "Unknown";
  };
  const userLabel = getUserLabel();
  const linkItems = getLinkItems(dataMe?.me?.userType);

  const bgColor = useColorModeValue("gray.50", "gray.900");
  let sidebar = null;

  if (showSidebar) {
    sidebar = (
      <Flex bg={bgColor}>
        <SidebarContent
          minH={"650"}
          onClose={() => onClose}
          linkItems={linkItems}
          display={{ base: "none", md: "block" }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} linkItems={linkItems} />
          </DrawerContent>
        </Drawer>
      </Flex>
    );
  }

  return (
    <Flex direction={"column"} minHeight={"100vh"}>
      <Head>
        <link rel="shortcut icon" href="/images/logo.svg" />
      </Head>
      <MobileNav
        showSidebar={showSidebar}
        onOpen={onOpen}
        userType={dataMe?.me?.userType}
        userLabel={userLabel}
        email={dataMe?.me?.email}
        logoutHandler={logoutHandler}
      />
      {/* <AppNavbar /> */}
      <Flex>
        {sidebar}
        <Box
          maxW={varient === "normal" ? ["xs", "6xl"] : ""}
          minWidth={varient === "normal" ? ["xs", "6xl"] : ""}
          mx={varient == "normal" ? "auto" : ""}
          flex={"1"}
          my={varient == "normal" ? 10 : "auto"}
        >
          {children}
        </Box>
      </Flex>
      <AppFooter />
    </Flex>
  );
};

export default MainLayout;
