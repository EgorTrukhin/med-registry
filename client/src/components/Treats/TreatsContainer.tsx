import { StateTreat } from "../../store/store";
import { CheckTreat, EditTreat } from "./Treat";

export const CHECK_TREAT = "CHECK-TREAT";
export const EDIT_TREAT = "EDIT-TREAT";

interface TreatsContainerProps {
  style?: string;
  typeIdent: string;
  itemMode: string;
  treats: Array<StateTreat>;
  onTreatChange?: (id, type, date?) => void;
}

export const TreatsContainer = (props: TreatsContainerProps) => {
  const {style, typeIdent, itemMode, treats, onTreatChange} = props;

  const getContent = () => {
    switch (itemMode) {
      case CHECK_TREAT:
        return (
          treats.map(treat => {
            const {id, name, checked} = treat;
            return <CheckTreat type={typeIdent} id={id} name={name} checked={checked} onTreatChange={onTreatChange}/>
          })
        );
      case EDIT_TREAT:
        return (
          treats.map(treat => {
            const {id, name, date} = treat;
            return <EditTreat 
              type={typeIdent} 
              id={id} 
              name={name} 
              date={date} 
              onTreatChange={onTreatChange} 
            />
          })
        );
    }
  }

  const getContainer = () => {
    return (
      <div className={`common-treats-container ${style}`}>
        {getContent()}
      </div>
    );
  }

  return (
    <div className={`treats-container ${style}`}>
      {getContent()}
    </div>
  );
}