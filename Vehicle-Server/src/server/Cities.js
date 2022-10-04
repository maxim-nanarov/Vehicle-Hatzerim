const axios = require("axios");

axios
  .get(
    "https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&limit=1277"
  )
  .then(function (response) {
    // handle success
    console.log(response.data.result.records);
    let data = response.data.result.records;

    data.forEach(async (des) => {
      if (
        des.שם_מועצה === "בני שמעון" ||
        des.לשכה === "באר שבע                  "
      ) {
        console.log(des._id, des.שם_ישוב_לועזי, 1);
        let Name = des.שם_ישוב_לועזי;
        let newName = Name.replace("'", "");
        await axios
          .post("http://localhost:4002/Destionaion_Data", {
            headers: {
              "Content-Type": "application/json",
            },
            Data: {
              id: des._id,

              name: newName,
              score: 1,
            },
          })
          .then((res) => {
            console.log("Worked V 1");
          })
          .catch((error) => {
            console.log("error =>");
            console.log(error.response);
          });
        //https://vehicle-hatzerim.herokuapp.com/
      } else {
        await axios
          .post("http://localhost:4002/Destionaion_Data", {
            headers: {
              "Content-Type": "application/json",
            },
            Data: {
              id: des._id,
              name: des.שם_ישוב_לועזי,
              score: 2,
            },
          })
          .then((res) => {
            console.log("Worked V 2");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  })
  .catch(function (error) {
    console.log("handle error");
    console.log(error);
  });
