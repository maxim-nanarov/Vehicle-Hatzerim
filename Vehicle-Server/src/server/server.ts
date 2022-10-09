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
  let data = req.body.data;
  client.query(
    `SELECT * FROM Users WHERE user_id = ${data};`,
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
//TO DO: 4 table join request
//SELECT * FROM ((vehicles INNER JOIN vehicle_company ON vehicles.company_id = vehicle_company.company_id) INNER JOIN type_vehicle ON vehicles.type_id = type_vehicle.type_id ) INNER JOIN vehicle_size ON vehicles.size_id = vehicle_size.size_id;
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
  const data = req.body.formData;
  console.log(data);
  res.send(data);
  //insert into ride values ('1','2022-09-29 05:40:35','2022-09-29 13:30:00','f',0,0,0,0);
  var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (!format.test(String(req.body.vals[0]))) {
    client.query(
      `INSERT INTO ride VALUES (DEFAULT,'${req.body.StartingDate}','${req.body.EndingDate}','${data.Will_Take_Riders}','0','0','0','0');`,
      (err: Error, response: any) => {
        if (err) throw err;
        res.send(response);
      }
    );
  } else {
    res.send("SQLi? how about no");
  }
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

const port = process.env.PORT || 4002;
app.listen(port, () => {
  initDb();
  console.log("Hosted: http://localhost:" + port);
});

// function SQLI_Checker(Value: any) {
//   var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
//   return format.test(String(Value));
// }
