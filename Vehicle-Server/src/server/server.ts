import path from "path";
import express, { Express } from "express";
import cors from "cors";
import { json } from "body-parser";
import { client } from "./data";
import { initDb } from "./data";

const app: Express = express();
app.use(cors());
app.use(json());
const root: string = path.join(process.cwd(), "dist");

app.use(express.static(root));

app.use(express.static(root), (_req, _res, next) => {
  next();
});

app.get("/Users", (_req, res) => {
  client.query("SELECT * FROM Users;", (err: Error, response: any) => {
    if (err) throw err;
    res.status(200).json(response.rows);
  });
});

app.get("/get_specific_user", (req, res) => {
  let data = req.query;
  // console.log("data => ", req.params.id);
  client.query(
    `SELECT * FROM Users WHERE user_id = ${data.id};`,
    (err: Error, response: any) => {
      if (err) throw err;
      res.status(200).json(response.rows);
    }
  );
});

app.get("/Rides", (_req, res) => {
  client.query("SELECT * FROM ride;", (err: Error, response: any) => {
    if (err) throw err;
    res.status(200).json(response.rows);
  });
});

app.get("/Destinations", (_req, res) => {
  client.query("SELECT * FROM destinations;", (err: Error, response: any) => {
    if (err) throw err;
    res.status(200).json(response.rows);
  });
});

app.get("/reasons", (_req, res) => {
  client.query("SELECT * FROM reasons;", (err: Error, response: any) => {
    if (err) throw err;
    res.status(200).json(response.rows);
  });
});

app.get("/type_vehicle", (_req, res) => {
  client.query("SELECT * FROM type_vehicle;", (err: Error, response: any) => {
    if (err) throw err;
    res.status(200).json(response.rows);
  });
});

app.get("/vehicle_Company", (_req, res) => {
  client.query(
    "select * from vehicle_company;",
    (err: Error, response: any) => {
      if (err) throw err;
      res.status(200).json(response.rows);
    }
  );
});

app.get("/vehicle_size", (_req, res) => {
  client.query("SELECT * FROM vehicle_size;", (err: Error, response: any) => {
    if (err) throw err;
    res.status(200).json(response.rows);
  });
});

app.get("/vehicles", (_req, res) => {
  client.query("SELECT * FROM vehicles;", (err: Error, response: any) => {
    if (err) throw err;
    res.status(200).json(response.rows);
  });
});

app.get("/Get_Ride_data", (_req, res) => {
  client.query(
    "SELECT * FROM ((((((ride JOIN users ON ride.user_id = users.user_id) JOIN destinations ON ride.destination_id = destinations.destination_id) JOIN reasons ON ride.reason_id = reasons.reason_id) JOIN vehicles ON ride.vehicle_plate_num = vehicles.vehicle_plate_num)JOIN vehicle_company ON vehicles.company_id = vehicle_company.company_id)JOIN type_vehicle ON vehicles.type_id = type_vehicle.type_id)INNER JOIN vehicle_size ON vehicles.size_id = vehicle_size.size_id;",
    (err: Error, response: any) => {
      if (err) throw err;
      res.status(200).json(response.rows);
    }
  );
});

app.get("/Vehicles_And_Its_Relevent_Element", (_req, res) => {
  client.query(
    "SELECT * FROM ((vehicles INNER JOIN vehicle_company ON vehicles.company_id = vehicle_company.company_id) INNER JOIN type_vehicle ON vehicles.type_id = type_vehicle.type_id ) INNER JOIN vehicle_size ON vehicles.size_id = vehicle_size.size_id;",
    (err: Error, response: any) => {
      if (err) throw err;
      res.status(200).json(response.rows);
    }
  );
});
//
app.post("/User_data", (req, res) => {
  var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  let data = req.body.data;
  console.log(data);
  if (
    !format.test(String(req.body.data.username)) &&
    !format.test(String(req.body.data.surname))
  ) {
    client.query(
      `INSERT INTO users VALUES(DEFAULT, '${data.username}','${data.surname}',${data.PersonalPhone},${data.WorkPhone},${data.HomePhone},'${data.IsAdmin}');`,
      (err: Error, response: any) => {
        if (err) throw err;
        res.send(response);
      }
    );
  } else {
    res.send("SQLi? how about no");
  }
});

app.post("/Ride_data", (req, res) => {
  const data = req.body.data;
  const dataS = req.body.data.Data;
  const SD = data.StartingDate;
  const ED = data.EndingDate;
  const plateNum: number = data.plateNum;
  const ID: number = data.id;
  console.log(data);
  console.log("plateNum: ", plateNum);
  client.query(
    `INSERT INTO ride (ride_id,starting_date,finishing_date, will_take_riders, vehicle_plate_num,user_id,destination_id,reason_id) VALUES (DEFAULT,'${SD}','${ED}','${dataS.Take_Riders}','${plateNum}','${ID}','${dataS.Destination}','${dataS.Reason}');`,
    (err: Error, response: any) => {
      if (err) throw err;
      res.send(response);
    }
  );
});

app.post("/Destionaion_Data", (req, res) => {
  console.log(req.body.Data);
  // if (SQLI_Checker(req.body.Data.name)) {
  client.query(
    `INSERT INTO destinations (destination_id,destination_name,destination_score) VALUES (DEFAULT,'${req.body.Data.name}','${req.body.Data.score}');`,
    (err: Error, response: any) => {
      if (err) throw err;
      {
        console.log("it worked??? ");
        console.log(response);
        res.send(response);
      }
    }
  );
  // } else {
  //   res.send("No SQLI");
  // }
});

app.post("/Add_Vehicle", (req, res) => {
  console.log(req.body.data);
  let data = req.body.data;
  client.query(
    `INSERT INTO vehicles Values ('${data.Type_Id}','${data.Size_Id}','${data.Company_Id}');`
  );
  res.send("it worked!!!");
});
//http://localhost:4002/Get_Ride_data
const port = process.env.PORT || 4002;
app.listen(port, () => {
  initDb();
  console.log("Hosted: http://localhost:" + port);
});

// function SQLI_Checker(Value: any) {
//   var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
//   return format.test(String(Value));
// }
