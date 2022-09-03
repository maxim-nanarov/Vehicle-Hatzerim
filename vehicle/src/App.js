import { Route, Routes } from "react-router-dom";
import GetVehicle from "./pages/Get_vehicle";
import Login from "./pages/Login/Login";
import MainMenu from "./pages/Main_menu";
import "./pages/Login/Login.scss";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Main_Menu" element={<MainMenu />} />
      <Route path="/Get_Vehicle" element={<GetVehicle />} />
    </Routes>
  );
}

export default App;
