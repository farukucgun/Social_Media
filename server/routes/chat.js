import express from "express";
import auth from "../middleware/auth.js";
import userModel from "../models/user.js";

const router = express.Router();

router.get('/', auth, async (req, res) => {
    const allUsers = await userModel.find({ _id: { $ne: req.user.id } });
    res.status(200).json(allUsers);
})    

router.post('/', auth, async (req, res) => {
    console.log(req.user.id);
})

router.get('/:id', auth, async (req, res) => {
    const user = await userModel.findById(req.params.id);
    res.status(200).json(user);
})



export default router;

