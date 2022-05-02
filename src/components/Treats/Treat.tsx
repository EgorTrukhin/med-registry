import { CrossIcon } from "../../icons/CrossIcon/CrossIcon";
import { DateControl } from "../controls/DatePicker/DatePicker";

interface TreatProps {
  id: number;
  name: string;
  type: string;
  onTreatChange: (id, type, date?) => void;
}

interface EditTreatProps extends TreatProps {
  date: Date;
}

export const EditTreat = (props: EditTreatProps) => {
  const {id, name, date, type, onTreatChange} = props;
  const onDateChange = (date) => {
    onTreatChange(id, type, date);
  }
  return (
    <div className="treat edit-treat">
      <div className="edit-treat-controls">
        <DateControl date={date} onDateChange={onDateChange}/>
        {name}
      </div>
      <div onClick={() => onTreatChange(id, type)}>
        <CrossIcon />
      </div>
    </div>
  );
}

interface CheckTreatProps extends TreatProps {
  checked: boolean;
}

export const CheckTreat = (props: CheckTreatProps) => {
  const {type, id, name, checked, onTreatChange} = props;
  const ident = String(id);
  return (
    <div className="treat check-treat">
      <input type="checkbox" className="custom-checkbox" id={ident} name={ident} checked={checked} onChange={() => onTreatChange(id, type)}/>
      <label htmlFor={ident}>{name}</label>
    </div>
  );
}