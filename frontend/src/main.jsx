import './index.css'; // Move CSS import to the top
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import store from './store/store'; // Import the Redux store
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Wrap with Redux Provider */}
      <BrowserRouter> {/* Wrap with BrowserRouter */}
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
