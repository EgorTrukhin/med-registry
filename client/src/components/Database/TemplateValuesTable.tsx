import { Table } from "../Table/Table";
import "./Database.css"
import {useContext, useState } from "react";
import Modal from "../Modal/Modal";
import {TextControl} from "../controls/TextControl/TextControl";
import WarningIcon from "../../icons/WarningIcon";
import {Context} from "../../index";
import { observer } from "mobx-react-lite";
import SelectControl from "../controls/SelectControl/SelectControl";

interface IRowData {
    id?: string;
    value?: string;
    templateAttrIdent?: string;
}

export const TemplateValuesTable = observer(() => {
    const { dataStore } = useContext(Context);
    const [loaded, changeLoaded] = useState(false);
    const [data, changeData] = useState([]);
    const [idents, changeIdents] = useState([]);
    const [rowData, setRowData] = useState<IRowData>({});
    const [validValue, setValidValue] = useState(true);
    const [editActive, setEditActive] = useState(false);
    const [deleteActive, setDeleteActive] = useState(false);
    const [createActive, setCreateActive] = useState(false);

    const clearRowData = () => {
        setRowData({});
        changeLoaded(false);
    };

    const deleteModal = () => {
        if (!deleteActive) {
            return null;
        }

        const {id, value, templateAttrIdent} = rowData;

        const onConfirm = () => {
            dataStore.deleteTemplateValue(id)
                .then(() => {
                    clearRowData();
                    setDeleteActive(false);
                    changeLoaded(false);
                });
        }

        const onClose = (value) =>{
            setDeleteActive(value);
            clearRowData();
        }

        return (
            <Modal active={deleteActive} setActive={onClose} onConfirm={onConfirm} confirmText={"Удалить"} >
                <div className="delete_modal_content" style={{display: "flex", alignItems: "center" }}>
                    <WarningIcon size={50} />
                    <span style={{marginLeft: "20px"}}>
                        Вы пытаетесь удалить значение для атрибута <span>{templateAttrIdent}</span>!<br/>
                        Значение: <br/> <b>{value}</b> <br/>
                    </span>
                </div>
            </Modal>
        );
    };

    const editModal = () => {
        if (!editActive) {
            return null;
        }

        const {id, value, templateAttrIdent} = rowData;

        const handleValueChange = (newValue) => {
            if (!newValue || !newValue.length) {
                setValidValue(false);
            } else {
                setValidValue(true);
            }
            setRowData({...rowData, value: newValue});
        }

        const handleIdentChange = (newIdent) => {
            setRowData({...rowData, templateAttrIdent: newIdent});
        }

        const onConfirm = () => {
            if (!value || !value.length) {
                setValidValue(false)
            } else {
                dataStore.editTemplateValue(id, value, templateAttrIdent || idents[0].id)
                    .then(() => {
                        clearRowData();
                        setEditActive(false);
                        changeLoaded(false);
                    });
            }
        }

        const onClose = (value) =>{
            setEditActive(value);
            clearRowData();
        }

        return (
            <Modal active={editActive} setActive={onClose} onConfirm={onConfirm} confirmText={"Готово"}>
                <div className="edit_modal_content">
                    <TextControl
                        label="Значение"
                        value={value || ""}
                        placeholder="Введите значение..."
                        onChange={e => handleValueChange(e.target.value)}
                        valid={validValue}
                    />
                    <SelectControl
                        label="Атрибут"
                        onChange={handleIdentChange}
                        items={idents}
                        selectedId={templateAttrIdent}
                        placeholder={"Выберите атрибут из списка..."}
                    />
                </div>
            </Modal>
        );
    }

    const createModal = () => {
        if (!createActive) {
            return null;
        }

        const {id, value, templateAttrIdent} = rowData;

        const handleValueChange = (newValue) => {
            if (!newValue || !newValue.length) {
                setValidValue(false);
            } else {
                setValidValue(true);
            }
            setRowData({...rowData, value: newValue});
        }

        const handleIdentChange = (newIdent) => {
            setRowData({...rowData, templateAttrIdent: newIdent});
        }

        const onConfirm = () => {
            if (!value || !value.length) {
                setValidValue(false);
            } else {
                dataStore.createTemplateValue(value, templateAttrIdent || idents[0].id)
                    .then(() => {
                        clearRowData();
                        setCreateActive(false);
                        changeLoaded(false);
                    });
            }
        }

        return (
            <Modal active={createActive} setActive={setCreateActive} onConfirm={onConfirm} confirmText={"Создать"}>
                <div className="create_modal_content">
                    <TextControl
                        label="Значение"
                        value={value || ""}
                        placeholder="Введите значение..."
                        onChange={e => handleValueChange(e.target.value)}
                        valid={validValue}
                    />
                    <SelectControl
                        label="Атрибут"
                        onChange={handleIdentChange}
                        items={idents}
                        selectedId={templateAttrIdent}
                        placeholder={"Выберите атрибут..."}
                    />
                </div>
            </Modal>
        );
    }

    const IDENT = "templateAttrIdent";
    const VALUE = "value";

    const columns = [
        { title: 'Идент', field: IDENT },
        { title: 'Значение', field: VALUE }
    ];

    const actions = [
        {
            icon: 'edit',
            tooltip: 'Редактировать',
            onClick: (_, rowData) => {
                setRowData(rowData);
                setEditActive(true);
            }
        },
        {
            icon: 'clear',
            tooltip: 'Удалить',
            onClick: (_, rowData) => {
                setRowData(rowData);
                setDeleteActive(true);
            }
        },
        {
            icon: 'add',
            tooltip: 'Создать',
            isFreeAction: true,
            onClick: () => setCreateActive(true)
        }
    ]

    if (!loaded) {
        Promise.all([dataStore.getTemplateAttrs(), dataStore.getTemplateValues()])
            .then(([templateAttrs, templateValues]) => {
                const dataAttrs = templateAttrs && templateAttrs.data.map(attr => {
                    return {
                        id: attr.ident,
                        name: attr.ident
                    }
                });

                const data = templateValues && templateValues.data.map(templateValue => {
                    return {
                        id: templateValue.id,
                        [VALUE]: templateValue[VALUE],
                        [IDENT]: templateValue[IDENT]
                    }
                });

                changeLoaded(true);
                changeData(data);
                changeIdents(dataAttrs);
            });
    }

    return (
        <div>
            <Table columns={columns} data={data} actions={actions}/>
            {editModal()}
            {deleteModal()}
            {createModal()}
        </div>
    );
});