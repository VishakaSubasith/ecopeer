import React, { useRef, useState } from "react";
import { Box, Input, FormLabel, Text, Flex } from "@chakra-ui/react";
import GoogleMapReact from "google-map-react";
import { MarkerLocationSelection } from "../Core/Markers/MarkerLocationSelection";

interface GMapSearchboxProps {
  label: string;
  inputName: string;
  helperText?: string;
}

const GMapSearchbox: React.FC<GMapSearchboxProps> = ({
  label,
  inputName,
  helperText,
}) => {
  // States
  const [mapCenter, setMapCenter] = useState({
    lat: 37.846877,
    lng: 137.5557178,
  });
  const [markerCenter, setMarkerCenter] = useState({
    lat: 35.6681625,
    lng: 139.6007821,
  });
  const [location, setLocation] = useState("");
  const [zoom, setZoom] = useState(6);

  const searchBox = useRef(null);

  // Google maps handlers
  let searchInput: any;
  const onPlacesChanged = () => {
    const places = searchInput.getPlaces();
    if (places.length > 0) {
      const place = places[0];
      const location = place.geometry.location;
      const cordinates = { lat: location.lat(), lng: location.lng() };
      setMarkerCenter(cordinates);
      setMapCenter(cordinates);
      setLocation(place.formatted_address);
      setZoom(20);
    }
  };
  const handleApiLoaded = (map: any, maps: any) => {
    searchInput = new maps.places.SearchBox(searchBox.current);
    searchInput.addListener("places_changed", onPlacesChanged);
  };
  return (
    <>
      <Flex>
        <FormLabel htmlFor={inputName} mb="0">
          {label}
        </FormLabel>
        {helperText && (
          <Text fontSize={"xs"} textColor={"gray.600"} alignSelf={"flex-start"}>
            ※会社名又は住所で検索頂くと簡単に登録できます。
          </Text>
        )}
      </Flex>
      <Input
        type="text"
        id={inputName}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        name={inputName}
        ref={searchBox}
      />
      <Box
        maxWidth={"full"}
        h={["sm", "md", "xl"]}
        my={2}
        rounded={"xl"}
        overflow={"hidden"}
      >
      {/* @ts-expect-error Server Component */}
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.NEXT_PUBLIC_GMAPS_KEY,
            region: "JP",
            language: "ja",
            libraries: "places",
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          defaultCenter={{
            lat: 37.846877,
            lng: 137.5557178,
          }}
          defaultZoom={6}
          zoom={zoom}
          center={mapCenter}
          options={{ mapTypeControl: true }}
          draggable={true}
        >
          <MarkerLocationSelection
            lat={markerCenter.lat}
            lng={markerCenter.lng}
          />
        </GoogleMapReact>
      </Box>
    </>
  );
};

export default GMapSearchbox;
