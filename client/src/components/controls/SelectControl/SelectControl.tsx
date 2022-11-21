import "./SelectControl.css";

export interface ISelectControlOptions {
    id?: string | number;
    name?: string;
}

export interface SelectControlProps {
    items?: Array<ISelectControlOptions>;
    selectedId?: string | number;
    onChange?: (key) => void;
    label?: string;
    placeholder?: string;
}

const SelectControl = (props: SelectControlProps) => {
    const {items, selectedId, onChange, label, placeholder} = props;
    return (
        <div className="control-wrapper">
            <label htmlFor={label}>{label}</label>
            <select name={label} className="control select-control" id="quest-mode" onChange={(e) => onChange(e.target.value)} placeholder={placeholder}>
                {items && items.map(item => {
                    return (
                        <option className="select-control-item" value={item.id} selected={String(item.id) === String(selectedId)}>{item.name}</option>
                    );
                })}
            </select>
        </div>
    );
}

export default SelectControl;