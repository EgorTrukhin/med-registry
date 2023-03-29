import "./InspectList.css"
import {Context} from "../../index";
import { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import {DataBaseApi} from "../../api/Api";
import NewTemplateIcon from "../../icons/NewTemplateIcon";
import CreateWordIcon from "../../icons/CreateWordIcon";
import ArrowBack from "../../icons/ArrowBack";
import {CreateTemplate} from "./CreateTemplate";
import {CreateForm} from "./CreateForm";

export const InspectList = observer(() => {
    const {dataStore} = useContext(Context);
    const [createForm, createFormActive] = useState(false);
    const [createTemplate, createTemplateActive] = useState(false);
    const [templates, changeTemplates] = useState([]);

    const openCreateForm = () => {
        dataStore.getInspectionListTemplates().then((templates) => {
            changeTemplates(templates.data);
            createFormActive(true) ;
        });
    }

    const createFormComponent = () => {
        return (
            <div className="form-editor">
                <div className="form-editor-header">
                    <span onClick={() => createFormActive(false)}>
                        <ArrowBack />
                    </span>
                    <h2>Сформировать Лист осмотра</h2>
                </div>
                <CreateForm templates={templates}/>
            </div>
        );
    }

    const saveTemplate = () => {
        createTemplateActive(false);
    }

    const createTemplateComponent = () => {
        return (
            <div className="template-editor">
                <div className="template-editor-header">
                    <span onClick={() => createTemplateActive(false)}>
                        <ArrowBack />
                    </span>
                    <h2>Создать шаблон Листа осмотра</h2>
                </div>
                <CreateTemplate propsSaveTemplate={saveTemplate}/>
            </div>
        );
    }

    return (
        <div className="inspect-list-wrapper">
            { createForm ? createFormComponent() : createTemplate ? createTemplateComponent() :
                <>
                    <div className="create-form insp-button" onClick={() => openCreateForm()}><CreateWordIcon /><span>Сформировать Лист осмотра</span></div>
                    <div className="create-template insp-button" onClick={() => createTemplateActive(true)}><NewTemplateIcon /><span>Создать шаблон Листа осмотра</span></div>
                </>
            }

        </div>
    );


});