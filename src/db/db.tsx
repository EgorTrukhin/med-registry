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


export interface IDatabase {
  getData: () => Array<IType>;
  getTypesNames: () => ITypesNames;
}

export class Database implements IDatabase {
  private data: Array<IType>;

  constructor() {
    this.loadData();
  }
  
  private loadData(): void {
    this.data = require("./data.json");
  }

  public getData(): Array<IType> {
    return this.data;
  }

  public getTypesNames(): ITypesNames {
    const typesNamesMap: ITypesNames = {};
    this.data.forEach(type => typesNamesMap[type.ident] = type.name);
    return typesNamesMap;
  }
}