import { ArrowDownIcon } from "../../icons/ArrowDownIcon";
import { ArrowUpIcon } from "../../icons/ArrowUpIcon";
import { StateTreat } from "../../store/store";
import { CHECK_TREAT, TreatsContainer } from "./TreatsContainer";
import "./Type.css";

interface TypeProps {
  name: string;
  ident: string;
  active: boolean;
  treats?: Array<StateTreat>;
  onExpand: (ident) => void;
  onItemCheck?: () => void;
}

export const Type = (props: TypeProps) => {
  const {name, ident, active, treats, onExpand, onItemCheck} = props;

  if (active) {
    return (
      <div className="type-content" onClick={() => onExpand(ident)}>
        <span>{name}</span>
        <TreatsContainer type={CHECK_TREAT} treats={treats}/>
        <ArrowUpIcon />
      </div>
    );
  }

  return (
    <div className="type-content" onClick={() => onExpand(ident)}>
      <span>{name}</span>
      <ArrowDownIcon />
    </div>
  );
}