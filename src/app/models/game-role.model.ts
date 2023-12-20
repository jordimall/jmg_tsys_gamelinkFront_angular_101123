import { GameGameRole } from './game-game-role.model';

export class GameRole {
  id?: number;
  name?: string;
  description?: string;
  icon_url?: string;
  gameGameRole?:GameGameRole[];
}
