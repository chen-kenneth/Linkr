import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, RefreshControl, View, TouchableOpacity, Text, PanResponder, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Power icon
import ExpandableList from "../../components/ExpandableList";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts } from "../../lib/appwrite";
import { VideoCard } from "../../components";
import { checkIfLocationEnabled, requestLocationPermissions, watchCurrentLocation } from "../../lib/location"; // Location functions

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);

  const sample_data = [
    { id: 1, title: "Kenneth", content: "Interests: Music, Programming" },
    { id: 2, title: "Wasif", content: "Interests: Sports, Technology" },
    { id: 3, title: "Justin", content: "Interests: Gaming, Design" },
    { id: 4, title: "Raihaan", content: "Interests: Art, Reading" }
  ];
  

  const [refreshing, setRefreshing] = useState(false);
  const [powerOn, setPowerOn] = useState(false); // Power button state
  const [userLocation, setUserLocation] = useState(null); // State to store location
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState('Location Loading...');
  const [locationSubscription, setLocationSubscription] = useState(null); // For managing location subscription

  // Check if location services are enabled and fetch the location
  useEffect(() => {
    const enableLocationServices = async () => {
      const locationEnabled = await checkIfLocationEnabled();
      if (locationEnabled) {
        const permissionGranted = await requestLocationPermissions();
        if (permissionGranted) {
          // Start watching the location with updates every 3 seconds
          const subscription = await watchCurrentLocation((location) => {
            setUserLocation(location); // Store location (latitude, longitude, and address)
            setDisplayCurrentAddress(location.address); // Update address to display
          });
          setLocationSubscription(subscription); // Save the subscription
        }
      }
    };

    if (powerOn) {
      enableLocationServices(); // Start watching location only if power is on
    } else if (locationSubscription) {
      // Stop watching location when power is turned off
      locationSubscription.remove();
      setLocationSubscription(null);
    }

    return () => {
      // Cleanup subscription when the component unmounts
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [powerOn]); // Run whenever powerOn state changes

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // Function to toggle power state
  const togglePower = () => {
    setPowerOn(!powerOn);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex-1 justify-center items-center mt-40">
            {/* Power Button */}
            {/* CHANGE SIZE OF BUTTON AND/OR ICON */}
            <TouchableOpacity
              className={`w-28 h-28 rounded-full bg-white justify-center items-center border-4 ${
                powerOn ? "border-green" : "border-red"
              }`}
              onPress={togglePower}
            >
              <Ionicons name="power" size={50} color={powerOn ? "green" : "red"} />
            </TouchableOpacity>

            {/* Display Location Address and Coordinates if Power is On */}
            {powerOn && userLocation && (
              <View className="mt-6">
                <Text className="text-lg font-pregular text-center">{displayCurrentAddress}</Text>
                <Text className="text-lg font-pregular text-center">Latitude: {userLocation.latitude}</Text>
                <Text className="text-lg font-pregular text-center">Longitude: {userLocation.longitude}</Text>
              </View>
            )}
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <ExpandableList data={sample_data}/>
    </SafeAreaView>
  );
};

export default Home;
