// Chat.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = () => {
  const [senderId, setSenderId] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [messageText, setMessageText] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [receiverMessage, setReceiverMessage] = useState(null);
  const [senderMessage, setSenderMessage] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const initializeComponent = async () => {
      // Fetch the access token from local storage
      const storedAccessToken = localStorage.getItem('ACCESS_TOKEN');
      const receiver = localStorage.getItem('RECEIVER');

      if (storedAccessToken) {
        // Set the access token in the component state
        setAccessToken(storedAccessToken);

        // Fetch message history when the component mounts
        await fetchUsers();

        if(receiver){
          console.log(receiver)
          const receiverUser = document.getElementById(`userDisplayName${receiver}`);
          if (receiverUser) {
            setSelectedUser(receiverUser.innerText);
            receiverUser.style.fontWeight = 'bold';
        }
  
        }

        await fetchMessageHistory();

        // Set up periodic polling every 5 seconds (adjust as needed)
        const intervalId = setInterval(() => {
          fetchConversation();
        }, 1000);

        // Cleanup: clear the interval when the component unmounts
        return () => {
          clearInterval(intervalId);
        };

      } else {
        // Handle the case where the access token is not available
        console.error('Access token not found in local storage');
      }
    };

    initializeComponent();
  }, []);

  const fetchUsers = async () => {
    try {
      // Assuming you have an endpoint for fetching message history
      const response = await axios.get('http://localhost:8080/api/message/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      });

      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  const fetchMessageHistory = async () => {
    try {
      // Assuming you have an endpoint for fetching message history
      const response = await axios.get('http://localhost:8080/api/message/history', {
        params: {
          userId: localStorage.getItem('ID'), // Pass the logged-in user's ID as a query parameter
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      });

      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching message history:', error.message);
    }
  };

  const handleSendMessage = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/message/send',
        null, // Pass null as the second argument if you're not sending a request body
        {
          params: {
            senderId: localStorage.getItem('ID'),
            receiverId: localStorage.getItem('RECEIVER'),
            messageText: messageText,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response.data);
      setSenderId('');
      setReceiverId('');
      setMessageText('');

      // After sending a message, fetch updated message history
      await fetchConversation();
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  };

  const isMessageFromSender = (message) => {
    // Compare the senderId of the message with the logged-in user's ID
    return message.sender.id === parseInt(senderId, 10);
  };

  const fetchConversation = async () => {
    try {
      // Assuming you have an endpoint for fetching message history
      const response = await axios.get('http://localhost:8080/api/message/conversation', {
        params: {
          userId: localStorage.getItem('ID'), // Pass the logged-in user's ID as a query parameter
          receiverId: localStorage.getItem('RECEIVER'),
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      });
      setConversations(response.data);
    } catch (error) {
      console.error('Error fetching conversation:', error.message);
    }
  };


  const handleUserClick = (userId, firstName, lastName) => {
    localStorage.setItem('RECEIVER', userId);
    
    const allUserElements = document.querySelectorAll('[id^="userDisplayName"]');
    allUserElements.forEach((element) => {
      element.style.fontWeight = 'normal'; // Reset to normal font weight
    });

    const userDisplayNameElement = document.getElementById(`userDisplayName${userId}`);
    if (userDisplayNameElement) {
    userDisplayNameElement.style.fontWeight = 'bold';
    }
    setSelectedUser(firstName + ' ' +lastName)
    fetchConversation();
  };  

  return (
    <div style={{ backgroundColor: '#242526'}}>
               <div className="row m-auto g-5" style={{width: "100vw", height: "93.8vh" }}>
                    <div className="col-3 mt-0 p-4" >
                        <h1 className='text-white fw-bold'>Chats</h1>
                        {users.map((user) => (
                          <p
                            id={`userDisplayName${user.id}`}
                            key={user.id} // Make sure each element has a unique key
                            className='text-white userDisplayName'
                            onClick={() => handleUserClick(user.id, user.firstName, user.lastName)}
                            style={{ cursor: 'pointer' }}
                          >
                            {user.firstName} {user.lastName}
                          </p>
                        ))}
                    </div>
                    <div className="col-9 text-white mt-0 p-0" style={{ height: "93.8vh", borderLeft: '1px solid #3F4041'}}>
                    <h5 className='ps-3 py-2'>{selectedUser}</h5>
                    {conversations.map((conversation) => (
                      <div key={conversation.id} style={{ marginRight: "50px", display: 'flex', flexDirection: conversation.sender.id === parseInt(localStorage.getItem('ID'), 10) ? 'row-reverse' : 'row', justifyContent: 'flex-start', position: 'relative', margin: '5px' }}>
                          
                          <div
                            key={conversation.id} 
                            className='text-white rounded rounded-4'
                            style={{ 
                              cursor: 'pointer',
                              padding: '3px 10px',
                              marginBottom: "5px",
                              marginRight: "50px",
                              display: 'inline-block',
                              backgroundColor: conversation.sender.id === parseInt(localStorage.getItem('ID'), 10) ? '#2186f6' : '#3f4041',
                              color: conversation.sender.id === parseInt(localStorage.getItem('ID'), 10) ? 'white' : 'black',
                              position: 'relative',
                            }}
                          >
                            {conversation.message}

                          </div>
                          <br />
                      </div>
                        ))}
                        {/* Add a div at the very bottom of this div and create an input to add a message and a send button */}
                        <div style={{ position: 'absolute', bottom: 0, width: '73%', padding: '10px', background: '#2C2C2C' }}>
                            <input
                                type="text"
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                placeholder="Type your message..."
                                style={{ width: '95%', marginRight: '10px', padding: '8px', borderRadius: '5px', border: 'none' }}
                            />
                            <button onClick={handleSendMessage} style={{ padding: '8px', borderRadius: '5px', border: 'none', background: '#2186f6', color: 'white' }}>
                              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#fff">
                                <path d="M0 0h24v24H0z" fill="none"/>
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                              </svg>
                            </button>
                        </div>
                    </div>
                </div>

              <div>
      

    </div>
  </div>
    
  );
};

export default Chat;
