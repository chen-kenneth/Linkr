import * as Location from 'expo-location';
import { Alert } from 'react-native';

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

// Function to continuously watch the location and update every 3 seconds
export const watchCurrentLocation = async (setLocation) => {
  try {
    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000, // Update every 3 seconds
        distanceInterval: 0, // No minimum distance change required
      },
      (location) => {
        const { latitude, longitude } = location.coords;

        // Reverse geocoding to get human-readable address (optional)
        Location.reverseGeocodeAsync({ latitude, longitude }).then((response) => {
          if (response.length > 0) {
            const address = `${response[0].street}, ${response[0].city}, ${response[0].region}, ${response[0].country}, ${response[0].postalCode}`;
            setLocation({
              latitude,
              longitude,
              address,
            });
          } else {
            setLocation({
              latitude,
              longitude,
              address: 'Address not available',
            });
          }
        });
      }
    );

    return subscription; // Return the subscription to be able to cancel it later
  } catch (error) {
    console.error('Error watching location: ', error);
  }
};
