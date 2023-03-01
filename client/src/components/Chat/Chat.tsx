import React from 'react';

const Chat = (props: {user: string}) => {
    return (
        <div>
            <h3>{props.user}: how you doin?</h3>
        </div>
    );
}

export default Chat;