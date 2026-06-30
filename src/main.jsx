import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import "./App.css";

import { GestionProducto } from './GestionProducto.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GestionProducto />
  </StrictMode>,
)
