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

app.post("/User_data", (req, res) => {
  var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (!format.test(String(req.body.vals[0]))) {
    client.query(
      `INSERT INTO Users (user_id, user_name, user_surname, user_home_phone, user_work_phone, user_personal_phone, is_admin)
			VALUES ('${Number(req.body.vals[0]) /*User ID*/}', '${
        req.body.vals[1] /*User name*/
      }', '${req.body.vals[2] /*User surname*/}', '${Number(
        req.body.vals[3] /*User phone number*/
      )}', ${Number(req.body.vals[4]) /*User work number*/}, ${Number(
        req.body.vals[5] /*User personal number*/
      )},${Boolean(req.body.vals[6])});`,
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
  console.log(req);
  console.log(res);
  client.query(
    `INSERT INTO Destinations
  	VALUES (${Number(req.body.vals[0])}, ${req.body.vals[1]},1);`,
    (err: Error, response: any) => {
      if (err) throw err;
      res.send(response);
    }
  );
});

app.post("/Add_Vehicle", (req, res) => {
  console.log(req.body.data);
  let data = req.body.data;
  client.query(
    `INSERT INTO vehicles Values (DEFAULT,${data.Type_Id},${data.Size_Id},${data.Company_Id});`
  );
  res.send("req");
});

const port = process.env.PORT || 4002;
app.listen(port, () => {
  initDb();
  console.log("Hosted: http://localhost:" + port);
});
