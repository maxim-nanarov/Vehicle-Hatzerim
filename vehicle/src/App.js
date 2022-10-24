import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import MainMenu from "./pages/MainMenu/Main_menu";
import "./pages/Login/Login.scss";
import GetVehicle from "./pages/Get_Vehicle/Get_vehicle";
import VehicleSchedule from "./pages/Vehicle_Schedule/Vehicle_Schedule";
import Rides from "./pages/Rides/Rides";
import AddVehicle from "./pages/Add_Vehicle/AddVehicle";
import AddDestination from "./pages/AddDest/AddDestination";
import AddUser from "./pages/AddUser/AddUser";
import Selected_Vehicles from "./pages/Selected_Vehicles/Selected_Vehicles";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="Main_Menu/:id/*" element={<MainMenu />}>
          <Route path="" element={<VehicleSchedule />} />
          <Route path="Get_vehicle" element={<GetVehicle />} />
          <Route path="Rides" element={<Rides />} />
          <Route path="Add_Vehicle" element={<AddVehicle />} />
          <Route path="Add_Dest" element={<AddDestination />} />
          <Route path="Add_User" element={<AddUser />} />
          <Route path="Selected_Vehicles" element={<Selected_Vehicles />} />
        </Route>
        <Route
          path="*"
          element={
            <div>
              <h2>404 Page not found</h2>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
