import {Moment} from "moment/moment";

export interface formValuesInterface {
    username: string,
    password: string,
    email?: string,
    birthdate?: string | Moment | null,
    picture?: File|null,
    location?: string
}