import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router"; // Import 'router' for navigation

import FormField from "../components/FormField"; // Assuming FormField is in components
import { onboardUser } from "../lib/appwrite"; // Import the onboardUser function

const Question2 = () => {
  const [favoriteMovieOrShow, setFavoriteMovieOrShow] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Manage the submission state

  const handleNext = async () => {
    if (favoriteMovieOrShow === "") {
      alert("Please enter your favorite movie or TV show.");
      return;
    }

    // Start submitting
    setIsSubmitting(true);

    try {
      // Add favorite movie or TV show to the user's onboarding data
      await onboardUser({ favoriteMovieOrShow });

      // Navigate to the next question (question3) once the data is saved
      router.replace("/question3");
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error("Onboarding error:", error);
    } finally {
      setIsSubmitting(false);
    }
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
          className={`bg-secondary rounded-xl min-h-[62px] w-full flex justify-center items-center mt-5 ${isSubmitting ? "opacity-50" : ""}`}
          disabled={isSubmitting} // Disable the button while submitting
        >
          <Text className="text-primary font-psemibold text-lg">
            {isSubmitting ? "Saving..." : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Question2;
