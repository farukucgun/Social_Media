import React, { useState, useContext } from "react"
import axios from "axios";
import classes from "./NewPost.module.css";
import Modal from "../../UI/Modal";
import upload_background from "../../data/upload_background.png";
import CreatePostContext from '../../context/CreatePostContext';

// add multiple images/videos
// autocomplete
// accept videos

interface postInterface {
    _id: string;
    title: string;
    image: string;
    vote: number;
    user: string;
}

const NewPost = (props: {onAddPost: (data: postInterface) => void}) => {

    const CreatePostCtx = useContext(CreatePostContext);

    const [userTitle, setUserTitle] = useState(""); 
    const [image, setImage] = useState(upload_background); 

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const postData = {
            title: userTitle,
            image: image,
            user: "F@ruk"
        }

        await axios.post('http://localhost:5000/post', postData)
        .then((data) => {
            props.onAddPost(data.data.data);
            console.log("added the post");
        })
        .catch((err) => {
            console.log("couldn't add the post");
            console.log(err.message);
        });

        setUserTitle('');
        setImage(upload_background);
        CreatePostCtx.changeInCreatePage();
    }

    const commentChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserTitle(event.target.value);
    }

    const uploadImageHandler = (event: any) => {
        if(event.target.files.length > 0){
            const src = URL.createObjectURL(event.target.files[0]);
            setImage(src);
        }
    }

    const imageLinkHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImage(event.target.value);
    }

    return (
        <Modal onClose={CreatePostCtx.changeInCreatePage}>
            <form onSubmit={submitHandler} className={classes.post_form}>  
                <button type="button" onClick={CreatePostCtx.changeInCreatePage}>X</button>
                <input 
                    type="text" 
                    onChange={commentChangeHandler} 
                    placeholder='what are you thinking?'
                    value={userTitle}
                />
                <input 
                    type="file" 
                    name="img" 
                    accept="image/png, image/jpg" 
                    onChange={uploadImageHandler}
                />
                <input 
                    type="text" 
                    onChange={imageLinkHandler}
                    placeholder='or, enter link of an image'
                    value={image}
                />
                <div className={classes.image_container}>
                    <img 
                        src={image ? image : upload_background} 
                        alt="post_to_upload"
                        className={classes.display_image} 
                        id="display_image"
                    />
                </div>
                <button type='submit' className={classes.submit}>Create Post</button>
            </form>
        </Modal>
    );
}

export default NewPost;