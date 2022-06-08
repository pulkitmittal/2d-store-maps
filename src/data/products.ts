import { Location } from '../types/location';
import { getMap } from './map';

/**
 * get product locations from API
 * @returns
 */
export const getProductLocations = async (): Promise<Location[]> => {
  const map = await getMap();
  const count = 100;
  const locations: Location[] = [];

  for (let i = 0; i < count; i++) {
    locations.push({
      id: String(i),
      x: Math.floor(Math.random() * map.width),
      y: Math.floor(Math.random() * map.height),
    });
  }

  // TODO get from API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(locations);
    }, 500);
  });
};
