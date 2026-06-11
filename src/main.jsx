import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import "./App.css";

import { LoginPage } from './components/LoginPage.jsx';
import { GestionProducto } from './GestionProducto.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GestionProducto />
  </StrictMode>,
)
