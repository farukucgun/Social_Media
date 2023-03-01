import express from "express";
import postModel from '../models/post.js';
import userModel from '../models/user.js';
import profileModel from '../models/profile.js';
import auth from '../middleware/auth.js';


const router = express.Router();

router.get('/:name', auth, async (req, res) => {
    await userModel.find( {name: req.params.name} ).select('-password')
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(500).json({ errors: [{ msg: "server error finding profile" }] });
    })
})
