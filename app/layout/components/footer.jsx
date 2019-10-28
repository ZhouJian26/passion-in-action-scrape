import { Container } from "react-bootstrap";

const Footer = () => (
  <Container
    fluid={true}
    style={{ backgroundColor: "#0f2c53" }}
    className="text-center text-light p-3"
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

    <p>Version 0.1.1</p>
    <p className="m-0">
      {" "}
      ©{new Date().getFullYear()}{" "}
      <b>
        <a className="text-light" href="https://zhoujiandev.com">
          Zhou Jian
        </a>
      </b>
    </p>
  </Container>
);

export default Footer;
