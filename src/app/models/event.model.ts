import { Game } from './game.model';
import { User } from './user.model';
export class Event {
  id?: number;
  name?: string;
  description?: string;
  status?: string;
  start?: string;
  end?: string;
  idGame?: Game;
  idUser?: User;
}
