const mongoose = require("mongoose");

const DishModel = require("./models/dishes");

const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

connect.then(db => {
  console.log("Connected to the MongoDB server");

  DishModel.create({
    name: "Pizza Hut",
    description: "The best pizza in the world!"
  })
    .then(dish => {
      console.log(dish);

      dish.comments.push({
        rating: 5,
        comment: "This is a test comment",
        author: "Joe Doe"
      });

      return dish.save();
    })
    .then(dish => {
      return DishModel.findByIdAndUpdate(
        dish._id,
        { $set: { description: "Updated test" } },
        { new: true }
      ).exec();
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
