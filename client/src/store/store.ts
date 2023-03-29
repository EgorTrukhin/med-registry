import {DataBaseApi} from "../api/Api";
import {makeAutoObservable} from "mobx";
import {truncateArrayObjects} from "../utils";
import {CLEAR_DATE} from "../components/controls/DatePicker/DatePicker";
import moment from "moment";
import {ITreat, IType} from "./models";

export interface StateTreat {
    id: number;
    name: string;
    date: Date;
    checked: boolean;
}

interface StateItem {
    typeId: number;
    checkeds: Array<number>;
    treats: Array<StateTreat>
}

export interface IDataStore {
    _treats: Array<ITreat>;
    _types: Array<IType>;
    getTreats: () => Array<ITreat>;
    getTypes: () => Array<IType>;
    getTypeNameById: (id: number) => string;
    reloadTreats: () => Promise<void>;
    setTreats: (treats: Array<ITreat>)=> void;
    createTreat(name: string, typeId: number);
    editTreat(id: number, name: string, typeId: number)
    deleteTreat(id: number);

    _state: Array<StateItem>;
    _searchValue: string;
    _expandedTypeId: number;

    setState: (newState: Array<StateItem>) => void;
    updateState: () => void;

    getState: () => Array<StateItem>;
    getStateItem: (id) => StateItem;
    onClearAll: (id) => void;
    onStateTreatChange: (id, typeId, date?) => void;

    getSearchValue: () => string;
    onSearchChange: (text: string) => void;
    getExpandedTypeId: () => number;
    setExpandedTypeId: (id: number) => void;

    _loaded: boolean;
    isLoaded(): boolean;
    _needUpdate: boolean;
    isNeedUpdate(): boolean;

    getReportResultData: () => any;
}

export default class DataStore implements IDataStore {
    _treats: Array<ITreat>;
    _types: Array<IType>;

    _state: Array<StateItem>;
    _searchValue: string;
    _expandedTypeId: number;

    _loaded: boolean;
    _needUpdate: boolean;

    constructor() {
      Promise.all([DataBaseApi.getTreats(), DataBaseApi.getTypes()])
          .then(([treats, types]) => {
              this._treats = truncateArrayObjects(treats.data, ["id", "name", "typeId"]);
              this._types = truncateArrayObjects(types.data, ["id", "name"]);
              this.updateState();

              this._searchValue = "";
              this._expandedTypeId = null;
              this._loaded = true;
              this._needUpdate = false;
          });
        makeAutoObservable(this);
    }

    isLoaded(): boolean {
        return this._loaded;
    }

    isNeedUpdate(): boolean {
        return this._needUpdate;
    }

    getReportResultData() {
        const data = {};
        this._state.forEach(item => {
            const ident = this.getTypeNameById(item.typeId);
            data[ident] = [];
            item.treats.length && item.treats.forEach(treat => {
                if (treat.checked) {
                    data[ident].push({
                        name: treat.name,
                        date: treat.date && moment(treat.date).format("DD.MM.YY")
                    });
                }
            });
        });

        return data;
    }

    getTreats(): Array<ITreat> {
        return this._treats;
    }

    setTreats(treats: Array<ITreat>): void {
        this._treats = treats;
    }

    setTypes(types: Array<IType>): void {
        this._types = types;
    }

    getTypes(): Array<IType> {
        return this._types;
    }

    getTypeNameById(id): string {
        return this._types.filter(type => type.id === id)[0].name;
    }

    updateState(): void {
        this._state = this._types.map(type => {
            const {id} = type;
            const treats = this._treats.filter(treat => treat.typeId === id)
            return {
                typeId: id,
                checkeds: [],
                treats: treats.map(treat => {
                    const {id, name} = treat;
                    return {
                        id: id,
                        name: name,
                        date: null,
                        checked: false
                    }
                })
            }
        });
    }

    reloadTreats(): Promise<void> {
      return DataBaseApi.getTreats()
          .then(treats => {
              this.setTreats(truncateArrayObjects(treats.data, ["id", "name", "typeId"]));
              this.updateState();
              return Promise.resolve();
          });
    }

    createTreat(name: string, typeId: number) {
      return DataBaseApi.createTreat(name, typeId)
          .then(_ => this.reloadTreats());
    }

    editTreat(id: number, name: string, typeId: number) {
      return DataBaseApi.editTreat(String(id), name, typeId)
          .then(_ => this.reloadTreats());
    }

    deleteTreat(id: number) {
      return DataBaseApi.deleteTreat(String(id))
          .then(_ => this.reloadTreats());
    }

    reloadTypes(): Promise<void> {
        return DataBaseApi.getTypes()
            .then(types => {
                this.setTypes(truncateArrayObjects(types.data, ["id", "name"]));
                this.updateState();
                return Promise.resolve();
            });
    }

    createType(name: string) {
        return DataBaseApi.createType(name)
            .then(_ => this.reloadTypes())
            .then(_ => this.reloadTreats());
    }

    editType(id: number, name: string) {
        return DataBaseApi.editType(String(id), name)
            .then(_ => this.reloadTypes())
            .then(_ => this.reloadTreats());
    }

    deleteType(typeId: string) {
        return DataBaseApi.deleteType(typeId)
            .then(_ => this.reloadTypes())
            .then(_ => this.reloadTreats());
    }

    getState() {
        return this._state;
    }

    setState(newState: Array<StateItem>) {
        this._state = newState;
    }

    getSearchValue() {
        return this._searchValue;
    }

    onSearchChange(text) {
        this._searchValue = text ? text : "";
    }

    getExpandedTypeId(): number {
        return this._expandedTypeId;
    }

    setExpandedTypeId(id: number) {
        this._expandedTypeId = id;
    }

    onClearAll(id) {
        this.onStateTreatChange(undefined, id);
    }

    getStateItem(id) {
        const stateItem = this._state.filter(item => String(item.typeId) === String(id))[0];
        const result: StateItem = {
            typeId: id,
            checkeds: stateItem.checkeds,
            treats: []
        };
        result.treats = stateItem.treats.filter(treat => treat.name.includes(this._searchValue));
        return result;
    }

    onStateTreatChange(id, typeId, date = null) {
        const state = JSON.parse(JSON.stringify(this._state));
        const item = state.filter(el => el.typeId === typeId)[0];
        if (id) {
            item.treats.forEach(treat => {
                if (treat.id === id) {
                    if (treat.checked && date) {
                        treat.date = date === CLEAR_DATE ? null : date;
                    } else if (treat.checked) {
                        treat.checked = false;
                        treat.date = null;
                        const idx = item.checkeds.indexOf(id);
                        item.checkeds = [...item.checkeds.slice(0, idx), ...item.checkeds.slice(idx + 1)]
                    } else {
                        treat.checked = true;
                        item.checkeds.push(id)
                    }
                }
            });
        } else {
            item.checkeds = [];
            item.treats.forEach(treat => {
                treat.checked = false;
                treat.date = null;
            });
        }

        this.setState(state);
    }

    getDiets() {
        return DataBaseApi.getDiets();
    }

    createDiet(name: string) {
        return DataBaseApi.createDiet(name);
    }

    editDiet(id: number, name: string) {
        return DataBaseApi.editDiet(String(id), name);
    }

    deleteDiet(id: string) {
        return DataBaseApi.deleteDiet(id);
    }

    getTreatments() {
        return DataBaseApi.getTreatments();
    }

    createTreatment(name: string) {
        return DataBaseApi.createTreatment(name);
    }

    editTreatment(id: number, name: string) {
        return DataBaseApi.editTreatment(String(id), name);
    }

    deleteTreatment(id: string) {
        return DataBaseApi.deleteTreatment(id);
    }

    getPatients() {
        return DataBaseApi.getPatients();
    }

    createPatient(fn: string, sn: string, mn: string) {
        return DataBaseApi.createPatient(fn, sn, mn);
    }

    editPatient(id: number, fn: string, sn: string, mn: string) {
        return DataBaseApi.editPatient(String(id), fn, sn, mn);
    }

    deletePatient(id: string) {
        return DataBaseApi.deletePatient(id);
    }

    getTemplateAttrs() {
        return DataBaseApi.getTemplateAttrs();
    }

    createTemplateAttr(ident: string, description: string, inspectionListTemplateId: string) {
        return DataBaseApi.createTemplateAttr(ident, description, inspectionListTemplateId);
    }

    editTemplateAttr(ident: string, description: string, inspectionListTemplateId: string) {
        return DataBaseApi.editTemplateAttr(ident, description, inspectionListTemplateId);
    }

    deleteTemplateAttr(ident: string) {
        return DataBaseApi.deleteTemplateAttr(ident);
    }

    getTemplateValues() {
        return DataBaseApi.getTemplateValues();
    }

    createTemplateValue(value: string, templateAttrIdent: string) {
        return DataBaseApi.createTemplateValue(value, templateAttrIdent);
    }

    editTemplateValue(id: string, value: string, templateAttrIdent: string) {
        return DataBaseApi.editTemplateValue(id, value, templateAttrIdent);
    }

    deleteTemplateValue(id: string) {
        return DataBaseApi.deleteTemplateValue(id);
    }

    getInspectionListTemplates() {
        return DataBaseApi.getInspectionListTemplates();
    }

    createInspectionListTemplate(name: string, content: string) {
        return DataBaseApi.createInspectionListTemplate(name, content);
    }

    editInspectionListTemplate(id: number, name: string, content: string) {
        return DataBaseApi.editInspectionListTemplate(String(id), name, content);
    }

    deleteInspectionListTemplate(id: string) {
        return DataBaseApi.deleteInspectionListTemplate(id);
    }
}