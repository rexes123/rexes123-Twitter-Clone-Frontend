import { Button, Col } from 'react-bootstrap';
import IconButton from '../components/iconButton';
import NewPostModal from '../components/newPostModal';

const clearLocalStorage = () => {
  localStorage.setItem("authToken", "");
  console.log('clear authToken in localStorage');
}

export default function SideBar() {
  return (
    <Col
      sm={2}
      className="d-flex flex-column justify-content-start align-items-start bg-light vh-100"
      style={{ position: "sticky", top: 0 }}
    >
      <IconButton className="bi bi-twitter" isTop />
      <IconButton className="bi bi-house" text="Home" />
      <IconButton className="bi bi-search" text="Explore" />
      <IconButton className="bi bi-bell" text="Notification" />
      <IconButton className="bi bi-envelope" text="Messages" />
      <IconButton className="bi bi-journal-text" text="Lists" />
      <IconButton className="bi bi-bookmark" text="Bookmarks" />
      <IconButton className="bi bi-patch-check" text="Verified" />
      <IconButton className="bi bi-person" text="Profiled" />
      <IconButton className="bi bi-filter-circle" text="More" />
      <IconButton className="bi bi-door-closed" text="Logout" onClick={clearLocalStorage} />

      {/* <Button variant="primary" className="rounded-pill me-3">Tweet</Button> */}
      <NewPostModal variant="primary" className="rounded-pill me-3" text="Tweet" />
      {/* </div > */}
    </Col>
  )
}