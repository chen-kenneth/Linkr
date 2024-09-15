import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router"; // Import 'router' for navigation

import FormField from "../components/FormField"; // Assuming FormField is in components

const Question2 = () => {
  const [favoriteMovieOrShow, setFavoriteMovieOrShow] = useState("");

  const handleNext = () => {
    if (favoriteMovieOrShow === "") {
      alert("Please enter your favorite movie or TV show.");
      return;
    }
    // Navigate to the next question (question3)
    router.replace("/question3");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full flex justify-center items-center h-full px-4">
        <Text className="text-xl text-white font-bold mb-5">
          What is your favorite movie or TV show?
        </Text>

        {/* FormField for entering favorite movie or TV show */}
        <FormField
          title="Favorite Movie or TV Show"
          value={favoriteMovieOrShow}
          placeholder="Enter your favorite movie or TV show"
          handleChangeText={(text) => setFavoriteMovieOrShow(text)} // Update the state with user input
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

export default Question2;
