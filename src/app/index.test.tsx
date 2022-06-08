import { render, screen } from '@testing-library/react';
import App from '.';
import { StoreMap } from '../types/store-map';

jest.mock('../data/map', () => ({
  getMap: () =>
    new Promise<StoreMap>((resolve) => {
      const floorplan = require('../assets/images/mall-floor-plan.jpg');
      setTimeout(() => {
        resolve({
          img: floorplan,
          width: 857,
          height: 1192,
        });
      }, 500);
    }),
}));

test('loads and renders map', async () => {
  global.innerWidth = 425;
  global.innerHeight = 858;

  render(<App />);

  await screen.findByTestId('map');

  const map = screen.getByTestId('map');
  expect(map).toBeInTheDocument();
  expect(map).toHaveStyle(`width: 616px`); // 616 = 857 * 858/1192
  expect(map).toHaveStyle(`height: 858px`);
});
