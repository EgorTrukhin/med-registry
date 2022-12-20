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
    firstName?: string;
    secondName?: string;
    middleName?: string;
}

export const PatientsTable = observer(() => {
    const { dataStore } = useContext(Context);
    const [loaded, changeLoaded] = useState(false);
    const [data, changeData] = useState([]);
    const [rowData, setRowData] = useState<IRowData>({});
    const [validFName, setValidFName] = useState(true);
    const [validSName, setValidSName] = useState(true);
    const [validMName, setValidMName] = useState(true);
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

        const {id, firstName, secondName, middleName } = rowData;

        const onConfirm = () => {
            dataStore.deletePatient(String(id))
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
                        Вы пытаетесь удалить пациента!<br/>
                        Наименование: <br/> <b>{firstName + " " + secondName + " " + middleName}</b> <br/>
                    </span>
                </div>
            </Modal>
        );
    };

    const editModal = () => {
        if (!editActive) {
            return null;
        }

        const {id, firstName, secondName, middleName} = rowData;

        const handleFNameChange = (newName) => {
            if (!newName || !newName.length) {
                setValidFName(false);
            } else {
                setValidFName(true);
            }
            setRowData({...rowData, firstName: newName});
        }

        const handleSNameChange = (newName) => {
            if (!newName || !newName.length) {
                setValidSName(false);
            } else {
                setValidSName(true);
            }
            setRowData({...rowData, secondName: newName});
        }

        const handleMNameChange = (newName) => {
            if (!newName || !newName.length) {
                setValidMName(false);
            } else {
                setValidMName(true);
            }
            setRowData({...rowData, middleName: newName});
        }

        const onConfirm = () => {
            if (!firstName || !firstName.length) {
                setValidFName(false)
            } else if (!secondName || !secondName.length) {
                setValidSName(false)
            } else if (!middleName || !middleName.length) {
                setValidMName(false)
            } else {
                dataStore.editPatient(String(id), firstName, secondName, middleName)
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
                        label="Фамилия"
                        value={firstName || ""}
                        placeholder="Введите фамилию..."
                        onChange={e => handleFNameChange(e.target.value)}
                        valid={validFName}
                    />
                    <TextControl
                        label="Имя"
                        value={secondName || ""}
                        placeholder="Введите имя..."
                        onChange={e => handleSNameChange(e.target.value)}
                        valid={validSName}
                    />
                    <TextControl
                        label="Отчество"
                        value={middleName || ""}
                        placeholder="Введите отчество..."
                        onChange={e => handleMNameChange(e.target.value)}
                        valid={validMName}
                    />
                </div>
            </Modal>
        );
    }

    const createModal = () => {
        if (!createActive) {
            return null;
        }

        const {firstName, secondName, middleName} = rowData;

        const handleFNameChange = (newName) => {
            if (!newName || !newName.length) {
                setValidFName(false);
            } else {
                setValidFName(true);
            }
            setRowData({...rowData, firstName: newName});
        }

        const handleSNameChange = (newName) => {
            if (!newName || !newName.length) {
                setValidSName(false);
            } else {
                setValidSName(true);
            }
            setRowData({...rowData, secondName: newName});
        }

        const handleMNameChange = (newName) => {
            if (!newName || !newName.length) {
                setValidMName(false);
            } else {
                setValidMName(true);
            }
            setRowData({...rowData, middleName: newName});
        }

        const onConfirm = () => {
            if (!firstName || !firstName.length) {
                setValidFName(false)
            } else if (!secondName || !secondName.length) {
                setValidSName(false)
            } else if (!middleName || !middleName.length) {
                setValidMName(false)
            } else {
                dataStore.createPatient(firstName, secondName, middleName)
                    .then(() => {
                        clearRowData();
                        setCreateActive(false);
                        changeLoaded(false);
                    });
            }
        }

        const onClose = (value) =>{
            setCreateActive(value);
            clearRowData();
        }

        return (
            <Modal active={createActive} setActive={onClose} onConfirm={onConfirm} confirmText={"Готово"}>
                <div className="edit_modal_content">
                    <TextControl
                        label="Фамилия"
                        value={firstName || ""}
                        placeholder="Введите фамилию..."
                        onChange={e => handleFNameChange(e.target.value)}
                        valid={validFName}
                    />
                    <TextControl
                        label="Имя"
                        value={secondName || ""}
                        placeholder="Введите имя..."
                        onChange={e => handleSNameChange(e.target.value)}
                        valid={validSName}
                    />
                    <TextControl
                        label="Отчество"
                        value={middleName || ""}
                        placeholder="Введите отчество..."
                        onChange={e => handleMNameChange(e.target.value)}
                        valid={validMName}
                    />
                </div>
            </Modal>
        );
    }

    const FIRST_NAME = "firstName";
    const SECOND_NAME = "secondName";
    const MIDDLE_NAME = "middleName";

    const columns = [
        { title: 'Фамилия', field: FIRST_NAME },
        { title: 'Имя', field: SECOND_NAME },
        { title: 'Отчество', field: MIDDLE_NAME }
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
        dataStore.getPatients().then(patients => {
            const data = patients && patients.data.map(patient => {
                return {
                    id: patient.id,
                    [FIRST_NAME]: patient[FIRST_NAME],
                    [SECOND_NAME]: patient[SECOND_NAME],
                    [MIDDLE_NAME]: patient[MIDDLE_NAME]
                }
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