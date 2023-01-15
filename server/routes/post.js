import express from "express";
const router = express.Router();
import expressValidator from "express-validator";
const { check, validationResult } = expressValidator;
import auth from "../middleware/auth.js";

import postModel from '../models/post.js';
import userModel from '../models/user.js';

router.get('/', auth, async (req, res) => {
    await postModel.find( {} ).sort({date:-1})
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(500).json({ errors: [{ msg: "server error getting posts" }] });
    })
})

router.get('/:id', auth, async (req, res) => {    // different error messages when post is not found
    const { id } = req.params.id;
    await postModel.findById(id)
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(500).json({ errors: [{ msg: "server error getting post" }] });
    })
})

router.post('/', [auth, [
    check('title', 'title is required').not().isEmpty(),
    check('image', 'image is required').not().isEmpty()
    ]],
    async (req, res) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, image } = req.body;
        let name, avatar;
        
        const user = await userModel.findById(req.user.id).select('-password')
        .then(data => {
            name = data.name;
            avatar = data.avatar;
        })
        .catch(err => {
            return res.status(500).json({ errors: [{ msg: "server error finding user" }] });
        })
        
        const newPost = new postModel({
            title: title,
            image: image,
            user: req.user.id, 
            name: name, 
            avatar: avatar
        })

        await newPost.save()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            return res.status(500).json({ errors: [{ msg: "server error adding post" }] });
        })
})

router.delete('/:id', auth, async (req, res) => {
    const id = req.params.id;
    await postModel.findById(id)
    .then(data => {
        if (data.user.toString() !== req.user.id) {
            return res.status(401).json({ errors: [{ msg: "user not authorized" }] });
        }
        data.remove();
        res.status(200).json({ msg: "post removed" });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errors: [{ msg: "server error deleting post" }] });
    })
})

router.put('/upvote/:id', auth, async (req, res) => {
    const id = req.params.id;
    await postModel.findById(id)
    .then(data => {
        if (data.votes.upvotes.filter(upvote => upvote.user.toString() === req.user.id).length > 0) {
            const removeIndex = data.votes.upvotes.map(upvote => upvote.user.toString()).indexOf(req.user.id);
            data.votes.upvotes.splice(removeIndex, 1);
        }
        else if (data.votes.downvotes.filter(downvote => downvote.user.toString() === req.user.id).length > 0) {
            const removeIndex = data.votes.downvotes.map(downvote => downvote.user.toString()).indexOf(req.user.id);
            data.votes.downvotes.splice(removeIndex, 1);
        } 
        else {
            data.votes.upvotes.unshift({ user: req.user.id });
        }
        data.save();
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(500).json({ errors: [{ msg: "server error upvoting post" }] });
    }
)})

router.put('/downvote/:id', auth, async (req, res) => {
    const id = req.params.id;
    await postModel.findById(id)
    .then(data => {
        if (data.votes.downvotes.filter(downvote => downvote.user.toString() === req.user.id).length > 0) {
            const removeIndex = data.votes.downvotes.map(downvote => downvote.user.toString()).indexOf(req.user.id);
            data.votes.downvotes.splice(removeIndex, 1);
        }
        else if (data.votes.upvotes.filter(upvote => upvote.user.toString() === req.user.id).length > 0) {
            const removeIndex = data.votes.upvotes.map(upvote => upvote.user.toString()).indexOf(req.user.id);
            data.votes.upvotes.splice(removeIndex, 1);
        }
        else {
            data.votes.downvotes.unshift({ user: req.user.id });
        }
        data.save();
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(500).json({ errors: [{ msg: "server error downvoting post" }] });
    }
)})

router.post('/comment/:id', [auth, [
    check('text', 'text is required').not().isEmpty()
    ]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id = req.params.id;
        await postModel.findById(id)
        .then(data => {
            const newComment = {
                text: req.body.text,
                user: req.user.id
            }
            data.comments.unshift(newComment);
            data.save();
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ errors: [{ msg: "server error commenting on post" }] });
        }
)})

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    const id = req.params.id;
    const comment_id = req.params.comment_id;
    await postModel.findById(id)
    .then(data => {
        const comment = data.comments.find(comment => comment.id === comment_id);
        if (!comment) {
            return res.status(404).json({ errors: [{ msg: "comment not found" }] });
        }
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ errors: [{ msg: "user not authorized" }] });
        }
        const removeIndex = data.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        data.comments.splice(removeIndex, 1);
        data.save();
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(500).json({ errors: [{ msg: "server error deleting comment" }] });
    }
)})

router.put('/comment/:id/:comment_id', [auth, [
    check('text', 'text is required').not().isEmpty()
    ]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id, comment_id } = req.params;
        // const id = req.params.id;
        // const comment_id = req.params.comment_id;
        await postModel.findById(id)
        .then(data => {
            const comment = data.comments.find(comment => comment.id === comment_id);
            if (!comment) {
                return res.status(404).json({ errors: [{ msg: "comment not found" }] });
            }
            if (comment.user.toString() !== req.user.id) {
                return res.status(401).json({ errors: [{ msg: "user not authorized" }] });
            }
            comment.text = req.body.text;
            data.save();
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ errors: [{ msg: "server error editing comment" }] });
        }
)})

export default router;