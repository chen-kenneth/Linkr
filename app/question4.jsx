import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router"; // Import 'router' for navigation

import FormField from "../components/FormField"; // Assuming FormField is in components

const Question4 = () => {
  const [favoriteSport, setFavoriteSport] = useState("");

  const handleNext = () => {
    if (favoriteSport === "") {
      alert("Please enter your favorite sport.");
      return;
    }
    // Navigate to the next question (thank you or question5 if needed)
    router.replace("/question5");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full flex justify-center items-center h-full px-4">
        <Text className="text-xl text-white font-bold mb-5">
          What is your favorite sport?
        </Text>

        {/* FormField for entering favorite sport */}
        <FormField
          title="Favorite Sport"
          value={favoriteSport}
          placeholder="Enter your favorite sport"
          handleChangeText={(text) => setFavoriteSport(text)} // Update the state with user input
          otherStyles="mb-5"
        />

        {/* Button to navigate to the next question */}
        <TouchableOpacity
          onPress={handleNext}
          className="bg-secondary rounded-xl min-h-[62px] w-full flex justify-center items-center mt-5"
        >
          <Text className="text-primary font-psemibold text-lg">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Question4;
