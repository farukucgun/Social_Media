import express from "express";
const router = express.Router();

import postModel from '../models/post.js';

router.get('/', async (req, res) => {
    const posts = await postModel.find( {} ).sort({date:-1})
    .then(data => {
        res.json({status: 'ok', data})
    })
    .catch(err => {
        res.json({status: 'error', error: "Couldn't find posts"})
    })
})

router.post('/', async (req, res) => {
    const { title, image, vote, user } = req.body;
    const newPost = new postModel({
        title: title,
        image: image,
        vote: vote,
        user: user 
    })
    await newPost.save()
    .then(data => {
        res.json({status: 'ok', data})
    })
    .catch(err => {
        res.json({status: 'error', error: "Couldn't add new post"})
    })
})

// router.delete('/:id', async (req, res) => {
//     const { id } = req.params;
//     const deletedLink = await linkModel.findByIdAndDelete(id)
//     .then(data => {
//         res.json({status: 'ok', data})
//     })
//     .catch(err => {
//         res.json({status: 'error', error: "Couldn't delete link"})
//     })
// })

export default router;