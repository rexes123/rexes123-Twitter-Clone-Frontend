import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
// import { useDispatch } from 'react-redux';
// import { savePost } from '../features/posts/postSlice'


function NewPostModal({ text }) {
  const [show, setShow] = useState(false);
  //initial useState as empty string
  const [postContent, setPostContent] = useState("");
  // const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = () => {
    // dispatch(savePost(postContent));
    // setPostContent("");
    //Get stored JWT Token
    const token = localStorage.getItem("authToken");
    const decode = jwtDecode(token);
    const userId = decode.id;

    //Prepare data to be sent
    const data = {
      title: "Post title",
      content: postContent,
      user_id: userId,
    };
    console.log(data);

    //Make your API call here
    axios.post("https://fb725ff4-f580-4889-a209-d1ccc5e9ece4-00-202wcuqei341y.janeway.replit.dev/posts", data)
      .then((response) => {
        console.log("success:", response.data);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {text}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { handleClose(); handleSave(); }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewPostModal;
