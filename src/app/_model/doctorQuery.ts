import { Doctor } from "./doctor";
import { MetaData } from "./meta";
// import { Structure } from "./structure";

export class DoctorQuery {
    meta:MetaData;
    data:Doctor[]
    constructor(meta:MetaData,data:Doctor[]){
        this.meta = meta
        this.data = data
    }
}