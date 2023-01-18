import React from "react";
import Carousel from 'react-bootstrap/Carousel';

import classes from "./PostContent.module.css";

interface postContentInterface {
    images: [
        {
            url: string;
            filename: string;
        }
    ];
}

const PostContent = (props: postContentInterface) => {

    const { images } = props;
    return (
        <Carousel interval={null} variant="dark" controls={images.length > 1 ? true : false}> 
            {images.map((image) => (
                <Carousel.Item key={image.filename ? image.filename : image.url}>
                    <img
                        className={classes.post_content}
                        src={image.url}
                        alt={image.filename}
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default PostContent;


