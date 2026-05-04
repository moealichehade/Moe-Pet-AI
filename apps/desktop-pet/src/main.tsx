import React from 'react';
import ReactDOM from 'react-dom/client';
import { Owl } from './components/Owl';
import { Wolf } from './components/Wolf';
import './styles.css';

function App() {
  return (
    <div className="desktop-stage">
      <Owl />
      <Wolf />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
