import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import postRoute from "./routes/post.js";

const app = express();
dotenv.config();

app.use(express.urlencoded({ limit:"30mb", extended: true }));
app.use(express.json({ limit:"30mb", extended: true }));
app.use(cors());

app.get("/test", (req, res) => {
    res.send("testing connection");
})

app.use("/post", postRoute);

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


