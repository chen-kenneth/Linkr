import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router"; // Import 'router' for navigation

import FormField from "../components/FormField"; // Assuming FormField is in components

const Question3 = () => {
  const [favoriteFood, setFavoriteFood] = useState("");

  const handleNext = () => {
    if (favoriteFood === "") {
      alert("Please enter your favorite food.");
      return;
    }
    // Navigate to the next question (question4)
    router.replace("/question4");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full flex justify-center items-center h-full px-4">
        <Text className="text-xl text-white font-bold mb-5">
          What is your favorite food?
        </Text>

        {/* FormField for entering favorite food */}
        <FormField
          title="Favorite Food"
          value={favoriteFood}
          placeholder="Enter your favorite food"
          handleChangeText={(text) => setFavoriteFood(text)} // Update the state with user input
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

export default Question3;
