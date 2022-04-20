import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';
import { Database, IDatabase } from './db/db';

export const Context: React.Context<IDatabase> = createContext(null);

ReactDOM.render(
  <Context.Provider value={new Database()}>
   <App />
  </Context.Provider>, 
document.getElementById('root'));
