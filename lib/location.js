import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { onboardUser } from './appwrite';
import { euclideanDistance } from './util';
import { getAllPosts } from './appwrite'; // Import your function that fetches all users (or posts)

// Function to find nearby users within a specific radius (e.g., 5 km)
export const findNearbyUsers = async (currentUserLocation, radiusInKm = 5) => {
  try {
    // Fetch all posts (users in your case)
    const allUsers = await getAllPosts();

    // Extract the latitude and longitude of the current user
    const { latitude: currentLat, longitude: currentLon } = currentUserLocation;

    // Filter users who are within the specified radius
    const nearbyUsers = allUsers.filter((user) => {
      // Skip if the user doesn't have valid latitude/longitude data
      if (!user.latitude || !user.longitude) {
        return false;
      }

      // Calculate the distance between the current user and each user
      const distance = euclideanDistance(
        currentLat,
        currentLon,
        user.latitude,
        user.longitude
      );

      // Return true if the user is within the specified radius
      return distance <= radiusInKm;
    });

    return nearbyUsers;
  } catch (error) {
    console.error('Error finding nearby users:', error);
    return [];
  }
};

// Function to check if location services are enabled
export const checkIfLocationEnabled = async () => {
  let enabled = await Location.hasServicesEnabledAsync();
  if (!enabled) {
    Alert.alert('Location not enabled', 'Please enable your Location', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'OK', onPress: () => Location.openSettings() },
    ]);
    return false;
  }
  return true;
};

// Function to request location permissions
export const requestLocationPermissions = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Allow the app to use the location services', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK' },
      ]);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error requesting location permissions: ', error);
    return false;
  }
};

export const watchCurrentLocation = async (setLocation) => {
  try {
    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 3000, // Update every 3 seconds
        distanceInterval: 0,
      },
      async (location) => {
        const { latitude, longitude } = location.coords;

        // Reverse geocoding to get human-readable address (optional)
        const response = await Location.reverseGeocodeAsync({ latitude, longitude });
        const address = response.length > 0
          ? `${response[0].street}, ${response[0].city}, ${response[0].region}, ${response[0].country}, ${response[0].postalCode}`
          : 'Address not available';

        // Update state with the new location
        setLocation({
          latitude,
          longitude,
          address,
        });

        // Call onboardUser to update latitude, longitude in Appwrite
        try {
          await onboardUser({
            latitude,
            longitude,
          });
        } catch (error) {
          console.error('Error updating user location in Appwrite: ', error);
        }
      }
    );

    return subscription;
  } catch (error) {
    console.error('Error watching location: ', error);
  }
};
