
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
        date: "",
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
  subscribe: (observer) => void;
  getExpandedTypeIdent: () => string;
  setExpandedTypeIdent: (ident) => void;
  getStateType: (ident) => StoreStateItem;
  getTypes: () => ITypesNames;
}

export interface StateTreat {
  id: string;
  name: string;
  date: string;
  checked: boolean;
}

interface StoreStateItem {
  checkeds: Array<string>;
  treats: Array<StateTreat>
}

interface StoreState {
  types: { [ident: string]: StoreStateItem };
  expandedTypeIdent: string;
}

export const store: IStore = {
  _state: state,
  _types: typesNamesMap,
  getStateType(ident) {
    return this._state.types[ident];
  },
  getExpandedTypeIdent() {
    return this._state.expandedTypeIdent
  },
  setExpandedTypeIdent(ident) {
    this._state.expandedTypeIdent = ident;
    this._subscriber();
  },
  getTypes() {
    return this._types;
  },
  _subscriber() {
    console.log('no subscribers (observers)')
  },
  subscribe(observer) {
    this._subscriber = observer;
},
};