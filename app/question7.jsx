import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router"; // Import 'router' for navigation

import FormField from "../components/FormField"; // Assuming FormField is in components

const Question7 = () => {
  const [occupationOrMajor, setOccupationOrMajor] = useState("");

  const handleNext = () => {
    if (occupationOrMajor === "") {
      alert("Please enter your occupation or college major.");
      return;
    }
    // Navigate to the thank you page
    router.replace("/question8");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full flex justify-center items-center h-full px-4">
        <Text className="text-xl text-white font-bold mb-5">
          What is your occupation or college major?
        </Text>

        {/* FormField for entering occupation or college major */}
        <FormField
          title="Occupation or College Major"
          value={occupationOrMajor}
          placeholder="Enter your occupation or college major"
          handleChangeText={(text) => setOccupationOrMajor(text)} // Update the state with user input
          otherStyles="mb-5"
        />

        {/* Button to navigate to the thank you page */}
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

export default Question7;
