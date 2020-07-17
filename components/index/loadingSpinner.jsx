import { Container } from "react-bootstrap";

const ViewLoading = () => (
  <Container
    fluid={true}
    className="vh-100 d-flex justify-content-center align-items-center"
  >
    <div className="spinner-border text-primary p-3 p-lg-4" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </Container>
);
export default ViewLoading;
