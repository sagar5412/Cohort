import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./pages/signup ";
import { Signin } from "./pages/signin";
import { Dashboard } from "./pages/dashboard";
import { Send } from "./pages/send";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/send" element={<Send />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
