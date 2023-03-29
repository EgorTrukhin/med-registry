import { useRef, useState } from "react";
import { Editor } from '@tinymce/tinymce-react';
import Modal from "../Modal/Modal";
import {TextControl} from "../controls/TextControl/TextControl";
import {TemplateAttrsTable} from "../Database/TemplateAttrsTable";
import {ITemplateAttr} from "../../store/models";
import {DataBaseApi} from "../../api/Api";
import {truncateArrayObjects} from "../../utils";

interface INewTemplate {
    templateName?: string;
    content?: string;
    idents: ITemplateAttr[];
    values: {
        [ident: string]: string[];
    };
}

export const CreateTemplate = ({propsSaveTemplate}) => {
    const editorRef = useRef(null);

    const [insertIdentsModal, insertIdentsModalOpen] = useState(false);
    const [insertIdents, changeInsertIdents] = useState<ITemplateAttr[]>([]);

    const [newTemplateNameModal, newTemplateNameModalOpen] = useState(false);
    const [newTemplateName, changeNewTemplateName] = useState("");
    const [newTemplate, changeNewTemplate] = useState<INewTemplate>({
        idents: [],
        values: {},
    });

    const [createIdentsModal, createIdentsModalOpen] = useState(false);
    const [createIdentValuesModal, createIdentValuesModalOpen] = useState(false);
    const [newIdentName, changeNewIdentName] = useState("");
    const [newIdentDesc, changeNewIdentDesc] = useState("");
    const [newIdentValues, changeNewIdentValues] = useState([]);
    const [newIdentValue, changeNewIdentValue] = useState("");

    const CreateIdentValuesModal = () => {
        if (!createIdentValuesModal) {
            return null;
        }

        const handleNewIdentValues = (newValue) => {
            changeNewIdentValue(newValue);
        }

        const onConfirm = () => {
            changeNewIdentValues([...newIdentValues, newIdentValue])
            createIdentValuesModalOpen(false);
            changeNewIdentValue("");
        }

        return (
            <Modal active={createIdentValuesModal} setActive={createIdentValuesModalOpen} onConfirm={() => onConfirm()} confirmText={"Добавить"}>
                <div className="create_modal_content">
                    <TextControl
                        label="Значение"
                        value={newIdentValue}
                        placeholder="Введите значение..."
                        onChange={e => handleNewIdentValues(e.target.value)}
                    />
                </div>
            </Modal>
        );
    }

    const openCreateModal = () => {
        createIdentsModalOpen(true);
    }

    const CreateIdentModal = () => {
        if (!createIdentsModal) {
            return null;
        }

        const handleNewIdentName = (newName) => {
            changeNewIdentName(newName);
        }

        const handleNewIdentDesc = (newDesc) => {
            changeNewIdentDesc(newDesc);
        }

        const onConfirm = () => {
            changeNewTemplate({
                ...newTemplate,
                idents: [...newTemplate?.idents, {ident: newIdentName, description: newIdentDesc}],
                values: {...newTemplate?.values, [newIdentName]: newIdentValues}
            });
            changeNewIdentName("");
            changeNewIdentDesc("");
            changeNewIdentValues([]);
            createIdentsModalOpen(false);
            insertIdent(newIdentName);
        }

        return (
            <Modal active={createIdentsModal} setActive={createIdentsModalOpen} onConfirm={() => onConfirm()} confirmText={"Сохранить и вставить"}>
                <div className="create_modal_content">
                    <TextControl
                        label="Идент"
                        value={newIdentName}
                        placeholder="Введите идент..."
                        onChange={e => handleNewIdentName(e.target.value)}
                    />
                    <TextControl
                        label="Описание"
                        value={newIdentDesc}
                        placeholder="Введите описание..."
                        onChange={e => handleNewIdentDesc(e.target.value)}
                    />
                    <button onClick={() => createIdentValuesModalOpen(true)} style={{"padding": "5px"}}>
                        Добавить возможные значения
                    </button>
                    <div style={{"wordBreak": "break-word"}}>
                        {newIdentValues.length ? `Новые значения: ${newIdentValues.join(", ")}` : null}
                    </div>
                </div>
            </Modal>
        );
    }

    const openInsertModal = () => {
        DataBaseApi.getTemplateAttrs().then(attrs => {
            changeInsertIdents(attrs.data);
            insertIdentsModalOpen(true);
        })
    }

    const InsertIdentModal = () => {
        if (!insertIdentsModal) {
            return null;
        }

        const chooseIdent = (attr) => {
            DataBaseApi.getTemplateValuesByAttrIdent(attr.ident).then(values => {
                const newIdent = attr.ident + "_copy";
                changeNewTemplate({
                    ...newTemplate,
                    idents: [...newTemplate?.idents, {ident: newIdent, description: attr.description}],
                    values: {...newTemplate?.values, [newIdent]: truncateArrayObjects(values.data, ["id", "value"])}
                });
                insertIdent(newIdent);
                insertIdentsModalOpen(false);
            });
        }

        return (
            <Modal active={insertIdentsModal} setActive={insertIdentsModalOpen} onConfirm={() => insertIdentsModalOpen(false)} confirmText={"Вставить"}>
                <div>
                    {(insertIdents || []).map(attr => {
                        return (
                            <div className="create-template-exist-attrs" onClick={() => chooseIdent(attr)}>
                                <strong>{attr.ident}</strong>
                                <span>Описание: {attr.description}</span>
                            </div>
                        );
                    })}
                </div>
            </Modal>
        );
    }

    const TemplateName = () => {
        if (!newTemplateNameModal) {
            return null;
        }

        const createTemplate = () => {

            DataBaseApi.createInspectionListTemplate(newTemplateName, editorRef.current.getContent() || "").then((response) => {
                const template = response.data;
                Promise.all((newTemplate.idents || []).map(attr => {
                    return DataBaseApi.createTemplateAttr(attr.ident, attr.description, template.id).then(() => {
                        (newTemplate?.values[attr.ident] || []).map(val => DataBaseApi.createTemplateValue(val, attr.ident));
                    });
                })).then(() => {
                    newTemplateNameModalOpen(false);
                    saveTemplate();
                });
            });
        }

        const handleTemplateName = (newName) => {
            changeNewTemplateName(newName);
        }

        return (
            <Modal active={newTemplateNameModal} setActive={newTemplateNameModalOpen} onConfirm={() => createTemplate()} confirmText={"Сохранить"}>
                <div>
                    <TextControl
                        label="Описание"
                        value={newTemplateName}
                        placeholder="Введите описание..."
                        onChange={e => handleTemplateName(e.target.value)}
                    />
                </div>
            </Modal>
        );
    }

    const insertIdent = (ident) => {
        const tag = document.createElement("span");
        tag.textContent = `{{${ident}}}`;
        editorRef.current.selection.setContent(tag.outerHTML);
    }

    const saveTemplate = () => {
        propsSaveTemplate();
    }

    return (
        <div className="create-template-wrapper">
            <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue="<p>Впишите или вставьте текст...</p>"
                init={{
                    content_css: "document",
                    language: 'ru',
                    height: 500,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks',
                        'media table paste'
                    ],
                    toolbar: 'createIdentButton | insertIdentButton | undo redo | fontselect | fontsizeselect |' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    statusbar: false,
                    setup: function (editor) {

                        editor.ui.registry.addButton('createIdentButton', {
                            text: 'Создать идент.',
                            onAction: function (_) {
                                openCreateModal();
                            }
                        });

                        editor.ui.registry.addButton('insertIdentButton', {
                            text: 'Вставить идент.',
                            onAction: function (_) {
                                openInsertModal();
                            }
                        });
                    },
                }}
            />
            {InsertIdentModal()}
            {CreateIdentModal()}
            {CreateIdentValuesModal()}
            {TemplateName()}
            <div className="create-template-footer">
                <div className="create-template-btn" onClick={() => newTemplateNameModalOpen(true)}>
                    <span>Создать шаблон</span>
                </div>
            </div>
        </div>
    );
}
