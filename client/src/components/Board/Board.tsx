import { StateTreat } from "../../store/store";
import { EDIT_TREAT, TreatsContainer } from "../Treats/TreatsContainer";
import "./Board.css";

interface BoardProps { 
  typeId: number;
  name: string;
  treats: Array<StateTreat>;
  onTreatChange: (id, type, date) => void;
  onClearAll: (type) => void;
}

export const Board = (props: BoardProps) => {
  const {typeId, name, treats, onTreatChange, onClearAll} = props;
  return (
    <div className="board-content-wrapper">
        {
            treats.length > 0 &&
            <div>
                <div className="board-header">
                    <h2>{name}</h2>
                    <div className="clear-all" onClick={() => onClearAll(typeId)}>
                        <span>Очистить все</span>
                    </div>
                </div>
                <TreatsContainer
                    style={"board-content-container"}
                    typeId={typeId}
                    itemMode={EDIT_TREAT}
                    treats={treats}
                    onTreatChange={onTreatChange}
                />
            </div>
        }
        {treats.length == 0 && <div className="no-content">Препараты еще не добавлены</div>}
    </div>
  );
}