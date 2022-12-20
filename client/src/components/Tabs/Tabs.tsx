import {useContext, useState } from "react";
import { ReportEditor } from "../ReportEditor/ReportEditor";
import { ReportResult } from "../ReportResult/ReportResult";
import "./Tabs.css";
import { observer } from "mobx-react-lite";
import {ObjectsTable} from "../Database/ObjectsTable";

export const EDIT_TAB = "EDIT_TAB";
export const RESULT_TAB = "RESULT_TAB";
export const DB_TAB = "DB_TAB";

interface ITab {
  name: string;
  ident: string;
}

interface TabsProps {
  tabs: Array<ITab>;
}

export const Tabs = observer((props: TabsProps) => {
  const { tabs } = props;
  const [activeIdent, onChange] = useState(DB_TAB);

  const tabContent = (ident) => {
    switch (ident) {
      case DB_TAB:
        return (
            <div className="tab-content">
              <ObjectsTable />
            </div>
        );
      case EDIT_TAB:
        return (
          <div className="tab-content">
              <ReportEditor />
          </div>
        );
      case RESULT_TAB:
        return (
          <div className="tab-content">
              <ReportResult />
          </div>
        );
    }
  }

  const onTabChange = (ident) => {
    ident !== activeIdent && onChange(ident)
  }

  return (
    <div className="tabs-wrapper">
      <div className="tabs-nav">
        {tabs.map(tab => {
          const {name, ident} = tab; 
          return (
            <div className={`tab ${ident === activeIdent ? "active" : ""}`} onClick={() => onTabChange(ident)}>
              <span>
                {name}
              </span>
            </div>
          );
        })}
      </div>
      {tabContent(activeIdent)}
    </div>
  );
});