import { StateTreat } from "../../store/store";
import { CheckTreat, EditTreat } from "./Treat";

export const CHECK_TREAT = "CHECK-TREAT";
export const EDIT_TREAT = "EDIT-TREAT";

interface TreatsContainerProps {
  type: string;
  treats: Array<StateTreat>;
}

export const TreatsContainer = (props: TreatsContainerProps) => {
  const {type, treats} = props;

  const getContent = () => {
    switch (type) {
      case CHECK_TREAT:
        return (
          treats.map(treat => {
            const {id, name, checked} = treat;
            return <CheckTreat id={id} name={name} checked={checked}/>
          })
        );
      case EDIT_TREAT:
        return (
          treats.map(treat => {
            const {id, name, date} = treat;
            return <EditTreat id={id} name={name} date={date}/>
          })
        );
    }
  }

  return (
    <div>
      {getContent()}
    </div>
  );
}