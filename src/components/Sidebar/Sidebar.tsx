import { ITypesNames, StateTreat } from "../../store/store";
import { Type } from "../Treats/Type";
import "./Sidebar.css";

interface SidebarProps {
  types: ITypesNames;
  expandedTypeTreats: Array<StateTreat>;
  expandedTypeIdent: string;
  onExpand: (ident) => void;
  onTreatChange: (id, type, date?) => void;
  onSearchChange?: (text) => void;
  searchValue?: string;
}

export const Sidebar = (props: SidebarProps) => {
  const {types, expandedTypeTreats, expandedTypeIdent, onExpand, onTreatChange, onSearchChange, searchValue} = props;
  return (
    <div className="sidebar-content">
      {
        Object.keys(types).map(type => {
          const name = types[type];
          const ident = type;
          if (ident === expandedTypeIdent) {
            return <Type 
              name={name} 
              ident={ident} 
              active={true} 
              treats={expandedTypeTreats}
              onExpand={onExpand}
              onTreatChange={onTreatChange}
              onSearchChange={onSearchChange}
              searchValue={searchValue}
            />
          }

          return <Type 
            name={name} 
            ident={ident} 
            active={false} 
            onExpand={onExpand}
          />
        })
      }
    </div>
  );
}