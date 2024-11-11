import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ChatWindow = (props) => {
   const [messageInput, setMessageInput] = useState('');
   const messageWindowRef = useRef(null);
   const [messageList, setMessageList] = useState([]);

   const fetchMessageList = async () => {
      try {
         const response = await axios.get(`http://localhost:8000/messages/${props.complaintId}`);
         setMessageList(response.data);
      } catch (error) {
         console.error('Error fetching messages:', error);
      }
   };

   useEffect(() => {
      fetchMessageList(props.complaintId, setMessageList);
   }, [props.complaintId]);

   useEffect(() => {
      scrollToBottom();
   }, [messageList]);

   const sendMessage = async () => {
      try {
         let data = {
            name: props.name,
            message: messageInput,
            complaintId: props.complaintId
         };
         const response = await axios.post('http://localhost:8000/messages', data);
         setMessageList([...messageList, response.data]);
         setMessageInput('');
         fetchMessageList();
      } catch (error) {
         console.error('Error sending message:', error);
      }
   };

   const scrollToBottom = () => {
      if (messageWindowRef.current) {
         messageWindowRef.current.scrollTop = messageWindowRef.current.scrollHeight;
      }
   };

   return (
      <>
         <div className="chat-container" style={{ fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ fontSize: '28px', color: '#4682B4' }}>Message Box</h1>
            <div className="message-window" ref={messageWindowRef} style={{ backgroundColor: '#f1f1f1', padding: '20px', borderRadius: '10px', height: '300px', overflowY: 'scroll' }}>
               {messageList.slice().reverse().map((msg) => (
                  <div className="message" key={msg._id} style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', backgroundColor: '#e0e0e0' }}>
                     <p style={{ fontSize: '16px', color: '#333' }}>{msg.name}: {msg.message}</p>
                     <p style={{ fontSize: '10px', color: '#888', marginTop: '-15px' }}>
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, {new Date(msg.createdAt).toLocaleDateString()}
                     </p>
                  </div>
               ))}
            </div>
            <div className="input-container" style={{ marginTop: '20px' }}>
               <textarea
                  required
                  placeholder="Type your message"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  style={{ width: '100%', height: '80px', padding: '10px', fontSize: '14px', borderRadius: '5px', border: '1px solid #ccc' }}
               />
               <button
                  className='btn btn-success'
                  onClick={sendMessage}
                  style={{
                     marginTop: '10px',
                     fontSize: '16px',
                     padding: '10px 20px',
                     backgroundColor: '#32CD32',
                     color: '#fff',
                     borderRadius: '5px',
                     border: 'none'
                  }}
               >
                  Send
               </button>
            </div>
         </div>
      </>
   );
};

export default ChatWindow;
