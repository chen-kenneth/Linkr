import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, RefreshControl, View, Text, Switch } from "react-native";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts } from "../../lib/appwrite";
import { VideoCard } from "../../components";
import { checkIfLocationEnabled, requestLocationPermissions, watchCurrentLocation } from "../../lib/location"; // Location functions
import ExpandableList from "../../components/ExpandableList";


const Home = () => {
 const { data: posts, refetch } = useAppwrite(getAllPosts);


 // Sample data
 const sample_data = [
   { id: 1, title: "Person 1", content: "Details about Person 1" },
   { id: 2, title: "Person 2", content: "Details about Person 2" },
   { id: 3, title: "Person 3", content: "Details about Person 3" },
 ];


 const [refreshing, setRefreshing] = useState(false);
 const [powerOn, setPowerOn] = useState(false); // Power state using Switch component
 const [userLocation, setUserLocation] = useState(null); // State to store location
 const [displayCurrentAddress, setDisplayCurrentAddress] = useState("Location Loading...");
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
           {/* Enlarged Switch Component with Text below the pill */}
           <View style={{ alignItems: 'center' }}>
             <Switch
               value={powerOn}
               onValueChange={(value) => setPowerOn(value)}
               trackColor={{ false: "#FF0000", true: "#00FF00" }} // Red for OFF, Green for ON
               thumbColor="#FFFFFF" // White circle
               style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }} // Scale up the switch
             />
            
             {/* Text with conditional green and red parts */}
             <Text style={{ fontSize: 20, marginTop: 20 }}>
               Your location
               <Text style={{ color: powerOn ? "#00FF00" : "#FF0000" }}> {powerOn ? "IS" : "IS NOT"} </Text>
               being shared
             </Text>
           </View>


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
     <ExpandableList data={sample_data} toggleOn={powerOn} />
   </SafeAreaView>
 );
};


export default Home;
