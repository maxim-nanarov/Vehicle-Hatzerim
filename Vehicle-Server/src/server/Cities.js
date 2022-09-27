const axios = require("axios");

axios
  .get(
    "https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&limit=10000"
  )
  .then(function (response) {
    // handle success
    let data = response.data.result.records;

    data.forEach((des) => {
      if (
        des.שם_מועצה === "בני שמעון" ||
        des.לשכה === "באר שבע                  "
      ) {
        console.log(des._id, des.שם_ישוב_לועזי, 1);
      } else {
        console.log(des._id, des.שם_ישוב_לועזי, 2);
      }
    });
  })
  .catch(function (error) {
    console.log("handle error");
    console.log(error);
  });
