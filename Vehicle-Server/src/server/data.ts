import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
export const client = new Client({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

export async function initDb() {
  await client.query(
    `CREATE TABLE IF NOT EXISTS Users(
          User_Id SERIAL PRIMARY KEY,
          User_Name TEXT NOT NULL,
          User_Surname TEXT NOT NULL,
          User_Home_phone INTEGER NOT NULL,
          User_Work_phone INTEGER NOT NULL,
          User_Personal_phone INTEGER NOT NULL,
          Is_Admin BOOLEAN NOT NULL
      );`
  );
  //insert Into Users (user_id, user_name, user_surname, user_home_phone,user_work_phone,user_personal_phone,is_admin) Values(1, maxim, nanarov, 0, 0,0585599369,True)
  await client.query(
    `CREATE TABLE IF NOT EXISTS Reasons(
      Reason_ID SERIAL PRIMARY KEY,
      Reason_Name TEXT NOT NULL,
      Reason_Score INTEGER NOT NULL
      );`
  );

  await client.query(
    `CREATE TABLE IF NOT EXISTS Destinations(
      Destination_ID SERIAL PRIMARY KEY,
      Destination_Name TEXT NOT NULL,
      Destination_Score INTEGER NOT NULL
      );`
  );

  await client.query(
    `CREATE TABLE IF NOT EXISTS Type_Vehicle(
      Type_ID SERIAL PRIMARY KEY,
      Type_Name TEXT NOT NULL
      );`
  );

  await client.query(
    `CREATE TABLE IF NOT EXISTS Vehicle_Size(
          Size_ID SERIAL PRIMARY KEY,
          Size_Name TEXT NOT NULL,
          Size_Capacity INTEGER NOT NULL
          );`
  );

  // await client.query(
  //   `CREATE TABLE IF NOT EXISTS Vehicle_Company(
  //     Company_ID SERIAL PRIMARY KEY,
  //     Company_Name TEXT NOT NULL);`
  // );

  await client.query(
    `CREATE TABLE IF NOT EXISTS Vehicles(
                  Vehicle_Plate_Num SERIAL PRIMARY KEY,
                  Type_ID INTEGER NOT NULL,
                  Size_ID INTEGER NOT NULL,
                  CONSTRAINT fk_Type FOREIGN KEY (Type_ID)
                  REFERENCES Type_Vehicle(Type_ID),
                  CONSTRAINT fk_Size FOREIGN KEY (Size_ID)
                  REFERENCES Vehicle_Size(Size_ID)
                  );`
  );
  await client.query(
    `CREATE TABLE IF NOT EXISTS Ride(
                          Ride_Id SERIAL PRIMARY KEY,
                          Starting_Date TIMESTAMP NOT NULL,
                          Finishing_Date TIMESTAMP NOT NULL,
                          Will_Take_Riders BOOLEAN NOT NULL,
                          Vehicle_Plate_Num INTEGER NOT NULL,
                          User_ID INTEGER NOT NULL,
                          Destination_ID INTEGER NOT NULL,
                          Reason_ID INTEGER NOT NULL,
                          CONSTRAINT FK_Vehicle FOREIGN KEY (Vehicle_Plate_Num)
                          REFERENCES Vehicles(Vehicle_Plate_Num),
                          CONSTRAINT fk_User FOREIGN KEY (User_ID)
                          REFERENCES Users(User_ID),
                          CONSTRAINT fk_Destination FOREIGN KEY (Destination_ID)
                          REFERENCES Destinations(Destination_ID),
                          CONSTRAINT fk_Reasons FOREIGN KEY (Reason_ID)
                          REFERENCES Reasons(Reason_ID)
                      );`
  );
  console.log("create");
}

initDb();
