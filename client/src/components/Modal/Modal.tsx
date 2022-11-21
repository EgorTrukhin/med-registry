import "./Modal.css";
import {CrossIcon} from "../../icons/CrossIcon/CrossIcon";
import CloseIcon from "../../icons/CloseIcon";

interface IModalProps {
    active: boolean;
    setActive: (value: boolean) => void;
    children: JSX.Element;
    cancelText?: string;
    confirmText?: string;
    onConfirm: () => void;
}

const Modal = (props: IModalProps) => {
    const {active, setActive, children, onConfirm, cancelText, confirmText} = props;
    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal_content active" : "modal_content"} onClick={e => e.stopPropagation()}>
                <div className="modal_close" onClick={() => setActive(false)}>
                    <CloseIcon />
                </div>
                <div className="modal_content_children">
                    {children}
                </div>
                <div className="modal_buttons">
                    <div className="modal_button cancel_button" onClick={() => setActive(false)}>
                        {cancelText || "Отмена"}
                    </div>
                    <div className="modal_button confirm_button" onClick={() => onConfirm()}>
                        {confirmText || "ОК"}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;