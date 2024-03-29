import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/api";
import { io } from "socket.io-client";

import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(undefined);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    async function checkUser() {
      if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
      }
    }

    checkUser();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit('add-user', currentUser._id);
      console.log("Socket connected");
    }
  }, [currentUser]);

  useEffect(() => {
    async function fetchContacts() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
          console.log("Contacts:", data.data);
          setContacts(data.data);
        } else {
          navigate('/setAvatar');
        }
      }
    }

    fetchContacts();
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }

  return (
    <>
      <Container>
        <div className="container">
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
          {
            currentChat === undefined ? (
              <Welcome />
            ) : (
              <ChatContainer
                currentChat={currentChat}
                currentUser={currentUser}
                socket={socket}
              />
            )
          }
        </div>
      </Container>
    </>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
