import { MetaData } from "./meta";
import { Structure } from "./structure";

export class StructureQuery {
    meta:MetaData;
    data:Structure[]
    constructor(meta:MetaData,data:Structure[]){
        this.meta = meta
        this.data = data
    }
}