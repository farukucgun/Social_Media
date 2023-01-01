import express from "express";
import { check, validationResult } from 'express-validator';
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import userModel from '../models/user.js';

const router = express.Router();
dotenv.config();


router.post('/', [
    check('name', 'User name is required ').not().isEmpty(),
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'Please enter a password with at least 6 characters').isLength({min: 6})
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.send({status: 400, errors: errors.array()});
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        const user = await userModel.findOne({email: email});

        if (user) {
            // return res.send({status: 400, errors: [{ msg: "User with this email already exists" }]});
            return res.status(400).json({ errors: [{ msg: "User with this email already exists" }] });
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        const newUser = new userModel({
            name: name,
            email: email,
            avatar: avatar,
            password: password
        })

        const salt = await bcrypt.genSalt(10);

        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save()
        .catch(err => {
            // return res.send({status: 500, errors: [{ msg: "Server error creating user" }]});
            return res.status(500).json({ errors: [{ msg: "Server error creating user" }] });
        })

        const payload = {
            user : { id: newUser.id }
        }

        jwt.sign(payload, process.env.JWT_SECRET, 
            { expiresIn: 360000 }, (err, token) => { // might want to change this later
                if (err) throw err;
                else res.send({ token }) // do I need the user id too
        });
    }
)

export default router;