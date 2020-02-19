const mongoose = require("mongoose");

const DishModel = require("./models/dishes");

const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

connect.then(db => {
  console.log("Connected to the MongoDB server");

  const newDish = DishModel({
    name: "Pizza Hut",
    description: "The best pizza in the world!"
  });

  newDish
    .save()
    .then(dish => {
      console.log(dish);

      return DishModel.find({}).exec();
    })
    .then(dishes => {
      console.log(dishes);

      return DishModel.remove({});
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch(err => {
      console.log(err);
    });
});
