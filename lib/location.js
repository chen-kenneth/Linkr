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

// Function to request location permissions and get current location
export const getCurrentLocation = async (setLocation) => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Allow the app to use the location services', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK' },
      ]);
      return;
    }

    const { coords } = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = coords;

    // Reverse geocoding to get human-readable address (optional)
    const response = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    // Store latitude and longitude (or reverse-geocoded address) in state
    if (response.length > 0) {
      const address = `${response[0].street}, ${response[0].city}, ${response[0].region}, ${response[0].country}, ${response[0].postalCode}`;
      setLocation({
        latitude,
        longitude,
        address,
      });
    }
  } catch (error) {
    console.error('Error getting location: ', error);
  }
};
