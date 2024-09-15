import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router"; // Import 'router' for navigation

import FormField from "../components/FormField"; // Assuming FormField is in components

const Question1 = () => {
  const [hobbies, setHobbies] = useState("");

  const handleNext = () => {
    if (hobbies === "") {
      alert("Please enter your hobbies.");
      return;
    }
    // Navigate to the next question (question2)
    router.replace("/question2");
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
        <TouchableOpacity onPress={handleNext} className="bg-secondary rounded-xl min-h-[62px] w-full flex justify-center items-center mt-5">
          <Text className="text-primary font-psemibold text-lg">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Question1;
