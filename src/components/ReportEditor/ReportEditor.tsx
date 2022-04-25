import { StateTreat, store } from "../../store/store";
import { Board } from "../Board/Board";
import { Sidebar } from "../Sidebar/Sidebar";
import "./ReportEditor.css";

export const ReportEditor = () => {
   
  const types = store.getTypes();
  const expandedTypeIdent = store.getExpandedTypeIdent();
  let treats: Array<StateTreat> = [];
  let boardTreats: Array<StateTreat> = []
  if (expandedTypeIdent) {
    const typeByIdent = store.getStateType(expandedTypeIdent);
    treats = typeByIdent.treats;
    boardTreats = treats.filter(treat => typeByIdent.checkeds.includes(treat.id))
  }

  const onExpand = (ident) => {
    store.setExpandedTypeIdent(expandedTypeIdent !== ident ? ident : null);
  }

  return (
    <div className="report-editor-content">
      <Sidebar 
        types={types}
        expandedTypeTreats={treats}
        expandedTypeIdent={expandedTypeIdent}
        onExpand={onExpand}
        onItemCheck={() => console.log()}
      />
      <Board 
        name={types[expandedTypeIdent] || ""}
        treats={boardTreats}
        onDateChange={() => console.log()}
        onDeleteTreat={() => console.log()}
      />
    </div>
  );
}