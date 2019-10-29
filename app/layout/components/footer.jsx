import { Container } from "react-bootstrap";

const Footer = () => (
  <Container
    fluid={true}
    style={{ backgroundColor: "#0f2c53" }}
    className="text-center text-light p-3 font-weight-light"
  >
    <p>
      This is a fake website of{" "}
      <a
        className="text-light"
        href="https://www.polimi.it/corsi/passion-in-action/"
        rel="nofollow"
      >
        Polimi's Passion In Action Official website.
      </a>
    </p>
    <p>I developed this website for the purpose of learning Web Development.</p>
    <p className="m-0 font-weight-lighter">
      Developed by{" "}
      <b>
        <a className="text-light" href="https://zhoujiandev.com" rel="nofollow">
          Zhou Jian
        </a>
      </b>
    </p>
  </Container>
);

export default Footer;
