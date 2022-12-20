import { Table } from "../Table/Table";
import "./Database.css"
import {useContext, useState } from "react";
import Modal from "../Modal/Modal";
import {TextAreaControl, TextControl} from "../controls/TextControl/TextControl";
import WarningIcon from "../../icons/WarningIcon";
import {Context} from "../../index";
import { observer } from "mobx-react-lite";

interface IRowData {
    id?: number | string;
    templateName?: string;
    content?: string;
}

export const InspectionListTemplatesTable = observer(() => {
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

        const {id, templateName} = rowData;

        const onConfirm = () => {
            dataStore.deleteInspectionListTemplate(String(id))
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
                        Вы пытаетесь удалить шаблон для Листа осмотра!<br/>
                        Наименование: <br/> <b>{templateName}</b> <br/>
                    </span>
                </div>
            </Modal>
        );
    };

    const editModal = () => {
        if (!editActive) {
            return null;
        }

        const {id, templateName, content} = rowData;

        const handleNameChange = (newName) => {
            if (!newName || !newName.length) {
                setValidName(false);
            } else {
                setValidName(true);
            }
            setRowData({...rowData, templateName: newName});
        }

        const handleContentChange = (newContent) => {
            setRowData({...rowData, content: newContent});
        }

        const onConfirm = () => {
            if (!templateName || !templateName.length) {
                setValidName(false)
            } else {
                dataStore.editInspectionListTemplate(String(id), templateName, content)
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
                        value={templateName || ""}
                        placeholder="Введите наименование..."
                        onChange={e => handleNameChange(e.target.value)}
                        valid={validName}
                    />
                    <TextAreaControl
                        label="Контент"
                        value={content || ""}
                        placeholder="Введите наименование..."
                        onChange={e => handleContentChange(e.target.value)}
                    />
                </div>
            </Modal>
        );
    }

    const createModal = () => {
        if (!createActive) {
            return null;
        }

        const {templateName, content} = rowData;

        const handleNameChange = (newName) => {
            if (!newName || !newName.length) {
                setValidName(false);
            } else {
                setValidName(true);
            }
            setRowData({...rowData, templateName: newName});
        }

        const handleContentChange = (newContent) => {
            setRowData({...rowData, content: newContent});
        }

        const onConfirm = () => {
            if (!templateName || !templateName.length) {
                setValidName(false)
            } else {
                dataStore.createInspectionListTemplate(templateName, content)
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
                        value={templateName || ""}
                        placeholder="Введите наименование..."
                        onChange={e => handleNameChange(e.target.value)}
                        valid={validName}
                    />
                    <TextAreaControl
                        label="Контент"
                        value={content || ""}
                        placeholder="Введите наименование..."
                        onChange={e => handleContentChange(e.target.value)}
                    />
                </div>
            </Modal>
        );
    }

    const NAME = "templateName";
    const CONTENT = "content";
    const DISPLAYED_CONTENT = "displayedContent";

    const columns = [
        { title: 'Наименование', field: NAME },
        { title: 'Контент', field: DISPLAYED_CONTENT }
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
        dataStore.getInspectionListTemplates().then(templates => {
            const data = templates && templates.data.map(template => {
                const content = template[CONTENT];
                const displayedContent = content && content.length > 50 ? content.substring(0, 50).concat("...") : content;
                return {
                    id: template.id,
                    [NAME]: template[NAME],
                    [CONTENT]: template[CONTENT],
                    [DISPLAYED_CONTENT]: displayedContent
                }
            });

            changeLoaded(true);
            changeData(data);
        });
    }

    return (
        <div>
            <Table columns={columns} data={data} actions={actions} options={{pageSize: 5}}/>
            {editModal()}
            {deleteModal()}
            {createModal()}
        </div>
    );
});