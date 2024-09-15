import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, RefreshControl, View, Text, Switch } from "react-native";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts } from "../../lib/appwrite"; // Function to fetch posts
import { checkIfLocationEnabled, requestLocationPermissions, watchCurrentLocation, findNearbyUsers } from "../../lib/location"; // Location functions
import ExpandableList from "../../components/ExpandableList"; // Your expandable list component

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts); // Fetch posts
  const [refreshing, setRefreshing] = useState(false);
  const [powerOn, setPowerOn] = useState(false); // Power state using Switch component
  const [userLocation, setUserLocation] = useState(null); // State to store location
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState("Location Loading...");
  const [locationSubscription, setLocationSubscription] = useState(null); // For managing location subscription
  const [nearbyUsers, setNearbyUsers] = useState([]); // Store nearby users


  // ...
  const sample_users = [
    {
      id: "66e69b7f9d1265ede0d2",
      username: "Dududjd",
      email: "Cjkocoj@gmail.com",
      avatar: "https://cloud.appwrite.io/v1/avatars/initials?name=Dududjd+&project=66e54595001d85ffbc43",
      biggestDream: "I want to become rich",
      favoriteAnimal: "Eagle",
      favoriteFood: "Apples",
      favoriteFry: "Curly",
      favoriteMovieOrShow: "Mulan",
      favoriteSport: "Table tennis",
      hobbies: "Poker",
      latitude: 43.472529799496,
      longitude: -80.539694767929,
      occupationOrMajor: "Computer Science"
    },
    {
      id: "66e6ae8da3b2863c7dfc",
      username: "dshs",
      email: "sjss@g.con",
      avatar: "https://cloud.appwrite.io/v1/avatars/initials?name=dshs&project=66e54595001d85ffbc43",
      biggestDream: null,
      favoriteAnimal: "d",
      favoriteFood: "d",
      favoriteFry: "s",
      favoriteMovieOrShow: "s",
      favoriteSport: "d",
      hobbies: "s",
      latitude: null,
      longitude: null,
      occupationOrMajor: null
    },
    {
      id: "66e6aed13ed60daf8e22",
      username: "dh",
      email: "d@gdkdd.com",
      avatar: "https://cloud.appwrite.io/v1/avatars/initials?name=dh&project=66e54595001d85ffbc43",
      biggestDream: null,
      favoriteAnimal: "s",
      favoriteFood: "s",
      favoriteFry: "s",
      favoriteMovieOrShow: "s",
      favoriteSport: "s",
      hobbies: "s",
      latitude: 43.472552532341,
      longitude: -80.539772329305,
      occupationOrMajor: null
    },
    {
      id: "66e6bc365c2ce3b53966",
      username: "Shash",
      email: "shshs@gmail.com",
      avatar: "https://cloud.appwrite.io/v1/avatars/initials?name=Shash&project=66e54595001d85ffbc43",
      biggestDream: "Starting a company",
      favoriteAnimal: "Cat",
      favoriteFood: "Kimchi",
      favoriteFry: "Steak",
      favoriteMovieOrShow: "THE big Bang theory",
      favoriteSport: "Tennis",
      hobbies: "Programming, league of legends",
      latitude: 43.472546588293,
      longitude: -80.539721928297,
      occupationOrMajor: "CS"
    },
    {
      id: "66e6c1d37e20ecf01749",
      username: "Jddjd",
      email: "Jddjd@gmail.com",
      avatar: "https://cloud.appwrite.io/v1/avatars/initials?name=Jddjd&project=66e54595001d85ffbc43",
      biggestDream: "Ubisoft",
      favoriteAnimal: "Panda",
      favoriteFood: "Chips",
      favoriteFry: "Curly",
      favoriteMovieOrShow: "Tn r",
      favoriteSport: "Cricket",
      hobbies: "CS , math , league",
      latitude: 43.472541160149,
      longitude: -80.539714895619,
      occupationOrMajor: "Arts"
    }
  ];
  
  // Check if location services are enabled and fetch the location
  useEffect(() => {
    const enableLocationServices = async () => {
      const locationEnabled = await checkIfLocationEnabled();
      if (locationEnabled) {
        const permissionGranted = await requestLocationPermissions();
        if (permissionGranted) {
          // Start watching the location with updates every 3 seconds
          const subscription = await watchCurrentLocation(async (location) => {
            setUserLocation(location); // Store location (latitude, longitude, and address)
            setDisplayCurrentAddress(location.address); // Update address to display

            // Find nearby users when location is available
            const nearby = await findNearbyUsers(location, 5); // 5 km radius
            // setNearbyUsers(nearby); // Set nearby users to state
            setNearbyUsers(sample_users);
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

  // Function to refresh posts
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <FlatList
        data={posts}
        ListHeaderComponent={() => (
          <View className="flex-1 justify-center items-center mt-40">
            {/* Enlarged Switch Component with Text below the pill */}
            <View style={{ alignItems: 'center' }}>
              <Switch
                value={powerOn}
                onValueChange={(value) => setPowerOn(value)}
                // onValueChange={() => setShowAll(!showAll)}
                trackColor={{ false: "#FF0000", true: "#d43c1c" }} // Red for OFF, Green for ON
                thumbColor="#FFFFFF" // White circle
                style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }} // Scale up the switch
              />
            
              {/* Text with conditional green and red parts */}
              <Text style={{ fontSize: 20, marginTop: 40 }}>
                Your location
                <Text style={{ color: powerOn ? "#d43c1c" : "#d43c1c", fontFamily:"Inter-Black" }}> {powerOn ? "IS" : "IS NOT"} </Text>
                being shared
              </Text>
            </View>

            {/* Display Location Address and Coordinates if Power is On */}
            {powerOn && userLocation && (
              <View className="mt-6">
                <Text className="text-md font-pregular text-center">{displayCurrentAddress}</Text>
              </View>
            )}
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      {/* Display nearby users in ExpandableList */}
        <ExpandableList data={nearbyUsers} toggleOn={powerOn} />
    </SafeAreaView>
  );
};

export default Home;
