import { ITypesNames, StateTreat } from "../../store/store";
import { Type } from "../Treats/Type";
import "./Sidebar.css";

interface SidebarProps {
  types: ITypesNames;
  expandedTypeTreats: Array<StateTreat>;
  expandedTypeIdent: string;
  onExpand: (ident) => void;
  onItemCheck: () => void;
}

export const Sidebar = (props: SidebarProps) => {
  const {types, expandedTypeTreats, expandedTypeIdent, onExpand, onItemCheck} = props;
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
              onItemCheck={onItemCheck}
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