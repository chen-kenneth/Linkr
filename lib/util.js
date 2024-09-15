// Helper function to calculate Euclidean distance between two coordinates
export const euclideanDistance = (lat1, lon1, lat2, lon2) => {
    const dLat = lat2 - lat1; // Difference in latitude
    const dLon = lon2 - lon1; // Difference in longitude
  
    // Apply Euclidean distance formula
    const distance = Math.sqrt(dLat * dLat + dLon * dLon);
  
    return distance; // This is the Euclidean distance
  };
  
  // Helper function to check if the distance is within a margin of 1 degree
  export const isWithinMargin = (lat1, lon1, lat2, lon2, margin = 1) => {
    const distance = euclideanDistance(lat1, lon1, lat2, lon2);
    
    // Check if the distance is less than or equal to the margin (1 degree by default)
    return distance <= margin;
  };
  