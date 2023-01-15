import React, { useState } from "react"
import Modal from "../../UI/Modal";
import upload_background from "../../data/upload_background.png";
import { useAppDispatch } from "../../store";
import { changeInCreatePage } from "../../features/postSlice";
import { createPostAsync } from "../../features/postSlice";

import classes from "./NewPost.module.css";

// add multiple images/videos
// autocomplete 

const NewPost = () => {
    const dispatch = useAppDispatch();
    const [userTitle, setUserTitle] = useState(""); 
    const [image, setImage] = useState(upload_background); 

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload = {
            title: userTitle,
            image: image
        }
        dispatch(createPostAsync(payload));

        setUserTitle('');
        setImage(upload_background);
        dispatch(changeInCreatePage());
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

    const inCreatePageHandler = () => {
        dispatch(changeInCreatePage());
    }

    return (
        <Modal onClose={inCreatePageHandler}>
            <form onSubmit={submitHandler} className={classes.post_form}>  
                <button type="button" onClick={inCreatePageHandler}>X</button>
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