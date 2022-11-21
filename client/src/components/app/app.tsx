import { observer } from "mobx-react-lite";
import { useContext } from "react";
import {DB_TAB, EDIT_TAB, RESULT_TAB, Tabs} from "../Tabs/Tabs";
import "./app.css";
import {Context} from "../../index";

const App = observer(() => {
  const tabs = [
    {
      name: "База данных",
      ident: DB_TAB
    },
    {
      name: "Создать лист назначений",
      ident: EDIT_TAB
    },
    {
      name: "Готовый лист назначений",
      ident: RESULT_TAB
    }
  ];
  
  return (
    <div className="app-container">
      <Tabs tabs={tabs}/>

    </div>
  );
})

export default App;