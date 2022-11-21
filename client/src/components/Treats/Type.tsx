import { ArrowDownIcon } from "../../icons/ArrowDownIcon";
import { ArrowUpIcon } from "../../icons/ArrowUpIcon";
import { StateTreat } from "../../store/store";
import { SearchControl } from "../controls/SearchControl/SearchControl";
import { CHECK_TREAT, TreatsContainer } from "./TreatsContainer";
import "./Type.css";

interface TypeProps {
  name: string;
  id: number;
  active: boolean;
  treats?: Array<StateTreat>;
  onExpand: (ident) => void;
  onTreatChange?: (id, type, date?) => void;
  onSearchChange?: (text) => void;
  searchValue?: string;
}

export const Type = (props: TypeProps) => {
  const {name, id, active, treats, onExpand, onTreatChange, onSearchChange, searchValue} = props;

  const getHeader = () => {
    return (
      <div className="type-content-header" onClick={() => onExpand(id)}>
        <span>{name}</span>
        {active ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </div>
    );
  }

  return (
    <div className="type-content">
      {getHeader()}
      {
        active && <SearchControl value={searchValue} search={onSearchChange}/>
      }
      {
      active && <TreatsContainer 
        onTreatChange={onTreatChange} 
        style={"type-content-container"} 
        typeId= {id}
        itemMode={CHECK_TREAT} 
        treats={treats}
      />
      }
    </div>
  );
}