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

  const test = async () => {
    const newPath = window.location.origin + "/api/test";
    const response = await fetch(newPath);
    const res = await response.json();
    console.log(res);
  }
  
  return (
    <div className="app-container">
      <Tabs tabs={tabs}/>
      <button
        onClick={() => {
          test();
        }}
      >
        test
      </button>
    </div>
  );
}

export default App;