import { Game } from "./game.model";
import { UserPartyGameRole } from "./user-party-game-role.model";

export class Party {
    id?: number;
    name?: string;
    maxPlayers?: number;
    description?: string;
    game?: Game;
    id_user?: number;
    userPartyGameRoles?: UserPartyGameRole[];
}
