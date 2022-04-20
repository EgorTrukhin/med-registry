import { ITreat } from "../../db/db";
import { ArrowDownIcon } from "../../icons/ArrowDownIcon";
import { ArrowUpIcon } from "../../icons/ArrowUpIcon";
import "./TreatsExplorerItem.css";

export interface TreatsExplorerSideBarProps {
  ident: string;
  name: string;
  treats: Array<ITreat>;
  expanded: boolean;
  checked: Array<string>;
  onChange: (treat: ITreat) => void;
  toggleExpanded: (ident: string) => void;
}

export interface TypeItemProps {
  treat: ITreat;
  checked: Array<string>;
  onChange: (ident) => void;
}

export const TypeItem = (props: TypeItemProps) => {
  const { treat, checked, onChange } = props;
  const { id, name } = treat;
  const ident = String(id);
  return (
    <div className="type-item-point">
      <input onChange={() => onChange(treat)} checked={checked.includes(ident)} type="checkbox" className="type-item-point-checkbox custom-checkbox" id={ident} name={ident} />
      <label htmlFor={ident}>{name}</label>
    </div>
  );
}

export const TreatsExplorerSideBar = (props: TreatsExplorerSideBarProps) => {
  const { ident, name, treats, expanded, checked, onChange, toggleExpanded} = props;

  const expand = () => {
    toggleExpanded(ident);
  }

  return (
    <div className="treats-explorer-item-wrapper">
      <div className="treats-explorer-item-name" onClick={expand}>
        <div key={ident}>{name}</div>
        { expanded ? <ArrowUpIcon /> : <ArrowDownIcon /> }
      </div>
      {
        expanded && (
          <div className="treats-explorer-items">
            {
              treats.map(treat => <TypeItem checked={checked} onChange={onChange} treat={treat}/>)
            }     
          </div> 
        )
      } 
    </div>
  );
}