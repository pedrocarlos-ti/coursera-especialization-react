const express = require("express");
const morgan = require("morgan");
const dishRoutes = require("./routes/dishRoutes");
const promoRoutes = require("./routes/promoRouter");
const leaderRoutes = require("./routes/leaderRoutes");

const hostname = "localhost";
const port = 3000;

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.use("/dishes", dishRoutes);
app.use("/promotions", promoRoutes);
app.use("/leaders", leaderRoutes);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
