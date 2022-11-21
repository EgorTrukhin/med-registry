import {$host} from "./index";

export abstract class DataBaseApi {
    private static async get(path: string) {
        return await $host.get("api/" + path);
    }

    private static async post(path: string, args: any) {
        return await $host.post("api/" + path, args);
    }

    public static getTreats() {
        return this.get("treat");
    }

    public static getTreatByTypeId(typeId: string) {
        return this.get("treat/" + typeId);
    }

    public static createTreat(name: string, typeId: number) {
        return this.post("treat/create", { name, typeId });
    }

    public static deleteTreat(treatId: string) {
        return this.get("treat/delete/" + treatId);
    }

    public static editTreat(treatId: string, name: string, typeId: number) {
        return this.post("treat/edit/" + treatId, { name, typeId });
    }

    public static getTypes() {
        return this.get("type");
    }

    public static editType(typeId: string, name: string) {
        return this.post("treat/edit/" + typeId, { name });
    }
}