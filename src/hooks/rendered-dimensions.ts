import { useEffect, useState } from 'react';
import useWindowResize from './window-resize';

/**
 * calculate to be rendered dimensions of the image based on window size
 * @param intrinsicDimensions
 * @returns
 */
const useRenderedDimensions = (intrinsicDimensions: {
  width: number;
  height: number;
}) => {
  const [windowWidth, windowHeight] = useWindowResize(1);
  const [renderedDimensions, setRenderedDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  useEffect(() => {
    const intrinsicWidth = intrinsicDimensions.width,
      intrinsicHeight = intrinsicDimensions.height;
    let renderedWidth = intrinsicWidth,
      renderedHeight = intrinsicHeight;
    if (windowHeight / intrinsicHeight > windowWidth / intrinsicWidth) {
      renderedWidth = Math.floor(
        (intrinsicWidth * windowHeight) / intrinsicHeight
      );
      renderedHeight = windowHeight;
    } else {
      renderedWidth = windowWidth;
      renderedHeight = Math.floor(
        (intrinsicHeight * windowWidth) / intrinsicWidth
      );
    }
    setRenderedDimensions({ width: renderedWidth, height: renderedHeight });
  }, [windowWidth, windowHeight, intrinsicDimensions]);

  return renderedDimensions;
};

export default useRenderedDimensions;
