import { StateTreat, store } from "../../store/store";
import { Board } from "../Board/Board";
import { Sidebar } from "../Sidebar/Sidebar";
import "./ReportEditor.css";

export const ReportEditor = () => {
   
  const types = store.getTypes();
  const expandedTypeIdent = store.getExpandedTypeIdent();
  let treats: Array<StateTreat> = [];
  let boardTreats: Array<StateTreat> = []
  let searchValue = store.getSearchValue();
  if (expandedTypeIdent) {
    const typeByIdent = store.getStateType(expandedTypeIdent);
    treats = typeByIdent.treats;
    boardTreats = treats.filter(treat => typeByIdent.checkeds.includes(treat.id))
  }

  const onExpand = (ident) => {
    store.setExpandedTypeIdent(expandedTypeIdent !== ident ? ident : null);
  }

  const onTreatChange = (id, type, date) => {
    store.onTreatChange(id, type, date);
  }

  const onSearchChange = (text) => {
    store.onSearchChange(text);
  } 

  const onClearAll = (type) => {
    store.onClearAll(type);
  }

  return (
    <div className="report-editor-content">
      <Sidebar 
        types={types}
        expandedTypeTreats={treats}
        expandedTypeIdent={expandedTypeIdent}
        onExpand={onExpand}
        onTreatChange={onTreatChange}
        onSearchChange={onSearchChange}
        searchValue={searchValue}
      />
      <Board 
        typeIdent={expandedTypeIdent}
        name={types[expandedTypeIdent] || ""}
        treats={boardTreats}
        onTreatChange={onTreatChange}
        onClearAll={onClearAll}
      />
    </div>
  );
}