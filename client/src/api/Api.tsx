import {$host} from "./index";
import {AppointmentListHeader} from "../components/AppointmentList/AppointmentList";
import {IFormValues} from "../components/InspectList/CreateForm";

export interface ExcelRequestArgs {
    header: AppointmentListHeader;
    content: any;
}

export interface WordRequestArgs {
    templateText: string;
    values: IFormValues;
}

export abstract class DataBaseApi {
    private static async get(path: string) {
        return await $host.get("api/" + path);
    }

    private static async post(path: string, args: any) {
        return await $host.post("api/" + path, args);
    }

    private static async getFile(path: string, args) {
        return await $host.post("api/" + path, args, { responseType: 'blob' });
    }

    public static excel(args: ExcelRequestArgs) {
        return this.getFile("download/excel", args);
    }

    public static word(args: WordRequestArgs) {
        return this.getFile("download/word", args);
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

    public static createType(name: string) {
        return this.post("type/create", { name });
    }

    public static deleteType(typeId: string) {
        return this.get("type/delete/" + typeId);
    }

    public static editType(typeId: string, name: string) {
        return this.post("type/edit/" + typeId, { name });
    }

    public static getDiets() {
        return this.get("diet");
    }

    public static createDiet(name: string) {
        return this.post("diet/create", { dietName: name });
    }

    public static deleteDiet(dietId: string) {
        return this.get("diet/delete/" + dietId);
    }

    public static editDiet(dietId: string, name: string) {
        return this.post("diet/edit/" + dietId, { dietName: name });
    }

    public static getTreatments() {
        return this.get("treatment");
    }

    public static createTreatment(name: string) {
        return this.post("treatment/create", { treatmentName: name });
    }

    public static deleteTreatment(treatmentId: string) {
        return this.get("treatment/delete/" + treatmentId);
    }

    public static editTreatment(treatmentId: string, name: string) {
        return this.post("treatment/edit/" + treatmentId, { treatmentName: name });
    }

    public static getPatients() {
        return this.get("patient");
    }

    public static createPatient(firstName: string, secondName: string, middleName: string) {
        return this.post("patient/create", { firstName, secondName, middleName });
    }

    public static deletePatient(patientId: string) {
        return this.get("patient/delete/" + patientId);
    }

    public static editPatient(patientId: string, firstName: string, secondName: string, middleName: string) {
        return this.post("patient/edit/" + patientId, { firstName, secondName, middleName });
    }

    public static getTemplateAttrs() {
        return this.get("templateAttr");
    }

    public static getTemplateAttrsByTemplateId(templateId) {
        return this.get("templateAttr/" + templateId);
    }

    public static createTemplateAttr(ident: string, description: string, inspectionListTemplateId: string) {
        return this.post("templateAttr/create", { ident, description, inspectionListTemplateId });
    }

    public static deleteTemplateAttr(ident: string) {
        return this.get("templateAttr/delete/" + ident);
    }

    public static editTemplateAttr(ident: string, description: string, inspectionListTemplateId: string) {
        return this.post("templateAttr/edit/" + ident, { description, inspectionListTemplateId });
    }

    public static getTemplateValues() {
        return this.get("templateValue");
    }

    public static getTemplateValuesByAttrIdent(ident) {
        return this.get("templateValue/" + ident);
    }

    public static createTemplateValue(value: string, templateAttrIdent: string) {
        return this.post("templateValue/create", { value, templateAttrIdent });
    }

    public static deleteTemplateValue(id: string) {
        return this.get("templateValue/delete/" + id);
    }

    public static editTemplateValue(id: string, value: string, templateAttrIdent: string) {
        return this.post("templateValue/edit/" + id, { value, templateAttrIdent });
    }

    public static getInspectionListTemplates() {
        return this.get("inspectionListTemplate");
    }

    public static createInspectionListTemplate(templateName: string, content: string) {
        return this.post("inspectionListTemplate/create", { templateName, content });
    }

    public static deleteInspectionListTemplate(inspectionListTemplateId: string) {
        return this.get("inspectionListTemplate/delete/" + inspectionListTemplateId);
    }

    public static editInspectionListTemplate(inspectionListTemplateId: string, templateName: string, content: string) {
        return this.post("inspectionListTemplate/edit/" + inspectionListTemplateId, { templateName, content });
    }
}