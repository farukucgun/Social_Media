import schedule from 'node-schedule';
import postModel from '../models/post.js';
import { cloudinary } from "../cloudinary/cloudinary.js";

const purgedPostPercentage = 75;

const purgePosts = schedule.scheduleJob("* 3 * * *", async (req, res) => {
    console.log("purging posts");
    await postModel.find( { "date": {$gte: new Date().getTime() - (1 * 24 * 60 * 60 * 1000)} } ).sort({date:-1})
    .then(data => {
        console.log(data.length);
        const purgedPostCount = Math.floor(data.length * (purgedPostPercentage / 100));
        console.log(purgedPostCount);

        for (let i = 0; i < purgedPostCount; i++) {
            const leastLikedPost = data.reduce(
                (prev, current) => (prev.votes.upvotes.length - prev.votes.downvotes.length <= 
                    current.votes.upvotes.length - current.votes.downvotes.length) 
                ? prev : current);
    
            console.log(leastLikedPost.title);
            // leastLikedPost.images.map((image) => {     
            //     if (image.fileName) {
            //         cloudinary.uploader.destroy(image.fileName);
            //     }
            // })
            // leastLikedPost.remove();
        }
    })
    .catch(err => {
        console.log(err);
    })
});

export default purgePosts;