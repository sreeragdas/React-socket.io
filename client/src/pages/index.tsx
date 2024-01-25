import './style.css';

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

export const Pages: React.FC = () => {
    const socket = io.connect('http://localhost:3001');
    const [chat, setChat] = useState('');
    const [rmsg, setRmsg]=useState('');

    const sendmsg = () => {
        console.log('hi button cl');
        socket.emit('message_send ', { message: `${chat}` });
    };

    useEffect(() => {
        socket.on('receive_message', (data) => {
    
            setRmsg(data.message)
        });
    }, [socket]);

    const handleInputChange = (event) => {
        setChat(event.target.value);
      };
    return (
        <div className='page'>
            <div>
                <input name='chat' value={chat} onChange={handleInputChange} placeholder='message...' />
                <button onClick={sendmsg}>Send</button>
                {rmsg ? <div>{chat.length != 0 ? chat : null}</div> : null}
                {chat ?  <div>{rmsg.length != 0 ? rmsg : null}</div> : null}
            </div>
        </div>
    );
};
