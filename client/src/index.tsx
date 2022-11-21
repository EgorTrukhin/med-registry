import { createRoot } from 'react-dom/client';
import React, {createContext} from 'react';
import App from './components/app/app';
import DataStore from "./store/store";

const root = createRoot(document.getElementById('root'));
export const Context = createContext(null)
const render = () => {
  root.render(
      <Context.Provider value={{
        dataStore: new DataStore()
      }}>
        <App />
      </Context.Provider>,
  );
}

render();
