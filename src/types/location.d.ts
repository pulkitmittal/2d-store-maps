export interface Location {
  id: string;
  x: number;
  y: number;
}

export interface RobotLocation extends Location {
  name: string;
  orientation: number;
  speed: number;
  dest_x: number;
  dest_y: number;
}
