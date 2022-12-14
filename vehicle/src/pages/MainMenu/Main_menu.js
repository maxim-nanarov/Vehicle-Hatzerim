import React, { useEffect, useState } from "react";
import Myimage from "../../pictures/Logo_Hatzerim.jpg";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import "./Main_menu.scss";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

export default function MainMenu() {
  let { id } = useParams();
  const { search } = useLocation();
  const Da = new Date();
  const [date, setDate] = useState(Da);
  const [User, setUser] = useState([]);

  useEffect(() => {
    // let DATAid = JSON.stringify(id);
    let user = async function () {
      await axios
        .get(
          `https://vehicle-hatzerim.herokuapp.com/get_specific_user/?id=${id}`
        )
        .then((res) => {
          setUser(res.data[0]);
        })
        .catch((err) => {
          alert("a Problome with the connection, contact me at 058-5599369");
        });
    };
    user();
  }, [User, id]);
  useEffect(() => {
    const Da = new Date();
    setDate(Da.toLocaleString());
  }, [date]);

  setInterval(function () {
    let da = new Date();
    setDate(da.toLocaleString());
  }, 1000);
  if (User.is_admin) {
    return (
      <>
        <div className="MainMenuDiv">
          <div className="header">
            <img className="MainMenuIMG" src={Myimage} alt="Logo"></img>
            <div>{date.toLocaleString()}</div>
          </div>
          <div className="TheStaiblayzer">
            <nav className="topnav">
              <Swiper
                slidesPerView={3}
                spaceBetween={30}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <Link to={`/Main_Menu/${id}/Get_vehicle${search}`}>
                    Get Vehicle
                  </Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link to={`/Main_Menu/${id}${search}`}>Vehicle Schedule</Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link to={`/Main_Menu/${id}/EditMyRides${search}`}>
                    My Rides
                  </Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link to={`/Main_Menu/${id}/Rides${search}`}>Rides</Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link to={`/Main_Menu/${id}/Add_Vehicle${search}`}>
                    Add Vehicle
                  </Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link to={`/Main_Menu/${id}/Add_Dest${search}`}>
                    Add Destionaion
                  </Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link to={`/Main_Menu/${id}/Add_User${search}`}>
                    Add User
                  </Link>
                </SwiperSlide>
              </Swiper>
            </nav>
          </div>
          <div className="TheRestOfTheSite">
            <Outlet />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="MainMenuDiv">
          <div className="header">
            <img className="MainMenuIMG" src={Myimage} alt="Logo"></img>
            <div>{date.toLocaleString()}</div>
          </div>
          <div className="TheStaiblayzer">
            <nav className="topnav">
              <Swiper
                slidesPerView={3}
                spaceBetween={30}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <Link to={`/Main_Menu/${id}/Get_vehicle${search}`}>
                    Get Vehicle
                  </Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link to={`/Main_Menu/${id}${search}`}>Vehicle Schedule</Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link to={`/Main_Menu/${id}/EditMyRides${search}`}>
                    Edit My Rides
                  </Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link to={`/Main_Menu/${id}/Rides${search}`}>Rides</Link>
                </SwiperSlide>
              </Swiper>
            </nav>
          </div>
          <div className="TheRestOfTheSite">
            <Outlet />
          </div>
        </div>
      </>
    );
  }
}
