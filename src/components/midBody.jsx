import { Image, Button } from 'react-bootstrap';
import '../index.css';

export default function midBody() {
  return (
    <div style={{ width: "50%" }}>
      <div>
        <Button variant="light" style={{ backgroundColor: 'transparent', border: 'none' }} fluid>
          <i class="bi bi-arrow-left"></i>
          <span style={{ color: "black" }}>Haris</span>
        </Button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
        <Image src='https://pbs.twimg.com/profile_banners/83072625/1602845571/1500x500' />
        <div style={{ position: "absolute", top: "70%", left: "2%" }}>
          <Image style={{ width: 150 }} src='https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg' roundedCircle />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          className="rounded-pill mt-2"
          variant="outline-secondary"
          style={{ color: "black" }}
        >Edit profile</Button>
      </div>
      
      <div className='mt-5'>
        <p style={{ margin: "0px" }}>Haris</p>
        <p style={{ marginBottom: "2px" }}>@TheHappyHaris</p>
        <p>Help people switch career to be a web developer at  <a href="https://sigmaschool.co/" style={{ textDecoration: "none" }}>Sigma School</a></p>

        <p>
          <strong>271 </strong> following     <strong>610</strong> follower
        </p>
      </div>
    </div>
  )
}