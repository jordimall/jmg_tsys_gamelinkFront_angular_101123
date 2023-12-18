import { GameRole } from "./game-role.model";
import { Party } from "./party.model";
import { User } from "./user.model";

export class UserPartyGameRole {
    user?: User;
    gameRole?: GameRole;
    party?: Party;
}
