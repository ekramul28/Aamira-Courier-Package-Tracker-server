export const updateCourierLocation = async (
  userId,
  lat,
  lon,
  timestamp,
  packageId,
) => {
  // Implement upsert logic for live location
  // Example: LiveLocation.findOneAndUpdate({ user: userId }, { lat, lon, timestamp, packageId }, { upsert: true, new: true })
};
