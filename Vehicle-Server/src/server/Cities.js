const axios = require("axios");

axios
  .get(
    "https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&limit=10000"
  )
  .then(function (response) {
    // handle success
    let data = response.data.result.records;

    data.forEach(async (des) => {
      if (
        des.שם_מועצה === "בני שמעון" ||
        des.לשכה === "באר שבע                  "
      ) {
        console.log(des._id, des.שם_ישוב_לועזי, 1);
        await axios
          .post("https://vehicle-hatzerim.herokuapp.com/Destionaion_Data", {
            id: des.id,
            name: des.שם_ישוב_לועזי,
            score: 1,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        await axios
          .post("https://vehicle-hatzerim.herokuapp.com/Destionaion_Data", {
            data: {
              id: des.id,
              name: des.שם_ישוב_לועזי,
              score: 2,
            },
          })
          .then((res) => {
            console.log(res);
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
