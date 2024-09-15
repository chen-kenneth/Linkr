import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router"; // Import 'router' for navigation

import FormField from "../components/FormField"; // Assuming FormField is in components
import { onboardUser } from "../lib/appwrite"; // Import the onboardUser function

const Question5 = () => {
  const [favoriteFry, setFavoriteFry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // To manage the submission state

  const handleNext = async () => {
    if (favoriteFry === "") {
      alert("Please enter your favorite type of French fry.");
      return;
    }

    // Start submitting
    setIsSubmitting(true);

    try {
      // Add favoriteFry to the user's onboarding data
      await onboardUser({ favoriteFry });

      // Navigate to the next question (question6) once the fry type is saved
      router.replace("/question6");
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
          What is your favorite type of French fry?
        </Text>

        {/* FormField for entering favorite type of French fry */}
        <FormField
          title="Favorite French Fry"
          value={favoriteFry}
          placeholder="Enter your favorite type of French fry"
          handleChangeText={(text) => setFavoriteFry(text)} // Update the state with user input
          otherStyles="mb-5"
        />

        {/* Button to navigate to the next question */}
        <TouchableOpacity
          onPress={handleNext}
          className={`bg-secondary rounded-xl min-h-[62px] w-full flex justify-center items-center mt-5 ${isSubmitting ? "opacity-50" : ""}`}
          disabled={isSubmitting} // Disable button while submitting
        >
          <Text className="text-primary font-psemibold text-lg">
            {isSubmitting ? "Saving..." : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Question5;
