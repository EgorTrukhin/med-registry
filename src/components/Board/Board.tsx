import { StateTreat } from "../../store/store";
import "./Board.css";

interface BoardProps { 
  name: string;
  treats: Array<StateTreat>;
  onDateChange: () => void;
  onDeleteTreat: (ident) => void;
}

export const Board = (props: BoardProps) => {
  const {name, treats, onDateChange, onDeleteTreat} = props;
  return (
    <div className="board-content">
      {name}
    </div>
  );
}