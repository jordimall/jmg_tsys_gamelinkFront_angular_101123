import { Game } from './game.model';

export class Event {
  id?: number;
  name?: string;
  description?: string;
  status?: string;
  start?: string;
  end?: string;
  id_game?: Game;
  idUser?: number;
}
