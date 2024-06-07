import React from "react";
import { Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import Login from "./pages/Login";
import Financas from "./pages/Financas";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/financas" element={<Financas />} />
      </Routes>
    </Router>
  );
}

export default App;
