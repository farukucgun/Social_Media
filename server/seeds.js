import mongoose from "mongoose";
import dotenv from "dotenv";

import postModel from "./models/post.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log(`Listening on port: ${PORT}`);
    })
    .catch((err) => {
        console.log("Couldn't connect to mongodb");
        console.log(err.message);
    })

const seedPosts = [
    {
        title: "Predicting The FIFA World Cup 2022 With a Simple Model using Python",
        image: "https://miro.medium.com/max/828/1*-0T6gsOd4XaTegeyak0rdQ.webp",
        user: "63a308823df22ff9d821debe",
        name: "Faruk",
        avatar: "//www.gravatar.com/avatar/a53bf39f67666698bc3241cfcef4db5c?s=200&r=pg&d=mm"
    },
    {
        title: "How to Write a Proper README.md For Your Project on GitHub",
        image: "https://miro.medium.com/max/786/1*NYiA-lZD9Py9BjgpGb66Zw.webp",
        user: "63b18d99fd6b481448f552fd",
        name: "faruk2",
        avatar: "//www.gravatar.com/avatar/4c977f82733aad411d2b3ac4e0768d93?s=200&r=pg&d=mm"
    },
    {
        title: "How To Calibrate a Camera Using Python And OpenCV",
        image: "https://miro.medium.com/max/828/0*wlveL3C-F6gkK6X-",
        user: "63b18d99fd6b481448f552fd",
        name: "faruk2",
        avatar: "//www.gravatar.com/avatar/4c977f82733aad411d2b3ac4e0768d93?s=200&r=pg&d=mm"
    },
    {
        title: "Top free Heroku alternatives for every case!",
        image: "https://miro.medium.com/max/828/1*FSkUtK8pYPBSNeaVotU4Ug.webp",
        user: "63a308823df22ff9d821debe",
        name: "Faruk",
        avatar: "//www.gravatar.com/avatar/a53bf39f67666698bc3241cfcef4db5c?s=200&r=pg&d=mm"
    },
    {
        title: "LeetCode — 21. Merge Two Sorted Lists",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGylK8VIVUlOfK0cVXVdpDwSvP0WUMpJ6HMg&usqp=CAU",
        user: "63b18d99fd6b481448f552fd",
        name: "faruk2",
        avatar: "//www.gravatar.com/avatar/4c977f82733aad411d2b3ac4e0768d93?s=200&r=pg&d=mm"
    },
    {
        title: "How to Get HTML5 Local Storage Keys with JavaScript?",
        image: "https://miro.medium.com/max/828/0*8e4jboUliVh-QhOS",
        user: "63a308823df22ff9d821debe",
        name: "Faruk",
        avatar: "//www.gravatar.com/avatar/a53bf39f67666698bc3241cfcef4db5c?s=200&r=pg&d=mm"
    }
]

const seedDB = async () => {
    await postModel.deleteMany({});
    await postModel.insertMany(seedPosts);
}

seedDB().then(() => {
    mongoose.connection.close();
})
