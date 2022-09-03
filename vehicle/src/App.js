import { Route, Routes } from "react-router-dom";
import Get_vehicle from "./pages/Get_vehicle";
import Login from "./pages/Login";
import Main_menu from "./pages/Main_menu";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main_menu" element={<Main_menu />} />
      <Route path="/Get_Vehicle" element={<Get_vehicle />} />
    </Routes>
  );
}

export default App;
