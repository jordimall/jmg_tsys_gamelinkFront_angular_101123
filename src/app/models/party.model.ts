import { UserPartyGameRole } from "./user-party-game-role.model";

export class Party {
    id?: number;
    name?: string;
    max_players?: number;
    description?: string;
    id_game?: number;
    id_user?: number;
    userPartyGameRole?: UserPartyGameRole[];
}
