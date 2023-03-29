import { Table } from "../Table/Table";
import "./ObjectsTable.css"
import {useState } from "react";
import { observer } from "mobx-react-lite";
import ArrowBack from "../../icons/ArrowBack";
import {TreatsTable} from "./TreatsTable";
import {TypesTable} from "./TypesTable";
import {TreatmentsTable} from "./TreatmentsTable";
import {DietsTable} from "./DietsTable";
import {PatientsTable} from "./PatientsTable";
import {TemplateAttrsTable} from "./TemplateAttrsTable";
import {InspectionListTemplatesTable} from "./InspectionListTemplatesTable";
import {TemplateValuesTable} from "./TemplateValuesTable";

export const ObjectsTable = observer(() => {
    const [table, changeTable] = useState(null);

    const switchTable = () => {
        switch (table.ident) {
            case "patient":
                return <PatientsTable />;
            case "treatment":
                return <TreatmentsTable />;
            case "diet":
                return <DietsTable />;
            case "type":
                return <TypesTable />;
            case "treat":
                return <TreatsTable />;
            case "inspectionListTemplate":
                return <InspectionListTemplatesTable />;
            case "templateAttr":
                return <TemplateAttrsTable />;
            case "templateValue":
                return <TemplateValuesTable />;
        }
        return null;
    }

    const OBJ = 'object';
    const columns = [
        { title: 'Наименование', field: OBJ },
    ]

    const actions = [
        {
            icon: 'open_in_new',
            tooltip: 'Перейти к объекту',
            onClick: (_, rowData) => {
                changeTable(rowData);
            }
        }
    ]

    const data = [
        {ident: "patient", [OBJ]: "Пациент"},
        {ident: "treatment", [OBJ]: "Режим лечения"},
        {ident: "diet", [OBJ]: "Диета"},
        {ident: "type", [OBJ]: "Тип препарата"},
        {ident: "treat", [OBJ]: "Препарат"},
        {ident: "inspectionListTemplate", [OBJ]: "Шаблон Листа осмотра"},
        {ident: "templateAttr", [OBJ]: "Атрибут"},
        {ident: "templateValue", [OBJ]: "Значение"}
    ];

    if (table) {
        return (
            <div className="database-wrapper">
                <div className={"database-header"}>
                    <div className={"database-header-go-back"} onClick={() => changeTable(null)}>
                        <ArrowBack />
                    </div>
                    <h1>{table[OBJ]}</h1>
                </div>
                {switchTable()}
            </div>
        );
    }

    return (
        <div className="database-wrapper">
            <div className={"database-header"}>
                <h1>Объекты</h1>
            </div>
            <Table columns={columns} data={data} actions={actions} options={{filtering: false, search: false, toolbar: false, pageSize: 11}}/>
        </div>
    );
});