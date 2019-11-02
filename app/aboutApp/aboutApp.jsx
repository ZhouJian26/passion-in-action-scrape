import { Container, Jumbotron } from "react-bootstrap";
const AboutApp = () => {
  return (
    <Container fluid={true} className="p-0 mt-5 pt-2">
      <Jumbotron>
        <h1>About</h1>
        <p>lore ipsum ...</p>
      </Jumbotron>
    </Container>
  );
};
export default AboutApp;
