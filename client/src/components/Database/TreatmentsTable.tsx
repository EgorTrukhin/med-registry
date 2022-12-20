import { Table } from "../Table/Table";
import "./Database.css"
import {useContext, useState } from "react";
import Modal from "../Modal/Modal";
import {TextControl} from "../controls/TextControl/TextControl";
import WarningIcon from "../../icons/WarningIcon";
import {Context} from "../../index";
import { observer } from "mobx-react-lite";

interface IRowData {
    id?: number | string;
    name?: string;
    typeId?: number;
}

export const TreatmentsTable = observer(() => {
    const { dataStore } = useContext(Context);
    const [loaded, changeLoaded] = useState(false);
    const [data, changeData] = useState([]);
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

        const {id, name} = rowData;

        const onConfirm = () => {
            dataStore.deleteTreatment(String(id))
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
            <Modal active={deleteActive} setActive={onClose} onConfirm={onConfirm} confirmText={"Удалить"}>
                <div className="delete_modal_content" style={{display: "flex", alignItems: "center" }}>
                    <WarningIcon size={50} />
                    <span style={{marginLeft: "20px"}}>
                        Вы пытаетесь удалить режим!<br/>
                        Наименование: <br/> <b>{name}</b> <br/>
                    </span>
                </div>
            </Modal>
        );
    };

    const editModal = () => {
        if (!editActive) {
            return null;
        }

        const {id, name} = rowData;

        const handleNameChange = (newName) => {
            if (!newName || !newName.length) {
                setValidName(false);
            } else {
                setValidName(true);
            }
            setRowData({...rowData, name: newName});
        }

        const onConfirm = () => {
            if (!name || !name.length) {
                setValidName(false)
            } else {
                dataStore.editTreatment(String(id), name)
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
                        label="Наименовение"
                        value={name || ""}
                        placeholder="Введите наименование..."
                        onChange={e => handleNameChange(e.target.value)}
                        valid={validName}
                    />
                </div>
            </Modal>
        );
    }

    const createModal = () => {
        if (!createActive) {
            return null;
        }

        const {name} = rowData;

        const handleNameChange = (newName) => {
            if (!newName || !newName.length) {
                setValidName(false);
            } else {
                setValidName(true);
            }
            setRowData({...rowData, name: newName});
        }

        const onConfirm = () => {
            if (!name || !name.length) {
                setValidName(false)
            } else {
                dataStore.createTreatment(name)
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
                        label="Наименовение"
                        value={name || ""}
                        placeholder="Введите наименование..."
                        onChange={e => handleNameChange(e.target.value)}
                        valid={validName}
                    />
                </div>
            </Modal>
        );
    }

    const NAME = "name";

    const columns = [
        { title: 'Наименование', field: NAME }
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
        dataStore.getTreatments().then(treatments => {
            const data = treatments && treatments.data.map(treatment => {
                return {id: treatment.id, [NAME]: treatment.treatmentName}
            });

            changeLoaded(true);
            changeData(data);
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