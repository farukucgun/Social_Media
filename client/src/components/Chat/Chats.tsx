import React from 'react';
import Chat from './Chat';

const Chats = () => {

    const allChats = [
        {id: 1, user: "user1"}, {id: 2, user: "user2"}, {id: 3, user: "user3"}
    ]

    return (
        <div>
            <h1>Chats</h1>
            {allChats.map(chat => <Chat key={chat.id} user={chat.user} />)}
        </div>
    );
}

export default Chats;