/**
 * Inspired from https://github.com/jaredLunde/react-hook
 */
import useEvent from '@react-hook/event';
import { useThrottle } from '@react-hook/throttle';

const win = typeof window === 'undefined' ? null : window;
const getHeight = (): number => (win as Window).innerHeight;
const getWidth = (): number => (win as Window).innerWidth;
const getDimension = (): [number, number] => [getWidth(), getHeight()];

const useWindowResize = (fps = 30): [number, number] => {
  const state = useThrottle<[number, number]>(
    typeof window === 'undefined' ? [0, 0] : getDimension,
    fps,
    true
  );
  useEvent(win, 'resize', (): void => state[1](getDimension()));
  return state[0];
};

export default useWindowResize;
