import path from "path";
import express, { Express } from "express";
import cors from "cors";
import { json } from "body-parser";
import { client } from "./data";

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
  client.query("SELECT * FROM Rides;", (err: Error, response: any) => {
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
      `INSERT INTO Users (user_id, user_name, user_surname, user_home_phone,user_work_phone,user_personal_phone,is_admin)
			VALUES ('${Number(req.body.vals[0]) /*User ID*/}', '${
        req.body.vals[1] /*User name*/
      }', '${req.body.vals[2] /*User surname*/}', '${Number(
        req.body.vals[3] /*User phone number*/
      )}', ${Number(req.body.vals[4]) /*User work number*/}, ${Number(
        req.body.vals[5]
      )},${Boolean(req.body.vals[6])});`,
      (err: Error, response: any) => {
        if (err) throw err;
        res.send(response);
      }
    );
  } else {
    res.send("SQLi? how about get f*cked m8");
  }
});

app.post("/Ride_data", (req, res) => {
  var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (!format.test(String(req.body.vals[0]))) {
    client.query(
      `INSERT INTO Ride (ride_id, starting_date, finishing_date, will_take_riders, vehicle_plate_num, user_id, destination_id,reason_id)
			VALUES ('${req.body.vals[0]}', ${Number(req.body.vals[1])}, ${Number(
        req.body.vals[2]
      )}, '${req.body.vals[3]}', ${Number(req.body.vals[4])}, ${Number(
        req.body.vals[5]
      )});`,
      (err: Error, response: any) => {
        if (err) throw err;
        res.send(response);
      }
    );
  } else {
    res.send("SQLi? how about get f*cked m8");
  }
});

// app.get("/add_sock", (_req, res) => {
//   res.sendFile(path.join(root, "add.html"));
// });

// app.get("/edit_sock", (_req, res) => {
//   res.sendFile(path.join(root, "edit.html"));
// });

// app.post("/edit_submit", (req, res) => {
//   let values = req.body.vals;
//   console.log(values);
//   var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
//   if (!format.test(String(values[0]))) {
//     client.query(
//       `Update socks SET model='${values[0]}', quantity=${Number(
//         values[1]
//       )},size=${Number(values[2])},manufacturing_year = '${
//         values[3]
//       }',location_id=${Number(values[4])}, officer_id= ${Number(
//         values[5]
//       )} WHERE sock_id=${values[6]};`,
//       (err: Error, _response: any) => {
//         if (err) throw err;
//         res.send(`edited sock-id: ${values[5]}`);
//       }
//     );
//   } else {
//     res.send("No SQLi, f*ck off m8");
//   }
// });

// app.post("/remove", (req, res) => {
//   let sock_id = req.body.id;
//   var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
//   if (!format.test(String(sock_id))) {
//     client.query(
//       `DELETE FROM locations_history WHERE sock_id=${sock_id};DELETE FROM socks WHERE sock_id=${sock_id};`,
//       (err: Error, _response: any) => {
//         if (err) throw err;
//         res.end(`Removed ${sock_id}`);
//       }
//     );
//   } else {
//     res.send("No SQLi, f*ck off m8");
//   }
// });

// app.get("/locations", (_req, res) => {
//   client.query(
//     "SELECT base_name,location_id FROM locations",
//     (err: Error, response: any) => {
//       if (err) throw err;
//       res.status(200).json(response.rows);
//     }
//   );
// });

// app.get("/officers", (_req, res) => {
//   client.query(
//     "SELECT officer_id, name FROM officers",
//     (err: Error, response: any) => {
//       if (err) throw err;
//       res.status(200).json(response.rows);
//     }
//   );
// });

// app.get("*", (_req, res) => {
//   res.sendFile(path.join(root, "index.html"));
// });

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Hosted: http://localhost:" + port);
});
