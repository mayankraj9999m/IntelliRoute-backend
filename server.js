import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./db_connection.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { userRouter } from "./routes/user.route.js";
import { locationRouter } from "./routes/location.route.js";
import { shuttleRouter } from "./routes/shuttle.route.js";
import { rideRequestRouter } from "./routes/rideRequest.route.js";
dotenv.config();
import cors from "cors";

// Connect to mongo db database via mongoose
connectDB();

const app = express();

const corsOptions = {
    origin: function (origin, callback) {
        // Check if the origin is defined (not a same-origin request)
        // and if you want to perform any additional validation.
        // For this case, we simply reflect the origin for any cross-origin request.
        if (origin) {
            callback(null, origin);
        } else {
            callback(null, false); // For same-origin requests
        }
    },
    credentials: true, // This enables the `Access-Control-Allow-Credentials` header
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // You can restrict these if needed
    allowedHeaders: ["Content-Type", "Authorization"], // Specify required headers
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/users", userRouter); // User routes
app.use("/api/locations", locationRouter); // Location routes
app.use("/api/shuttles", shuttleRouter); // Shuttles routes
app.use("/api/rides", rideRequestRouter); // Ride request routes
app.use(errorMiddleware);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});
