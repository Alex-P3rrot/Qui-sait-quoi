import {Subject} from "../../models/Subject";

export type SubjectState = { [K: string]: Subject[] | Subject | null, selected: Subject|null, selectedList: Subject[]|null }