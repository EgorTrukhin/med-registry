import moment from 'moment';
import DatePicker from 'react-date-picker';
import "./DatePicker.css"

interface DateControlProps {
  date: Date;
  onDateChange: (date) => void; 
}

export const CLEAR_DATE = "CLEAR-DATE"

export const DateControl = (props: DateControlProps) => {
  const {date, onDateChange} = props

  const handleDateChange = (date) => {
    onDateChange(date ? moment.utc(date) : CLEAR_DATE);
  }
  
  return (
    <div>
      <DatePicker onChange={handleDateChange} value={date ? new Date(date) : null} format={"dd.MM.yyyy"}/>
    </div>
  );
}