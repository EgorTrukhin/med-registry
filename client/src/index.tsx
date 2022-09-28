import { createRoot } from 'react-dom/client';
import App from './components/app/app';
import { store } from './store/store';

const root = createRoot(document.getElementById('root'));
const render = () => {
  root.render(<App />);
}

render();

store.subscribe(render);
