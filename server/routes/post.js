import express from "express";
import expressValidator from "express-validator";
import auth from "../middleware/auth.js";
import postModel from '../models/post.js';
import userModel from '../models/user.js';
import commentModel from '../models/comment.js';
import multer from "multer";
import { storage, cloudinary } from "../cloudinary/cloudinary.js";

const router = express.Router();
const { check, validationResult } = expressValidator;
const upload = multer({ storage: storage });

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

router.post('/', [auth, upload.array('image', 5), 
    check('title', 'title is required').not().isEmpty() ],
    async (req, res) => { 
        const errors = validationResult(req);

        if (!req.body.imageLink && !req.files) {
            errors.errors.push({ msg: "image is required" });
        }
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let name, avatar;
        await userModel.findById(req.user.id).select('-password')
        .then(data => {
            name = data.name;
            avatar = data.avatar;
        })
        .catch(err => {
            return res.status(500).json({ errors: [{ msg: "server error finding user" }] });
        })
        
        const { title, imageLink } = req.body;

        const storeImages = [];
        if (req.files){
            req.files.map((file) => {
                storeImages.push({ url: file.path, fileName: file.filename });
            })
        }

        if (imageLink) {
            storeImages.push({ url: imageLink, fileName: "" });
        }

        const newPost = new postModel({
            title: title,
            images: storeImages,
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
        data.images.map((image) => {
            if (image.fileName) {
                cloudinary.uploader.destroy(image.fileName);
            }
        })
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
        const { text } = req.body;
        await postModel.findById(id)
        .then(data => {
            const newComment = new commentModel({
                text: text,
                user: req.user.id,
                name: data.name,
                avatar: data.avatar
            })
            newComment.save()
            .then(comment => {
                data.comments.unshift(comment.id);
                data.save();
                res.status(200).json(data);
            })
            .catch(err => {
                res.status(500).json({ errors: [{ msg: "server error saving comment" }] });
            })
        })
        .catch(err => {
            res.status(500).json({ errors: [{ msg: "server error adding comment" }] });
        }
    )
})

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    const { id, comment_id } = req.params;
    await postModel.findById(id)
    .then(data => {
        const comment = data.comments.find(comment => comment.toString() === comment_id);
        if (!comment) {
            return res.status(404).json({ errors: [{ msg: "comment not found" }] });
        }

        commentModel.findById(comment_id)
        .then(comment => {
            if (comment.user.toString() !== req.user.id) {
                return res.status(401).json({ errors: [{ msg: "user not authorized" }] });
            }
            comment.remove();
        })
        .catch(err => {
            res.status(500).json({ errors: [{ msg: "server error deleting comment" }] });
        })
            
        const removeIndex = data.comments.map(comment => comment.id).indexOf(comment_id);
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