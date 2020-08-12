import { ILocationDocument, ILocationModel } from "./locations.types";

// Finds the nearest location for the given coordinates
export async function findNearestNeighborhood(
  this: ILocationModel,
  latitude: number,
  longitude: number,
): Promise<ILocationDocument> {
  const locations = await this.find();
  var closest = null;
  var minimumDistance = Number.MAX_SAFE_INTEGER;
  for (let location of locations) {
    const distance = euclideanDistance(location, latitude, longitude);
    if (distance < minimumDistance) {
      closest = location;
      minimumDistance = distance;
    }
  }
  return closest;
}

// Calculates euclidean distance between a location's center and the given coordinates
function euclideanDistance(location: ILocationDocument, latitude: number, longitude: number): number {
  const x = Math.pow(location.centerLatitude - latitude, 2);
  const y = Math.pow(location.centerLongitude - longitude, 2);
  return Math.sqrt(x + y);
}
