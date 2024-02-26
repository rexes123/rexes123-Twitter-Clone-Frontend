import { Nav, Spinner } from 'react-bootstrap';
import Post from './post';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsByUser } from '../features/posts/postSlice';

export default function PostCard() {
  // const [posts, setPosts] = useState([]);
  const posts = useSelector((state) => state.posts.posts)
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.posts.loading);

  const fetchPost = async (userId) => {
    const url = 'https://fb725ff4-f580-4889-a209-d1ccc5e9ece4-00-202wcuqei341y.janeway.replit.dev';
    const response = await fetch(`${url}/posts/user/${userId}`);
    const data = await response.json();
    console.log(data);
    console.log('fetch post');
    setPosts(data); // Update the posts state with fetched data
  }

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      console.log(`User id is ${userId}`);
      dispatch(fetchPostsByUser(userId))
    }
  }, []);

  return (
    <div style={{ width: "50%" }}>
      <div>
        <Nav variant='underline' defaultActiveKey="/home" as="ul" justify>
          <Nav.Item as="li">
            <Nav.Link href="/home">Tweets</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link eventKey="link-1">Replies</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link eventKey="link-3">Highlights</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link eventKey="link-4">Media</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link eventKey="link-5">Likes</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>

      {loading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      {posts.length > 0 && posts.map(post => (
        <Post key={post.id} content={post.content} postId={post.id} />
      ))}
    </div >
  )
}
