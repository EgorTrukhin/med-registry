interface TreatProps {
  id: string;
  name: string;
}

interface EditTreatProps extends TreatProps {
  date: string;
}

export const EditTreat = (props: EditTreatProps) => {
  const {id, name, date} = props;
  return (
    <div>{name}</div>
  );
}

interface CheckTreatProps extends TreatProps {
  checked: boolean;
}

export const CheckTreat = (props: CheckTreatProps) => {
  const {id, name, checked} = props;
  return (
    <div>{name}</div>
  );
}