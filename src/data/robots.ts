import { RobotLocation } from '../types/location';
import { getMap } from './map';

/**
 * get robot locations from API
 * @returns
 */
export const getRobotLocations = async (): Promise<RobotLocation[]> => {
  const map = await getMap();
  const count = 10;
  const robots: RobotLocation[] = [];

  for (let i = 0; i < count; i++) {
    robots.push({
      id: String(i),
      x: Math.floor(Math.random() * map.width),
      y: Math.floor(Math.random() * map.height),
      name: 'robot' + String(i),
      orientation: Math.floor(Math.random() * 360),
      speed: Math.floor(Math.random() * 10),
      dest_x: Math.floor(Math.random() * map.width),
      dest_y: Math.floor(Math.random() * map.height),
    });
  }

  // TODO get from API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(robots);
    }, 500);
  });
};

export const getRobotLiveLocations = (robots: RobotLocation[]) => {
  return [...robots].map((robot) => {
    // TODO this should be calculated using orientation & speed
    robot.x += robot.x < robot.dest_x ? robot.speed : 0;
    robot.y += robot.y < robot.dest_y ? robot.speed : 0;
    return robot;
  });
};
