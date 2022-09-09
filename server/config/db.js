const mongoose = require("mongoose");

const Connect = async () => {
  return await mongoose.connect(
    "mongodb+srv://" +
      process.env.DB_USER +
      ":" +
      process.env.DB_PASS +
      "@cluster0.dph19as.mongodb.net"
  );
};

Connect()
  .then((res) => {
    console.log("Connection avec mongoDB réussi");
  })
  .catch((err) => {
    console.log(err);
  });
