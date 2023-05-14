const mongoose = require("mongoose");
const mongoURl =
  "mongodb://ajsaini9582:ajsaini@ac-defodnx-shard-00-00.ecokusc.mongodb.net:27017,ac-defodnx-shard-00-01.ecokusc.mongodb.net:27017,ac-defodnx-shard-00-02.ecokusc.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-izrppz-shard-0&authSource=admin&retryWrites=true&w=majority";

const mongoDB = async () => {
  mongoose.set("strictQuery", true);
  mongoose.connect(mongoURl, (err, result) => {
    if (err) console.log("__", err);
    else {
      console.log("connected");
      const fetch_data = mongoose.connection.db.collection("food_items");
      fetch_data.find({}).toArray(async function (err, data) {
        const foodCategory = await mongoose.connection.db.collection(
          "foodCategory"
        );
        foodCategory.find({}).toArray(function (err, carData) {
          if (err) console.log(err);
          else {
            global.food_items = data;
            global.foodCategory=carData;
          }
        });
      });
    }
  });
}

module.exports = mongoDB;
