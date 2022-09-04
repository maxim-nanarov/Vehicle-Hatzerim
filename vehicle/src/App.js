import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import MainMenu from "./pages/MainMenu/Main_menu";
import "./pages/Login/Login.scss";
import GetVehicle from "./pages/Get_vehicle";
import VehicleSchedule from "./pages/Vehicle_Schedule";
import Rides from "./pages/Rides";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="Main_Menu/:id" element={<MainMenu />}>
          <Route path="Get_vehicle" element={<GetVehicle />} />
          <Route path="Vehicle_Schedule" element={<VehicleSchedule />} />
          <Route path="Rides" element={<Rides />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
