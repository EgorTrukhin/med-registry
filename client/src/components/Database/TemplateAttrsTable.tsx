import { Table } from "../Table/Table";
import "./ObjectsTable.css"
import {useContext, useState } from "react";
import Modal from "../Modal/Modal";
import {TextControl} from "../controls/TextControl/TextControl";
import WarningIcon from "../../icons/WarningIcon";
import {Context} from "../../index";
import { observer } from "mobx-react-lite";
import SelectControl from "../controls/SelectControl/SelectControl";
import {getObjNameById} from "../../utils";

interface IRowData {
    ident?: string;
    description?: string;
    inspectionListTemplateId?: string;
}

export const TemplateAttrsTable = observer(() => {
    const { dataStore } = useContext(Context);
    const [loaded, changeLoaded] = useState(false);
    const [data, changeData] = useState([]);
    const [templates, changeTemplates] = useState([]);
    const [rowData, setRowData] = useState<IRowData>({});
    const [validName, setValidName] = useState(true);
    const [validDesc, setValidDesc] = useState(true);
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

        const {ident} = rowData;

        const onConfirm = () => {
            dataStore.deleteTemplateAttr(ident)
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
                        Вы пытаетесь удалить атрибут!<br/>
                        Наименование: <br/> <b>{ident}</b> <br/>
                    </span>
                </div>
            </Modal>
        );
    };

    const editModal = () => {
        if (!editActive) {
            return null;
        }

        const {ident, description, inspectionListTemplateId} = rowData;

        const handleIdentChange = (newIdent) => {
            if (!newIdent || !newIdent.length) {
                setValidName(false);
            } else {
                setValidName(true);
            }
            setRowData({...rowData, ident: newIdent});
        }

        const handleDescChange = (newDescription) => {
            if (!newDescription || !newDescription.length) {
                setValidDesc(false);
            } else {
                setValidDesc(true);
            }
            setRowData({...rowData, description: newDescription});
        }

        const onConfirm = () => {
            if (!description || !description.length) {
                setValidDesc(false)
            } else {
                dataStore.editTemplateAttr(ident, description, inspectionListTemplateId)
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
                        label="Идент"
                        value={ident || ""}
                        placeholder="Введите идент..."
                        onChange={e => handleIdentChange(e.target.value)}
                        valid={validName}
                        disabled={true}
                    />
                    <TextControl
                        label="Описание"
                        value={description || ""}
                        placeholder="Введите описание..."
                        onChange={e => handleDescChange(e.target.value)}
                        valid={validDesc}
                    />
                </div>
            </Modal>
        );
    }

    const createModal = () => {
        if (!createActive) {
            return null;
        }

        const {ident, description, inspectionListTemplateId} = rowData;

        const handleIdentChange = (newIdent) => {
            if (!newIdent || !newIdent.length) {
                setValidName(false);
            } else {
                setValidName(true);
            }
            setRowData({...rowData, ident: newIdent});
        }

        const handleDescChange = (newDescription) => {
            if (!newDescription || !newDescription.length) {
                setValidDesc(false);
            } else {
                setValidDesc(true);
            }
            setRowData({...rowData, description: newDescription});
        }

        const handleTypeChange = (newTemplateId) => {
            setRowData({...rowData, inspectionListTemplateId: newTemplateId});
        }

        const onConfirm = () => {
            if (!description || !description.length) {
                setValidDesc(false);
            } else if (!ident || !ident.length) {
                setValidName(false);
            } else {
                dataStore.createTemplateAttr(ident, description, inspectionListTemplateId || templates[0].id)
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
                        label="Идент"
                        value={ident || ""}
                        placeholder="Введите идент..."
                        onChange={e => handleIdentChange(e.target.value)}
                        valid={validName}
                    />
                    <TextControl
                        label="Описание"
                        value={description || ""}
                        placeholder="Введите описание..."
                        onChange={e => handleDescChange(e.target.value)}
                        valid={validDesc}
                    />
                    <SelectControl
                        label="Шаблон"
                        onChange={handleTypeChange}
                        items={templates}
                        selectedId={inspectionListTemplateId}
                        placeholder={"Выберите шаблон..."}
                    />
                </div>
            </Modal>
        );
    }

    const IDENT = "ident";
    const DESC = "description";
    const TEMPLATE_ID = "inspectionListTemplateId";
    const TEMPLATE_NAME = "templateName";

    const columns = [
        { title: 'Идент', field: IDENT },
        { title: 'Описание', field: DESC },
        { title: 'Шаблон', field: TEMPLATE_NAME }
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
        Promise.all([dataStore.getTemplateAttrs(), dataStore.getInspectionListTemplates()])
            .then(([templateAttrs, templates]) => {
                const dataTemplates = templates && templates.data.map(template => {
                    return {
                        id: template.id,
                        name: template.templateName
                    }
                });

                const data = templateAttrs && templateAttrs.data.map(templateAttr => {
                    return {
                        [IDENT]: templateAttr[IDENT],
                        [DESC]: templateAttr[DESC],
                        [TEMPLATE_ID]: templateAttr[TEMPLATE_ID],
                        [TEMPLATE_NAME]: getObjNameById(templateAttr[TEMPLATE_ID], dataTemplates)
                    }
                });

                changeLoaded(true);
                changeData(data);
                changeTemplates(dataTemplates);
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