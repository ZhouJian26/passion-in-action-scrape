import { Container } from "react-bootstrap";
/**
 * Return the footer
 */
const Footer = () => (
  <footer>
    <Container
      fluid={true}
      style={{ backgroundColor: "#0f2c53" }}
      className="text-center text-light p-3 font-weight-light"
    >
      <p>
        This is an unofficial website of{" "}
        <a
          className="text-light"
          href="https://www.polimi.it/corsi/passion-in-action/"
          rel="nofollow"
        >
          Polimi's Passion In Action.
        </a>
      </p>
      <p>
        I developed this website for the purpose of learning Web Development.
      </p>
      <p>
        <b>
          <a
            className="text-light"
            href="https://github.com/ZhouJian26/passion-in-action-scrape"
            target="_blank"
            rel="nofollow"
          >
            <img
              alt="Source code GitHub repository link"
              src={require(`../../../public/svg/github.svg`)}
              style={{
                height: "45px",
                borderRadius: "5px",
                backgroundImage:
                  "linear-gradient(to right bottom, #fbec7f, #fd8203)",
              }}
            ></img>
          </a>
        </b>
      </p>
      <p className="m-0 font-weight-lighter">
        Developed by{" "}
        <b>
          <a
            className="text-light"
            href="https://zhoujian.now.sh"
            target="_blank"
            rel="nofollow"
          >
            Zhou Jian
          </a>
        </b>
      </p>
    </Container>
  </footer>
);

export default Footer;
