import { IBillOfMaterial } from "./BillOfMaterial";

export interface IOrders {
    id: number,
    finishedWeight: number,
    status: string,
    quantity:number,
    createdDate: Date,
    updatedDate: Date,
    billOfMaterial: IBillOfMaterial
}