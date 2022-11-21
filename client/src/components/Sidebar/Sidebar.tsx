import { StateTreat } from "../../store/store";
import { Type } from "../Treats/Type";
import "./Sidebar.css";

interface SidebarProps {
  types: any;
  expandedTypeTreats: Array<StateTreat>;
  expandedTypeId: string;
  onExpand: (ident) => void;
  onTreatChange: (id, type, date?) => void;
  onSearchChange?: (text) => void;
  searchValue?: string;
}

export const Sidebar = (props: SidebarProps) => {
  const {types, expandedTypeTreats, expandedTypeId, onExpand, onTreatChange, onSearchChange, searchValue} = props;
  return (
    <div className="sidebar-content">
      {
        types.map(type => {
          const id = type.id;
          const name = type.name;
          if (id === expandedTypeId) {
            return <Type 
              name={name} 
              id={id}
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
            id={id}
            active={false} 
            onExpand={onExpand}
          />
        })
      }
    </div>
  );
}