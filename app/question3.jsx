import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router"; // Import 'router' for navigation

import FormField from "../components/FormField"; // Assuming FormField is in components
import { onboardUser } from "../lib/appwrite"; // Import the onboardUser function

const Question3 = () => {
  const [favoriteFood, setFavoriteFood] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Manage the submission state

  const handleNext = async () => {
    if (favoriteFood === "") {
      alert("Please enter your favorite food.");
      return;
    }

    // Start submitting
    setIsSubmitting(true);

    try {
      // Add favorite food to the user's onboarding data
      await onboardUser({ favoriteFood });

      // Navigate to the next question (question4) once the data is saved
      router.replace("/question4");
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

export default Question3;
