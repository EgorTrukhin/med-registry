import { observer } from "mobx-react-lite";
import { Database } from "../db/db";
import { TreatsExplorer } from "../TreatsExplorer/TreatsExplorer";
import "./app.css";

const App = observer(() => {
  return (
    <div className="app-container">
      <TreatsExplorer />      
    </div>
  );
})

export default App;