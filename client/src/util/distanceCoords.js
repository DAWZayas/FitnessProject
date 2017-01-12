export const distanceCoords = (coords1, coords2) => {
  const lat1 = (coords1.lat * Math.PI) / 180;
  const lat2 = (coords2.lat * Math.PI) / 180;
  const lng1 = (coords1.lng * Math.PI) / 180;
  const lng2 = (coords2.lng * Math.PI) / 180;
  return 6371 * Math.acos(
    (Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1)) +
    (Math.sin(lat1) * Math.sin(lat2))
  );
};
