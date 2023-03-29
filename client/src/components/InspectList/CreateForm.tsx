import { useState } from "react";
import SelectControl from "../controls/SelectControl/SelectControl";
import {DataBaseApi} from "../../api/Api";
import {truncateArrayObjects} from "../../utils";

interface ICreateFormStateItem {
    ident?: string;
    description?: string;
    values?: Array<{
        id: string;
        value: any;
    }>;
}

export interface IFormValues {
    [ident: string]: string;
}

export const CreateForm = ({templates}) => {
    const [templateId, changeTemplateId] = useState<number>();
    const [templateValues, changeTemplateValues] = useState<ICreateFormStateItem[]>([]);
    const [formValues, changeFormValues] = useState<IFormValues>({});

    const handleTemplateChange = (newTemplateId) => {
        DataBaseApi.getTemplateAttrsByTemplateId(newTemplateId).then((attrs) => {
            const values: ICreateFormStateItem[] = [];
            Promise.all((attrs?.data || []).map(attr => {
                return DataBaseApi.getTemplateValuesByAttrIdent(attr.ident).then(vals => {
                    values.push({
                        ident: attr.ident,
                        description: attr.description,
                        values: truncateArrayObjects(vals.data, ["id", "value"])
                    });
                });
            })).then(() => {
                changeTemplateValues(values);
                changeTemplateId(newTemplateId);
            });

        })

    }

    const BoardItem = (attr) => {
        const handleValueChange = (valueId) => {
            const val = attr.values.find(v => String(v.id) === valueId);
            changeFormValues({...formValues, [attr.ident]: val?.value || ""});
        }

        return (
            <div className="values-board-item-wrapper">
                <div className="values-board-item-description">
                    <strong>{attr.ident}</strong>
                    <span>Описание: {attr.description}</span>
                </div>
                <SelectControl
                    label="Выбранное значение"
                    onChange={handleValueChange}
                    items={attr.values.map(v => {return {id: v.id, name: v.value}})}
                    selectedId={formValues[attr.ident]}
                    placeholder={"Выберите значение..."}
                />
            </div>
        );
    }

    const form = () => {
        const template = templates.find(t => String(t.id) === String(templateId));
        template && DataBaseApi.word({templateText: template.content || "", values: formValues}).then(response => {
            const blob = new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            });

            // Create a new URL for the blob
            const url = window.URL.createObjectURL(blob);

            // Create a new anchor element
            const link = document.createElement('a');

            // Set the href attribute to the URL
            link.href = url;

            // Set the download attribute to the desired filename
            link.download = template.templateName + '.docx';

            // Click the link to initiate the download
            link.click();

            // Clean up the URL object
            window.URL.revokeObjectURL(url);
        });
    }

    return (
        <div>
            <div className="template-select-control">
                <SelectControl
                    label="Шаблон"
                    onChange={handleTemplateChange}
                    items={(templates || []).map(t => {return {id: t.id, name: t.templateName}})}
                    selectedId={templateId || ""}
                    placeholder={"Выберите шаблон..."}
                />
                <div className={`create-form-btn ${!templateId ? "no-access" : ""}`} onClick={() => form()}>
                    <span>Сформировать и сохранить</span>
                </div>
            </div>
            <div className="values-board-content-wrapper">
                {
                    templateValues.length > 0 &&
                    <div className="values-board-content">
                        {templateValues.map(BoardItem)}
                    </div>
                }
                {templateValues.length == 0 && <div className="no-content">Шаблон не выбран</div>}
            </div>
        </div>
    );
}