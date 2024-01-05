import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Robot from '../assets/robot.gif';

export default function Welcome() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    async function checkUser() {
      const user = await JSON.parse(localStorage.getItem('chat-app-user'));
      if (user) {
        setUsername(user.username);
      }
    }

    checkUser();
  }, []);

  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{username} !</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  flex-direction: column;

  img {
    height: 20rem;
  }

  span {
    color: #4e0eff;
  }
`;
