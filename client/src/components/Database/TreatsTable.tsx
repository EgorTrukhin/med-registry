import { Table } from "../Table/Table";
import "./ObjectsTable.css"
import {useContext, useState } from "react";
import Modal from "../Modal/Modal";
import {TextControl} from "../controls/TextControl/TextControl";
import SelectControl from "../controls/SelectControl/SelectControl";
import {getObjNameById} from "../../utils";
import WarningIcon from "../../icons/WarningIcon";
import {Context} from "../../index";
import { observer } from "mobx-react-lite";

interface IRowData {
    id?: number | string;
    name?: string;
    typeId?: number;
}

export const TreatsTable = observer(() => {
    const { dataStore } = useContext(Context);
    const [loaded, changeLoaded] = useState(false);
    const [data, changeData] = useState([]);
    const [types, changeTypes] = useState([]);
    const [rowData, setRowData] = useState<IRowData>({});
    const [validName, setValidName] = useState(true);
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

        const {id, name, typeId} = rowData;

        const onConfirm = () => {
            dataStore.deleteTreat(String(id))
                .then(() => {
                    clearRowData();
                    setDeleteActive(false);
                });
        }

        const onClose = (value) =>{
            setDeleteActive(value);
            clearRowData();
        }

        return (
            <Modal active={deleteActive} setActive={onClose} onConfirm={onConfirm} confirmText={"Удалить"}>
                <div className="delete_modal_content" style={{display: "flex", alignItems: "center" }}>
                    <WarningIcon size={50} />
                    <span style={{marginLeft: "20px"}}>
                        Вы пытаетесь удалить!<br/>
                        Наименование: <br/> <b>{name}</b> <br/>
                        Тип: <br/> <b>{getObjNameById(typeId, types)} </b>
                    </span>
                </div>
            </Modal>
        );
    };

    const editModal = () => {
        if (!editActive) {
            return null;
        }

        const {id, name, typeId} = rowData;

        const handleNameChange = (newName) => {
            if (!newName || !newName.length) {
                setValidName(false);
            } else {
                setValidName(true);
            }
            setRowData({...rowData, name: newName});
        }

        const handleTypeChange = (newType) => {
            setRowData({...rowData, typeId: newType});
        }

        const onConfirm = () => {
            if (!name || !name.length) {
                setValidName(false)
            } else {
                dataStore.editTreat(String(id), name, typeId || types[0].id)
                    .then(() => {
                        clearRowData();
                        setEditActive(false);
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
                        label="Наименовение"
                        value={name || ""}
                        placeholder="Введите наименование..."
                        onChange={e => handleNameChange(e.target.value)}
                        valid={validName}
                    />
                    <SelectControl
                        label="Тип"
                        onChange={handleTypeChange}
                        items={types}
                        selectedId={typeId}
                        placeholder={"Выберите тип..."}
                    />
                </div>
            </Modal>
        );
    }

    const createModal = () => {
        if (!createActive) {
            return null;
        }

        const {name, typeId} = rowData;

        const handleNameChange = (newName) => {
            if (!newName || !newName.length) {
                setValidName(false);
            } else {
                setValidName(true);
            }
            setRowData({...rowData, name: newName});
        }

        const handleTypeChange = (newType) => {
            setRowData({...rowData, typeId: newType});
        }

        const onConfirm = () => {
            if (!name || !name.length) {
                setValidName(false)
            } else {
                dataStore.createTreat(name, typeId || types[0].id)
                    .then(() => {
                        clearRowData();
                        setCreateActive(false);
                    });
            }
        }

        return (
            <Modal active={createActive} setActive={setCreateActive} onConfirm={onConfirm} confirmText={"Создать"}>
                <div className="create_modal_content">
                    <TextControl
                        label="Наименовение"
                        value={name || ""}
                        placeholder="Введите наименование..."
                        onChange={e => handleNameChange(e.target.value)}
                        valid={validName}
                    />
                    <SelectControl
                        label="Тип"
                        onChange={handleTypeChange}
                        items={types}
                        selectedId={typeId}
                        placeholder={"Выберите тип..."}
                    />
                </div>
            </Modal>
        );
    }

    const NAME = "name";
    const TYPE_ID = "typeId";
    const TYPE_NAME = "typeName";

    const columns = [
        { title: 'Наименование', field: NAME },
        { title: 'Тип', field: TYPE_NAME },
    ]

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

    if (!loaded && dataStore.isLoaded() || dataStore.isNeedUpdate()) {
        const types = dataStore.getTypes();
        const treats = dataStore.getTreats();
        const dataTypes = types.map(type => {
            return {
                id: type.id,
                name: type.name
            }
        });

        const data = treats.map(item => {
            return {
                id: item.id,
                [NAME]: item[NAME],
                [TYPE_NAME]: getObjNameById(item.typeId, dataTypes),
                [TYPE_ID]: item.typeId
            }
        });

        changeLoaded(true);
        changeData(data);
        changeTypes(dataTypes);
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