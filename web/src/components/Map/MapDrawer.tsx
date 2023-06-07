import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { LatLngPoint } from "../../utils/types";

{
  /* <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef.current}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Power Plants</DrawerHeader>

            <DrawerBody>
              {data?.region.solarPowerPlants
                .filter((powerPlant) => {
                  const lat = powerPlant.lat;
                  const lng = powerPlant.lng;
                  const [NWLng, SELat, SELng, NWLat] = bounds;
                  if (lat && lng) {
                    return (
                      lat > SELat && lat < NWLat && lng < SELng && lng > NWLng
                    );
                  }
                })
                .slice(0, 10)
                .map((visiblePowerPlant) => (
                  <PowerPlantCard
                    powerPlant={visiblePowerPlant}
                    showMarkerHandler={showMarkerHandler}
                  />
                ))}
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer> */
}

interface MapDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: [] | undefined;
  CardElement: React.FC<{ item: any; showMarkerHandler: any }>;
  showMarkerHandler: (location: LatLngPoint) => void;
}

const MapDrawer: React.FC<MapDrawerProps> = ({
  isOpen,
  onClose,
  title,
  items,
  CardElement,
  showMarkerHandler,
}) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{title}</DrawerHeader>

          <DrawerBody>
            {items
              ? items.map((item, index) => (
                  <CardElement
                    key={index}
                    item={item}
                    showMarkerHandler={showMarkerHandler}
                  />
                ))
              : ""}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
            閉じる
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default MapDrawer;
