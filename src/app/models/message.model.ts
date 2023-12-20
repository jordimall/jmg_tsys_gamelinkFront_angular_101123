import { Party } from "./party.model";
import { User } from "./user.model";

export class Message {
    id?: number;
    message?: string;
    created_at?: Date;
    updated_at?: Date;
    author?: User;
    party?: Party;
}
