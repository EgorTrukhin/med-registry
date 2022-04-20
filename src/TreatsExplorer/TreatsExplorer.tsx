import { useContext, useState } from "react";
import { Context } from "..";
import { TreatsExplorerSideBar } from "./TreatsExplorerSideBar/TreatsExplorerSideBar";
import "./TreatsExplorer.css"
import { observer } from "mobx-react-lite";
import { TreatsBoard } from "../TreatsBoard/TreatsBoard";
import { ITreat } from "../db/db";
import { values } from "mobx";

interface IPickedTreats {
  [ident: string]: Array<ITreat>;
}

export const TreatsExplorer = observer(() => {
  const db = useContext(Context);
  const data = db.getData();
  const [expandedIdent, toggleExpanded] = useState<string>("");
  const [pickedTreats, handleChange] = useState<IPickedTreats>({});
  const [c, t] = useState(0);

  const getChecked = (): Array<string> => {
    const value: Array<string> = [];
    Object.keys(pickedTreats).forEach(ident => {
      pickedTreats[ident].forEach(treat => value.push(String(treat.id)));
    });
    return value;
  }

  const treatPicked = (treat: ITreat) => {
    const { id, type } = treat;
    const newState = pickedTreats;

    const ident = String(id);
    const contains = getChecked().includes(ident)
    if (contains) {
      newState[type] = newState[type].filter(treat => treat.id !== id)
    } else {
      if (Object.keys(newState).includes(type)) {
        newState[type].push(treat);
      } else {
        newState[type] = [treat]
      }
    }
    
    console.log(newState);
    handleChange(newState);
  }
  
  const getTypesItems = () => {
    return data.map(type => {
      const { ident, name, treats } = type; 
      const expanded = expandedIdent === ident;
      return <TreatsExplorerSideBar 
              ident={ident} 
              name={name} 
              treats={treats} 
              expanded={expanded}
              checked={getChecked()}
              onChange={treatPicked}
              toggleExpanded={ident => toggleExpanded(expanded ? "" : ident)}
            />
    });
  }

  return (
    <div className="treat-explorer-wrapper">
      <div className="treats-explorer-sidebar">
        {getTypesItems()}
        <button onClick={() => t(c+1)}>dwdwdwdwdwdwd</button>
      </div>
      <div className="treats-explorer-board">
        <TreatsBoard treats={pickedTreats} />
        {JSON.stringify(pickedTreats)}
        {c}
      </div>
    </div>
  );
})