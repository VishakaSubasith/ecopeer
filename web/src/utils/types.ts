import { IconProps } from "@chakra-ui/icons";
import { ComponentWithAs } from "@chakra-ui/system";
import { IconType } from "react-icons";
import {
  BankDetails,
  Representative,
  SolarPowerPlantMaintainer,
  SolarPowerPlantOwner,
} from "../generated/graphql";

export interface LatLngPoint {
  lat: number;
  lng: number;
}

export type OwnerInfo = {
  __typename?: "SolarPowerPlantOwner" | undefined;
} & Pick<SolarPowerPlantOwner, "id" | "nickname" >;

export type BankDetailsInfo = {
  __typename?: "BankDetails" | undefined;
} & Pick<BankDetails, "id" | "userId">;

// @ts-ignore
export type ExchangeInformation = {
  __typename?: "ExchangeInformation" | undefined;
} & Pick<ExchangeInformation, "id" | "userId">;

export type MaintainerInfo = {
  __typename?: "SolarPowerPlantMaintainer" | undefined;
} & Pick<
  SolarPowerPlantMaintainer,
  "id" | "name" | "phoneNumber" | "address" | "lat" | "lng" | "intro"
>;

// @ts-ignore
export type RepresentativeInfo = {
  __typename?: "Representative" | undefined;
} & Pick<Representative, "id" | "nickname" |"address">;

export interface SidebarLinkItem {
  name: string;
  icon: ComponentWithAs<"svg", IconProps> | IconType;
  url: string;
}
