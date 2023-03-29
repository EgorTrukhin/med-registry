import { observer } from "mobx-react-lite";
import {DB_TAB, EDIT_TAB, RESULT_TAB, Tabs} from "../Tabs/Tabs";
import "./app.css";

const App = observer(() => {
  const tabs = [
    {
      name: "Справочники",
      ident: DB_TAB
    },
    {
      name: "Лист назначений",
      ident: EDIT_TAB
    },
    {
      name: "Лист осмотра",
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