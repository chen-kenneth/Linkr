import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router"; // Import 'router' for navigation

import FormField from "../components/FormField"; // Assuming FormField is in components
import { onboardUser } from "../lib/appwrite"; // Import the onboardUser function

const Question1 = () => {
  const [hobbies, setHobbies] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // To manage the submission state

  const handleNext = async () => {
    if (hobbies === "") {
      alert("Please enter your hobbies.");
      return;
    }

    // Start submitting
    setIsSubmitting(true);

    try {
      // Add hobbies to the user's onboarding data
      await onboardUser({ hobbies }); // Add hobbies to the user document in the database

      // Navigate to the next question (question2) once hobbies are saved
      router.replace("/question2");
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
          What are your hobbies?
        </Text>

        {/* FormField for entering hobbies */}
        <FormField
          title="Hobbies"
          value={hobbies}
          placeholder="Enter your hobbies"
          handleChangeText={(text) => setHobbies(text)} // Update the state with user input
          otherStyles="mb-5"
        />

        {/* Link to navigate to the next question */}
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

export default Question1;
