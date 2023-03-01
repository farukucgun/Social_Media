import React, { useState } from "react"
import Modal from "../../UI/Modal";
import upload_background from "../../data/upload_background.png";
import { useAppDispatch } from "../../store";
import { changeInCreatePage } from "../../features/postSlice";
import { createPostAsync } from "../../features/postSlice";

import classes from "./NewPost.module.css";

/**
 * Todo: form should accept multiple videos
 * Todo: customize the file picker
 */

const NewPost = () => {         
    const dispatch = useAppDispatch();
    const [userTitle, setUserTitle] = useState(""); 
    const [file, setFile] = useState([]);
    const [fileLink, setFileLink] = useState("");
    const [imageLink, setImageLink] = useState("");             

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload = {
            title: userTitle,
            image: file,
            imageLink: imageLink
        }
        dispatch(createPostAsync(payload));

        setUserTitle('');
        setFile([]);
        setFileLink('');
        setImageLink('');
        dispatch(changeInCreatePage());
    }

    const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserTitle(event.target.value);
    }

    const uploadImageHandler = (event: any) => {
        if(event.target.files.length > 0){
            setFile(event.target.files);
            setFileLink(URL.createObjectURL(event.target.files[0]));
        }
    }

    const imageLinkHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImageLink(event.target.value);
    }

    const inCreatePageHandler = () => {
        dispatch(changeInCreatePage());
    }

    return (
        <Modal onClose={inCreatePageHandler}>
            <form onSubmit={submitHandler} className={classes.post_form} >  
                <button 
                    type="button" 
                    onClick={inCreatePageHandler}
                    className={classes.close_button} 
                >
                    X
                </button>
                <input 
                    type="text" 
                    onChange={titleChangeHandler} 
                    placeholder='what are you thinking?'
                    value={userTitle}
                    className={classes.input}
                />
                <input                  
                    type="file"     
                    name="image" 
                    accept="image/png, image/jpg" 
                    onChange={uploadImageHandler}
                    multiple={true}
                    className={classes.input}
                />
                <input 
                    type="text" 
                    onChange={imageLinkHandler}
                    placeholder='or, enter link of an image'
                    value={imageLink}
                    className={classes.input}
                />
                <div className={classes.image_container}>
                    <img 
                        src={imageLink ? imageLink : (fileLink ? fileLink : upload_background)} // might want to change this
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