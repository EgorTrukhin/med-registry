import { CLEAR_DATE } from "../components/controls/DatePicker/DatePicker";

const data = require("./data.json");
const typesNamesMap: ITypesNames = {};
data.forEach(type => typesNamesMap[type.ident] = type.name);
const state: StoreState = {types: {}, expandedTypeIdent: null};
data.forEach(type => {
  const {ident, treats} = type;
  state.types[ident] = {
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

export interface ITreat {
  id: number;
  name: string;
  type: string;
}

export interface ITypesNames {
  [ident: string]: string;
}

export interface IType {
  ident: string;
  name: string;
  treats: Array<ITreat>
}

interface IStore {
  _state: StoreState;
  _types: ITypesNames;
  _subscriber: any;
  _searchValue: string;
  subscribe: (observer) => void;
  getExpandedTypeIdent: () => string;
  setExpandedTypeIdent: (ident) => void;
  getStateType: (ident) => StoreStateItem;
  getTypes: () => ITypesNames;
  onClearAll: (ident) => void;
  onTreatChange: (id, type, date?) => void;
  getSearchValue: () => string;
  onSearchChange: (text) => void;
}

export interface StateTreat {
  id: number;
  name: string;
  date: Date;
  checked: boolean;
}

interface StoreStateItem {
  checkeds: Array<number>;
  treats: Array<StateTreat>
}

interface StoreState {
  types: { [ident: string]: StoreStateItem };
  expandedTypeIdent: string;
}

export const store: IStore = {
  _state: state,
  _types: typesNamesMap,
  _searchValue: "",
  getStateType(ident) {
    const stateItem = this._state.types[ident];
    const result: StoreStateItem = {
      checkeds: stateItem.checkeds,
      treats: []
    };
    result.treats = stateItem.treats.filter(treat => treat.name.includes(this._searchValue));
    return result;
  },
  getExpandedTypeIdent() {
    return this._state.expandedTypeIdent;
  },
  setExpandedTypeIdent(ident) {
    this._state.expandedTypeIdent = ident;
    this._subscriber();
  },
  getTypes() {
    return this._types;
  },
  onClearAll(ident) {
    this.onTreatChange(undefined, ident);
  },
  onTreatChange(id, type, date = null) {
    const item = this._state.types[type];
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

    this._subscriber();
  },
  getSearchValue() {
    return this._searchValue;
  },
  onSearchChange(text) {
    this._searchValue = text ? text : "";
    this._subscriber();
  },
  _subscriber() {
    console.log('no subscribers (observers)')
  },
  subscribe(observer) {
    this._subscriber = observer;
  },
};