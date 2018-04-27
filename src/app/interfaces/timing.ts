import { Car } from './car';
import { Track } from './track';
import { Player } from './player';

export interface Timing {
  id?: string;
  laptime: number;
  sector1: number;
  sector2: number;
  sector3: number;
  car: Car,
  track: Track,
  time: Date;
  classic: boolean;
  tire_compound: number;
  traction_control: number;
  anti_lock_brakes: boolean;
  tyre_wear: Array<number>;
  playerId?: string;
  gap?: number;
  player?: Player;
}
