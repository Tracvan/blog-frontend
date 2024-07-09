import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
`;

const ContentBox = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  text-align: center;
  max-width: 400px;
`;

const Title = styled.h1`
  color: #d9534f;
`;

const Message = styled.p`
  color: #333;
  line-height: 1.6;
`;

const Button = styled(Link)`
  display: inline-block;
  background-color: #5bc0de;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #31b0d5;
  }
`;

const AccessDenied = () => {
    return (
        <Container>
            <ContentBox>
                <Title>Access Denied</Title>
                <Message>
                    Sorry, you do not have permission to access this page. This area is restricted to authorized users only.
                </Message>
                <Message>
                    If you believe this is an error, please contact the system administrator or try logging in with an account that has the necessary permissions.
                </Message>
                <Button to="/">Return to Home</Button>
            </ContentBox>
        </Container>
    );
};

export default AccessDenied;