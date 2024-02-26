import { Col, Row, Image, Button } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export default function Post({ content, postId }) {

  const token = localStorage.getItem("authToken");
  const decode = jwtDecode(token);
  const userId = decode.id;
  console.log(userId)

  const url = "https://fb725ff4-f580-4889-a209-d1ccc5e9ece4-00-202wcuqei341y.janeway.replit.dev"
  console.log(url)

  useEffect(() => {
    fetch(`${url}/likes/post/${postId}`)
      .then((response) => response.json())
      .then((data) => setLikes(data))
      .catch((error) => console.error("Error:", error));
  }, [postId]);


  const [likes, setLikes] = useState([]);
  //Check, if the user has liked the post, 
  const isLike = likes.some((like) => like.user_id === userId);
  //if true run addLike() else removalLike()
  const handleLike = () => (isLike ? addLike() : removeLike());


  //addLike
  const addLike = () => {
    axios.post(`${url}/likes`, {
      user_id: userId,
      post_id: postId,
    })
      .then((response) => {
        setLikes([...likes, { ...response.data, like_id: response.data.id }]);
      })
      .catch((error) => console.error("Error:", error))
  }

  const removeLike = () => {
    const like = likes.find((like) => like.user_id === userId);
    if (like) {
      axios
        .put(`${url}/likes/${userId}/${postId}`)
        .then(() => {
          setLikes(likes.filter((likeItem) => likeItem.like_id !== like.id));
        })
        .catch((error) => console.error("Error:", error));
    }
  }

  return (
    <div>
      <Row>
        <Col sm={1}>
          <Image style={{ width: "50px" }} src="https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg" roundedCircle />
        </Col>
        <Col>
          <p style={{ margin: "0px" }}><strong>Haris </strong><span>@Haris.samigan . Apr 16</span></p>
          <p>{content}</p>
        </Col>
      </Row>
      <div style={{
        display: "flex",
        justifyContent: "space-between"
      }}>
        <Button variant="light" style={{ backgroundColor: "transparent", border: "none" }}>
          <i className="bi bi-chat"></i>
        </Button>

        {/* For update update the post */}
        <Button variant="light" style={{ backgroundColor: "transparent", border: "none" }}>
          <i className="bi bi-arrow-repeat"></i>
        </Button>


        {/* Like */}
        <Button variant="light" onClick={handleLike} style={{ backgroundColor: "transparent", border: "none" }}>
          {
            isLike ? (
              <i className="bi bi-heart-fill text-danger"></i>
            ) : (
              <i className="bi bi-heart"></i>
            )
          }
          {likes.length}
        </Button>

        <Button variant="light" style={{ backgroundColor: "transparent", border: "none" }}>
          <i className="bi bi-graph-up"></i>
        </Button>
        <Button variant="light" style={{ backgroundColor: "transparent", border: "none" }}>
          <i className="bi bi-upload"></i>
        </Button>
      </div>
    </div >
  )
}
