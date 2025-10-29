import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

// Lazy loaded components
const Dashboard = lazy(() => import("./components/Dashboard"));
const Landing = lazy(() => import("./components/Landing"));

function App() {
  return (
    <BrowserRouter>
      <Appbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Landing />} Suspense/>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

function Appbar() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/")}>Landing</button>
      <button onClick={() => navigate("/dashboard")}>Dashboard</button>
    </div>
  );
}

export default App;
