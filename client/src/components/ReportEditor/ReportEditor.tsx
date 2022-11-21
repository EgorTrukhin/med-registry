import { observer } from "mobx-react-lite";
import { StateTreat } from "../../store/store";
import { Board } from "../Board/Board";
import { Sidebar } from "../Sidebar/Sidebar";
import "./ReportEditor.css";
import {Context} from "../../index";
import { useContext } from "react";

export const ReportEditor = observer(() => {
  const { dataStore } = useContext(Context);

  if (!dataStore.isLoaded()) {
    return null;
  }

  const types = dataStore.getTypes();
  const expandedTypeId = dataStore.getExpandedTypeId();
  const searchValue = dataStore.getSearchValue();

  let treats: Array<StateTreat> = [];
  let boardTreats: Array<StateTreat> = [];
  let typeName: string = "";

  if (expandedTypeId) {
    const stateItem = dataStore.getStateItem(expandedTypeId);
    typeName = dataStore.getTypeNameById(expandedTypeId);
    treats = stateItem.treats;
    boardTreats = treats.filter(treat => stateItem.checkeds.includes(treat.id))
  }

  const onExpand = (id) => {
    dataStore.setExpandedTypeId(expandedTypeId !== id ? id : null);
  }

  const onStateTreatChange = (id, typeId, date) => {
    dataStore.onStateTreatChange(id, typeId, date);
  }

  const onSearchChange = (text) => {
    dataStore.onSearchChange(text);
  } 

  const onClearAll = (typeId) => {
    dataStore.onClearAll(typeId);
  }

  return (
    <div className="report-editor-content">
      <Sidebar 
        types={types}
        expandedTypeTreats={treats}
        expandedTypeId={expandedTypeId}
        onExpand={onExpand}
        onTreatChange={onStateTreatChange}
        onSearchChange={onSearchChange}
        searchValue={searchValue}
      />
      <Board 
        typeId={expandedTypeId}
        name={typeName}
        treats={boardTreats}
        onTreatChange={onStateTreatChange}
        onClearAll={onClearAll}
      />
    </div>
  );
});