import React, {useState, useEffect, useContext} from 'react';
import axios from "axios";
import Post from './Post';
import classes from "./Posts.module.css";
import NewPost from '../Post/NewPost';
import CreatePostContext from '../../context/CreatePostContext';

interface postInterface {
    _id: string;
    title: string;
    image: string;
    vote: number;
    user: string;
}

const Posts = () => {

    const CreatePostCtx = useContext(CreatePostContext);

    const [posts, setPosts] = useState<postInterface[]>([]);

    const addPostHandler = (post: postInterface): void => {
        setPosts((prevPosts: postInterface[]) => {
            return [post, ...prevPosts];
        })
    }

    useEffect(() => {
        const fetchPosts = async () => {
            
            await axios.get("http://localhost:5000/post")
            .then(data => {
                setPosts(data.data.data);
            })
            .catch(err => {
                console.log(err.message)
                console.log("error getting posts")
            })   
        }

        fetchPosts().catch((err) => {
            console.log("couldn't fetch posts");
            console.log(err);
        });
    }, []);

    return (
        <div className={classes.feed}>
            {CreatePostCtx.inCreatePage && <NewPost onAddPost={addPostHandler}/>}
            <ul className={classes.all_posts}>
                {posts.map((post: postInterface) => (
                    <Post
                        user={post.user}
                        key={post._id} 
                        id={post._id}
                        title={post.title} 
                        image={post.image}
                        vote={post.vote}
                    />
                ))}
            </ul>
        </div>
    );
}

export default Posts;