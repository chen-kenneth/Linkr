import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import { CustomButton, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";
import { checkIfLocationEnabled, requestLocationPermissions, getCurrentLocation } from "../lib/location"; // Import the location functions

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();
  const [location, setLocation] = useState(null); // State to store location

  useEffect(() => {
    const fetchLocation = async () => {
      const locationEnabled = await checkIfLocationEnabled();
      if (locationEnabled) {
        const permissionGranted = await requestLocationPermissions();
        if (permissionGranted) {
          await getCurrentLocation(setLocation); // Fetch the location and set state
        }
      }
    };

    fetchLocation(); // Run the location tracking on app load
  }, []);

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <Loader isLoading={loading} />

      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className="text-secondary-200">Link</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Link
          </Text>

          {/* Display location (optional) */}
          {location && (
            <View className="mt-4">
              <Text className="text-sm font-pregular text-gray-100 text-center">
                Location: {location.address}
              </Text>
              <Text className="text-sm font-pregular text-gray-100 text-center">
                Latitude: {location.latitude}
              </Text>
              <Text className="text-sm font-pregular text-gray-100 text-center">
                Longitude: {location.longitude}
              </Text>
            </View>
          )}

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
