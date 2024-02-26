import { Button } from 'react-bootstrap';

export default function IconButton({ text, className, isTop, onClick }) {
  return (
    <Button variant="light" onClick={onClick} style={{ textAlign: "left", display: "flex", color: isTop ? "blue" : "black" }}>
      <i className={className}></i>
      <span style={{ marginLeft: "10px" }}>{text}</span>
    </Button>
  )
}