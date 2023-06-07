import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { InputHTMLAttributes, useState } from "react";
import { MarkerLocationSelection } from "../Markers/MarkerLocationSelection";
import GoogleMapReact from "google-map-react";
import { useField } from "formik";

type GMapAutoCompletProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  helperText: string;
};

const GMapAutoComplet: React.FC<GMapAutoCompletProps> = ({
  label,
  helperText,
  size: _size,
  ...props
}) => {
  const [field, { error }, { setValue }] = useField(props);
  const [, { value: latValue }, { setValue: setLatValue }] = useField("lat");
  const [, { value: lngValue }, { setValue: setLngValue }] = useField("lng");

  const [zoom, setZoom] = useState(6);

  let searchBoxRef: HTMLInputElement | null;

  // Google maps handlers
  let searchInput: any;
  const onPlacesChanged = () => {
    const places = searchInput.getPlaces();
    if (places.length > 0) {
      const place = places[0];
      const location = place.geometry.location;
      setLatValue(location.lat());
      setLngValue(location.lng());
      setZoom(19);
      setValue(place.formatted_address);
    }
  };
  const handleApiLoaded = (map: any, maps: any) => {
    searchInput = new maps.places.SearchBox(searchBoxRef);
    // searchInput.addListener("places_changed", onPlacesChanged);
    searchInput.on('pageshow',"#wrapper", function (){
      onPlacesChanged()
    })
  };
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <Box>
      <FormControl isInvalid={!!error}>
        <HStack mt={2}>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <Text alignSelf={"flex-start"} fontSize={"xs"} textColor={"gray.700"}>
            {helperText}
          </Text>
        </HStack>
        <Input
          {...field}
          {...props}
          id={field.name}
          onChange={e=> setValue(e.target.value)}
          ref={(node) => (searchBoxRef = node)}
        />
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
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
          center={{ lat: latValue, lng: lngValue }}
          options={{ mapTypeControl: true }}
          draggable={true}
        >
          <MarkerLocationSelection lat={latValue} lng={lngValue} />
        </GoogleMapReact>
      </Box>
    </Box>
  );
};

export default GMapAutoComplet;
