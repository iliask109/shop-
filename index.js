const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const orderRouter = require("./routes/order");
const productRouter = require("./routes/product");

const cookieParser = require("cookie-parser");
const errorMiddleware = require("./utils/errorMiddleware");

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

const connectDatabase = () => {
	mongoose
		.connect(process.env.DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then((con) => {
			console.log(`MongoDB Database connected`);
		});
};

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/", productRouter);
app.use("/api/orders", orderRouter);

app.use(errorMiddleware);

app.listen(process.env.PORT || 8800, () => {
	connectDatabase();
	console.log("content to backend");
});
