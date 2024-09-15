import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router'; // For navigation

const SpotifyAuth = () => {
  const handleNext = () => {
    // Navigate to question 8
    router.replace('/question8');
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full flex justify-center items-center h-full px-4">
        <Text className="text-xl text-black font-bold mb-5">
          Authenticate with Spotify
        </Text>

        {/* Button to move to the next question */}
        <TouchableOpacity
          onPress={handleNext}
          className="bg-secondary rounded-xl min-h-[62px] w-full flex justify-center items-center mt-5"
        >
          <Text className="text-primary font-psemibold text-lg">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SpotifyAuth;
