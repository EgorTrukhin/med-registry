import { EDIT_TAB, RESULT_TAB, Tabs } from "../Tabs/Tabs";
import "./app.css";

const App = () => {
  const tabs = [
    {
      name: "Редактировать",
      ident: EDIT_TAB
    },
    {
      name: "Результат",
      ident: RESULT_TAB
    }
  ];
  
  return (
    <div className="app-container">
      <Tabs tabs={tabs}/>
    </div>
  );
}

export default App;