export function haversineDistance(coord1, coord2) {
  console.log("as", coord1, coord2);
    const earthRadius = 6371; // Radius of the Earth in kilometers
  
    const toRadians = (angle) => (angle * Math.PI) / 180;
  
    const lat1 = toRadians(coord1.lat);
    const lng1 = toRadians(coord1.lng);
    const lat2 = toRadians(coord2.lat);
    const lng2 = toRadians(coord2.lng);
  
    const dLat = lat2 - lat1;
    const dLng = lng2 - lng1;
  
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = earthRadius * c;
  
    return distance;
  }