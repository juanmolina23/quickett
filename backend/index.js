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
const authRoutes = require("./routes/authRoutes");
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
const authController = require("./controllers/AuthController");

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
    cookie: { maxAge: 60 * 1000, httpOnly: true, signed: true },
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
app.use("/api/auth", authRoutes);
app.use("/api/user", authController.isAuth, userRoutes);
app.use("/api/role", authController.isAuth, roleRoutes);
app.use("/api/classification", authController.isAuth, classificationRoutes);
app.use("/api/item", authController.isAuth, itemRoutes);
app.use("/api/labor", authController.isAuth, laborRoutes);
app.use("/api/material", authController.isAuth, materialRoutes);
app.use("/api/shop", authController.isAuth, shopRoutes);
app.use("/api/status", authController.isAuth, statusRoutes);
app.use("/api/ticket", authController.isAuth, ticketRoutes);
app.use("/api/type", authController.isAuth, typeRoutes);

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
