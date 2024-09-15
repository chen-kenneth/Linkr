import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { makeRedirectUri, useAuthRequest, exchangeCodeAsync } from 'expo-auth-session';
import { router } from 'expo-router';
import * as Linking from 'expo-linking';

// Spotify API credentials (replace these with your own Spotify app credentials)
const CLIENT_ID = 'your-client-id';
const CLIENT_SECRET = 'your-client-secret';
const REDIRECT_URI = makeRedirectUri({
  native: 'yourapp://redirect', // Replace with your Expo or custom scheme redirect URI
});

const SpotifyAuth = () => {
  const [accessToken, setAccessToken] = useState(null);

  const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  };

  // Request config for Spotify OAuth
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: ['user-top-read', 'user-read-recently-played'],
      redirectUri: REDIRECT_URI,
      responseType: 'code',
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      // Get authorization code from response
      const { code } = response.params;

      // Exchange the authorization code for an access token
      const getAccessToken = async () => {
        const tokenResponse = await exchangeCodeAsync({
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          redirectUri: REDIRECT_URI,
          code,
        }, discovery);

        setAccessToken(tokenResponse.accessToken);

        // Fetch user preferences after getting access token
        fetchUserPreferences(tokenResponse.accessToken);
      };

      getAccessToken();
    }
  }, [response]);

  const fetchUserPreferences = async (token) => {
    try {
      const res = await fetch('https://api.spotify.com/v1/me/top/tracks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log('User top tracks:', data); // You can use this data for matching

      // Navigate to Question 8 after successfully fetching preferences
      router.replace('/question8');
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch Spotify preferences.');
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full flex justify-center items-center h-full px-4">
        <Text className="text-xl text-white font-bold mb-5">
          Authenticate with Spotify
        </Text>

        {/* Button to start the Spotify OAuth flow
        <TouchableOpacity
          onPress={() => promptAsync()}
          disabled={!request}
          className="bg-secondary rounded-xl min-h-[62px] w-full flex justify-center items-center mt-5"
        >
          <Text className="text-primary font-psemibold text-lg">Connect to Spotify</Text>
        </TouchableOpacity> */}

        {/* Navigate to Question 8 if user skips Spotify auth */}
        <TouchableOpacity
          onPress={() => router.replace('/question8')}
          className="bg-gray-200 rounded-xl min-h-[62px] w-full flex justify-center items-center mt-5"
        >
          <Text className="text-primary font-psemibold text-lg">Skip and Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SpotifyAuth;
