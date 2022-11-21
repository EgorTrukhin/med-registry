import { StateTreat } from "../../store/store";
import { CheckTreat, EditTreat } from "./Treat";

export const CHECK_TREAT = "CHECK-TREAT";
export const EDIT_TREAT = "EDIT-TREAT";

interface TreatsContainerProps {
  style?: string;
  typeId: number;
  itemMode: string;
  treats: Array<StateTreat>;
  onTreatChange?: (id, type, date?) => void;
}

export const TreatsContainer = (props: TreatsContainerProps) => {
  const {style, typeId, itemMode, treats, onTreatChange} = props;

  const getContent = () => {
    switch (itemMode) {
      case CHECK_TREAT:
        return (
          treats.map(treat => {
            const {id, name, checked} = treat;
            return <CheckTreat typeId={typeId} id={id} name={name} checked={checked} onTreatChange={onTreatChange}/>
          })
        );
      case EDIT_TREAT:
        return (
          treats.map(treat => {
            const {id, name, date} = treat;
            return <EditTreat
              typeId={typeId}
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