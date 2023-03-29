import "./TextControl.css";

export interface TextControlProps {
    label?: string;
    value?: string;
    placeholder?: string;
    fontSize?: number;
    onChange?: (value) => void;
    valid?: boolean;
    disabled?: boolean;
}

export const TextControl = (props: TextControlProps) => {
    const {value, fontSize,  placeholder, onChange, label, valid, disabled} = props;

    if (label && label.length) {
        const isValid = valid !== undefined ? valid : value && value.length;
        return (
            <div className="control-wrapper">
                <label htmlFor={label}>{label}</label>
                <input
                    name={label}
                    className={`control text-control ${!isValid ? "invalid-value-control" : ""}`}
                    value={value}
                    type="text"
                    placeholder={placeholder}
                    onChange={onChange}
                    disabled={disabled}
                />
                {!isValid && <span className="invalid-value-control-tooltip">* Заполните поле</span>}
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

export const TextAreaControl = (props: TextControlProps) => {
    const {value, fontSize,  placeholder, onChange, label, valid} = props;

    if (label && label.length) {
        return (
            <div className="control-wrapper">
                <label htmlFor={label}>{label}</label>
                <textarea
                    name={label}
                    className={`control text-control ${typeof valid === 'boolean' && !valid ? "invalid-value-control" : ""}`}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    rows={5}
                />
                {typeof valid === 'boolean' && !valid && <span className="invalid-value-control-tooltip">* Заполните поле</span>}
            </div>
        )
    }

    return (
        <textarea
            className="control text-control"
            value={value}
            style={{fontSize: fontSize}}
            placeholder={placeholder}
            onChange={onChange}
            rows={5}
        />
    );
}