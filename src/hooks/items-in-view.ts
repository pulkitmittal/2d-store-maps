import { useEffect, useMemo, useState } from 'react';
import { Location } from '../types/location';
import { Viewport } from '../types/viewport';
import useRenderedDimensions from './rendered-dimensions';

/**
 * filter out items based on coordinates, image and viewport
 * @param locations
 * @param intrinsicDimensions
 * @param viewport
 * @returns
 */
const useItemsInView = (
  locations: Location[],
  intrinsicDimensions: {
    width: number;
    height: number;
  },
  viewport: Viewport
) => {
  const renderedDimensions = useRenderedDimensions(intrinsicDimensions);

  // memoize relative location
  const relativeLocations = useMemo(() => {
    return locations.map((location) => ({
      id: location.id,
      x: Math.floor(
        (location.x / intrinsicDimensions.width) * renderedDimensions.width
      ),
      y: Math.floor(
        (location.y / intrinsicDimensions.height) * renderedDimensions.height
      ),
    }));
  }, [locations, intrinsicDimensions, renderedDimensions]);

  // filter products by viewport dimensions
  const [productsInViewport, setProductsInViewport] = useState<Location[]>([]);
  useEffect(() => {
    const filtered: Location[] = relativeLocations
      .filter((location) => {
        return (
          location.x >= viewport.minX &&
          location.x <= viewport.maxX &&
          location.y >= viewport.minY &&
          location.y <= viewport.maxY
        );
      })
      .map((location) => ({
        ...location,
        x: Math.floor((location.x - viewport.minX) * viewport.scale),
        y: Math.floor((location.y - viewport.minY) * viewport.scale),
      }));
    setProductsInViewport(filtered);
    // console.log('filtered:', JSON.stringify(filtered));
  }, [relativeLocations, viewport]);

  return productsInViewport;
};

export default useItemsInView;
