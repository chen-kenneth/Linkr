import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router"; // For navigating back to the home or another screen

const ThankYouPage = () => {
  const handleContinue = () => {
    // Navigate to the next step, perhaps a dashboard or home page
    router.replace("/home"); // Adjust this to navigate where you want the user to go next
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full flex justify-center items-center h-full px-4">
        {/* Thank you message */}
        <Text className="text-2xl text-white font-bold text-center mt-5">
          You're in!
        </Text>
        <Text className="text-xl text-secondary font-psemibold text-center mt-2">
          Time to get linking!
        </Text>

        {/* Button to navigate to home or another page */}
        <TouchableOpacity
          onPress={handleContinue}
          className="bg-secondary rounded-xl min-h-[62px] w-full flex justify-center items-center mt-10"
        >
          <Text className="text-primary font-psemibold text-lg">Let's Go</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ThankYouPage;
