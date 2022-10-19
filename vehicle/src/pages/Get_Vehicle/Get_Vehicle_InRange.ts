// a function that will be the base for the rest of this page.
export function If_In_Range(start, finish, date) {
  return !(date >= start && date <= finish);
}
//Now it occured to me that vehicle with
//more then one ride may return that
//it is availabe because the function checks
//every ride individually.
//
//theres a need to gather the times and calculate them all together.
export function If_Vehicle_availabe_inRange(
  RideTable: any,
  new_Start_Date: Date,
  new_Finish_Date: Date
) {
  let possible_Vehicles: Array<number>[] = [];
  RideTable.forEach((ride) => {
    if (
      (If_In_Range(ride.starting_date, ride.finishing_date, new_Start_Date),
      If_In_Range(ride.starting_date, ride.finishing_date, new_Finish_Date))
    ) {
      possible_Vehicles.push(ride.vehicle_plate_num);
    } else {
      for (let i = 0; i < possible_Vehicles.length; i++) {
        if (ride.vehicle_plate_num === possible_Vehicles[i]) {
          possible_Vehicles[i].pop();
        }
      }
    }
  });
  if (possible_Vehicles[0] !== undefined) {
    return possible_Vehicles[0];
  } else {
    return undefined;
  }
}
