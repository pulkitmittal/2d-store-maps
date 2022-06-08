import floorplan from '../assets/images/mall-floor-plan.jpg';
import { StoreMap } from '../types/store-map';

/**
 * get map data from API
 * @returns
 */
export const getMap = (): Promise<StoreMap> => {
  // TODO get from API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        img: floorplan,
        width: 857,
        height: 1192,
      });
    }, 500);
  });
};
