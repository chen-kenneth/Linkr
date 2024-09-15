import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router"; // Import 'router' for navigation

import FormField from "../components/FormField"; // Assuming FormField is in components

const Question9 = () => {
  const [biggestDream, setBiggestDream] = useState("");

  const handleNext = () => {
    if (biggestDream === "") {
      alert("Please describe your biggest dream.");
      return;
    }
    // Navigate to the thank you page
    router.replace("/thankyou");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full flex justify-center items-center h-full px-4">
        <Text className="text-xl text-white font-bold mb-5">
          Describe your biggest dream
        </Text>

        {/* FormField for entering description of biggest dream */}
        <FormField
          title="Biggest Dream"
          value={biggestDream}
          placeholder="Describe your biggest dream"
          handleChangeText={(text) => setBiggestDream(text)} // Update the state with user input
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

export default Question9;
