import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import postRoute from "./routes/post.js";
import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";

const app = express();
dotenv.config();
mongoose.set('strictQuery', false);

app.use(express.urlencoded({ limit:"30mb", extended: true }));
app.use(express.json({ limit:"30mb", extended: true }));
app.use(cors());


app.use("/post", postRoute);
app.use("/user", userRoute);
app.use('/auth', authRoute);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        })
    })
    .catch((err) => {
        console.log("Couldn't connect to mongodb");
        console.log(err.message);
    })


