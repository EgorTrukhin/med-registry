export interface ITreat {
    id: number;
    name: string;
    typeId: number;
}

export interface IType {
    id: number;
    name: string;
}

export interface IPatient {
    id: number
    firstName: string;
    secondName: string;
    middleName: string;
}

export interface IReceiption {
    id: number;
    receiptDate: string;
    appointmentListId: number;
    inspectationListId: number;
}

export interface IAppointmentList {
    id: number;
    name: string;
    roomNumber: number;
    dietId: number;
    treatment: number;
}

export interface IDiet {
    id: number;
    dietName: string;
}

export interface ITreatment {
    id: number;
    treatmentName: string;
}

export interface IInspectListTemplate {
    id: number;
    templateName: string;
    content: string;
}

export interface ITemplateAttr {
    ident: string;
    description: string;
    inspectionListTemplateId?: number;
}