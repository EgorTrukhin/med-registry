import "./TextControl.css";

export interface TextControlProps {
    label?: string;
    value?: string;
    placeholder?: string;
    fontSize?: number;
    onChange?: (value) => void;
    valid?: boolean;
}

const TextControl = (props: TextControlProps) => {
    const {value, fontSize,  placeholder, onChange, label, valid} = props;

    if (label && label.length) {
        return (
            <div className="control-wrapper">
                <label htmlFor={label}>{label}</label>
                <input
                    name={label}
                    className={`control text-control ${!valid ? "invalid-value-control" : ""}`}
                    value={value}
                    type="text"
                    placeholder={placeholder}
                    onChange={onChange}
                />
                {!valid && <span className="invalid-value-control-tooltip">* Заполните поле</span>}
            </div>
        )
    }

    return (
        <input
            className="control text-control"
            value={value}
            type="text"
            style={{fontSize: fontSize}}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
}

export default TextControl;