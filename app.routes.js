const userRouter = require("./routes/user.routes");
const orderRouter = require("./routes/order.routes");

exports.addRoutes = async (app) => {
  // send api running message
  app.get("/", (req, res) => res.send("API is running"));

  app.use("/api/user", userRouter);
  app.use("/api/order", orderRouter);
};
