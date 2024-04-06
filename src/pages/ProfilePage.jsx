import { Container } from 'react-bootstrap';
import MidBody from '../components/midBody';
import RightCard from '../components/rightCard';
import PostCard from '../components/postCard';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react'
import useLocalStorage from 'use-local-storage';
import SideBar from '../components/sideBar';

export default function ProfilePage() {
  const [authToken, setAuthToken] = useLocalStorage("authToken", "");
  const navigate = useNavigate();


  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    } else if (authToken) {
      navigate("/profile")
    }
  }, [authToken, navigate]);

  // const handleLogout = () => {
  //   setAuthToken("");
  //   console.log('clear authToken');
  // }

  return (
    <Container>
      <div style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
      </div>

      <div style={{ display: "flex" }}>
        <SideBar />
        <div>
          <MidBody />
          <PostCard />
        </div>
        <RightCard />
      </div>

    </Container >


  );
}