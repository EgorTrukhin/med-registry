import { StateTreat } from "../../store/store";
import { EDIT_TREAT, TreatsContainer } from "../Treats/TreatsContainer";
import "./Board.css";

interface BoardProps { 
  typeIdent: string;
  name: string;
  treats: Array<StateTreat>;
  onTreatChange: (id, type, date) => void;
  onClearAll: (type) => void;
}

export const Board = (props: BoardProps) => {
  const {typeIdent, name, treats, onTreatChange, onClearAll} = props;
  return (
    <div className="board-content">
      <div className="board-header">
        <h2>{name}</h2>
        {
          treats.length > 0 &&
          <div className="clear-all" onClick={() => onClearAll(typeIdent)}>
            <span>Очистить все</span>
          </div>
        }
      </div>
      <TreatsContainer 
        style={"board-content-container"}
        typeIdent= {typeIdent} 
        itemMode={EDIT_TREAT} 
        treats={treats}
        onTreatChange={onTreatChange}
      />
    </div>
  );
}