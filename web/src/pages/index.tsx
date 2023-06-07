import React from "react";
import NextImage from "next/image";
import MainLayout from "../components/Layout/MainLayout";
import IndexMap from "../components/Index/IndexMap";
import IndexBanner from "../components/Index/IndexBanner";
import IndexCategoryIcons from "../components/Index/IndexCategoryIcons";
// import IndexCategoriesExpanded from "../components/Index/IndexCategoriesExpanded";
import IndexJobsTableWrapper from "../components/Index/IndexJobsTableWrapper";
// import Statistics from "../components/Index/Statistics";
import { useNewUsersQuery } from "../generated/graphql";
// import { useNewUsersQuery, useStatisticsQuery } from "../generated/graphql";
import NewUsers from "../components/Index/NewUsers";
import Newtable from "../components/Table/table";
import Carousel from "../components/Core/Carousel";

interface indexProps {}

const slides = [
  { img: "/images/index_banners/banner1.jpg", label: "", description: "" },
  { img: "/images/index_banners/banner2.jpg", label: "", description: "" },
  { img: "/images/index_banners/banner3.jpg", label: "", description: "" },
];

const Index: React.FC<indexProps> = ({}) => {
  // const [{ data: dataStatistics }] = useStatisticsQuery({requestPolicy: "cache-and-network"});
  const [{ data: dataUsers }] = useNewUsersQuery({
    variables: { input: { pagination: { limit: 5 } } },
  });
  return (
    <MainLayout>
      <IndexBanner />
      <Carousel slides={slides} carouselHeight="unset" slidesInterval={10000} />
      <IndexMap />
      <IndexCategoryIcons />
      <NewUsers
        users={dataUsers?.users.map((user) => ({
          date: parseInt(user.createdAt),
          name: user.solarPowerPlantMaintainer
            ? user.solarPowerPlantMaintainer.name
            : user.solarPowerPlantOwner?.nickname,
        }))}
      />
      {/* <IndexCategoriesExpanded /> */}
      <IndexJobsTableWrapper />
      {/* <Statistics
        jobs={dataStatistics?.statistics.statistics.jobs}
        powerplants={dataStatistics?.statistics.statistics.powerplants}
        users={dataStatistics?.statistics.statistics.users}
      /> */}
      {/* <Newtable columnNames={["Name", "created date", "asd"]}/> */}
    </MainLayout>
  );
};

export default Index;
