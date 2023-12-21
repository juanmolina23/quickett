require("dotenv").config();
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const passportConfig = require("./passport.config");

//Routes
const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");
const classificationRoutes = require("./routes/classificationRoutes");
const laborRoutes = require("./routes/laborRoutes");
const materialRoutes = require("./routes/materialRoutes");
const shopRoutes = require("./routes/shopRoutes");
const statusRoutes = require("./routes/statusRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const typeRoutes = require("./routes/typeRoutes");
const itemRoutes = require("./routes/itemRoutes");

//Controllers
const userController = require("./controllers/UserController");

//Environmental Variables
const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT;
const SECRET = process.env.SECRET;

//Express App Initialized
const app = express();

//Database Connection
mongoose.connect(DATABASE_URL);
const database = mongoose.connection;

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: SECRET,
    cookie: { maxAge: 60 * 1000 * 60, httpOnly: true, signed: true },
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: DATABASE_URL,
      ttl: 60 * 1000 * 60,
    }),
  })
);

app.use(cookieParser(SECRET));
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

//Route Middleware
app.use("/api", userRoutes);
app.use("/api/role", userController.isAuth, roleRoutes);
app.use("/api/classification", userController.isAuth, classificationRoutes);
app.use("/api/item", userController.isAuth, itemRoutes);
app.use("/api/labor", userController.isAuth, laborRoutes);
app.use("/api/material", userController.isAuth, materialRoutes);
app.use("/api/shop", userController.isAuth, shopRoutes);
app.use("/api/status", userController.isAuth, statusRoutes);
app.use("/api/ticket", userController.isAuth, ticketRoutes);
app.use("/api/type", userController.isAuth, typeRoutes);

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
