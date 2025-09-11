import './index.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route,Routes } from "react-router";
import App from './App.jsx'
import BookChapters from './pages/BookChapters.jsx';
import Metas from './pages/Metas.jsx';
import Ajustes from './pages/Ajustes.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:idName" element={<BookChapters/>} />
      <Route path="/metas" element={<Metas />} />
      <Route path="/ajustes" element={<Ajustes />} />
    </Routes>

  </BrowserRouter>,
)
