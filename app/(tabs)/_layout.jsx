import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs, router, usePathname } from "expo-router"; // Import 'usePathname' to get the current route
import { Image, Text, View, TouchableOpacity } from "react-native";


import { icons } from "../../constants";
import { Loader } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";


const TabIcon = ({ icon, color, name, focused, onPress }) => {
 return (
   <TouchableOpacity onPress={onPress} style={{ alignItems: "center", justifyContent: "center" }}>
     <Image
       source={icon}
       resizeMode="contain"
       style={{ tintColor: color, width: 24, height: 24 }} // Use style to apply tintColor
     />
     <Text
       className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
       style={{ color: color, marginTop: 4 }} // Adds a gap between the icon and the text
     >
       {name}
     </Text>
   </TouchableOpacity>
 );
};


const TabLayout = () => {
 const { loading, isLogged } = useGlobalContext();
 const currentPath = usePathname(); // Get the current path to determine which screen is active


 if (!loading && !isLogged) return <Redirect href="/sign-in" />;


 return (
   <>
     {/* Conditionally render the top bar based on the current route */}
     <View
       style={{
         backgroundColor: "#161622",
         borderBottomWidth: 1,
         borderBottomColor: "#232533",
         borderTopWidth: 50,
         borderTopColor: "#161622",
         height: 120, // Ensure this height is appropriate for the tab bar
         flexDirection: "row",
         justifyContent: "space-between",
         paddingHorizontal: 50,
         alignItems: "center", // Align icons vertically in the center
       }}
     >
       {/* Only show the profile icon in the top-right and the logo in the center on the home page */}
       {currentPath === "/home" ? (
         <>
           {/* Center Logo */}
           <Image
             source={icons.logo} // Add your logo icon here
             resizeMode="contain"
             style={{ width: 80, height: 80 }} // Adjust logo size
           />
           {/* Profile Icon on the right */}
           <TabIcon
             icon={icons.profile}
             color="#FFA001"
             name="Profile"
             focused={true}
             onPress={() => router.push("/profile")} // Navigate to Profile screen
           />
         </>
       ) : (
         <>
           {/* Home and Profile Icons for other screens */}
           <TabIcon
             icon={icons.home}
             color="#FFA001"
             name="Home"
             focused={currentPath === "/home"}
             onPress={() => router.push("/home")} // Navigate to Home screen
           />


           <TabIcon
             icon={icons.profile}
             color="#FFA001"
             name="Profile"
             focused={currentPath === "/profile"}
             onPress={() => router.push("/profile")} // Navigate to Profile screen
           />
         </>
       )}
     </View>


     <Tabs
       screenOptions={{
         tabBarActiveTintColor: "#FFA001",
         tabBarInactiveTintColor: "#CDCDE0",
         tabBarShowLabel: false,
         tabBarStyle: {
           display: 'none', // Hide the default tab bar at the bottom
         },
       }}
     >
       <Tabs.Screen
         name="home"
         options={{
           title: "Home",
           headerShown: false,
         }}
       />


       <Tabs.Screen
         name="profile"
         options={{
           title: "Profile",
           headerShown: false,
         }}
       />
     </Tabs>


     <Loader isLoading={loading} />
     <StatusBar backgroundColor="#161622" style="light" />
   </>
 );
};


export default TabLayout;


