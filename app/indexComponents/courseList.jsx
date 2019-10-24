import React, { Component } from "react";
import { Card, Container, ListGroup, Row, Col, Button } from "react-bootstrap";
/**
 * add get data form S3
 */
const API = "/static/example.json"; //"/api/getCourses.js"
class CourseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0,
      courseList: []
    };
  }
  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ courseList: data }));
  }
  render() {
    const { courseList } = this.state;

    return (
      <Container fluid={true} className="mt-5">
        <Row className="justify-content-center pt-3 pb-3 mr-lg-3 ml-lg-3">
          {courseList.map((course, index) => (
            <Col
              key={index}
              className="col-12 col-sm-10 col-md-6 col-lg-4 col-xl-4 py-2"
            >
              <Card className="text-center h-100 border border-dark">
                <Card.Body className="d-flex flex-column justify-content-center">
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {course.tag.toLowerCase()}
                  </Card.Subtitle>

                  <ListGroup variant="flush mt-3">
                    <ListGroup.Item>Dove: {course.location}</ListGroup.Item>
                    <ListGroup.Item>
                      Interessati: {course.addressedTo}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Tipologia Corso:{" "}
                      {course.type
                        .toLowerCase()
                        .split(";")
                        .join(", ")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Periodo svolgimento: {course.period.substring(4)}
                    </ListGroup.Item>
                    <ListGroup.Item>Lingua: {course.lang}</ListGroup.Item>
                    <ListGroup.Item>Docente: {course.prof}</ListGroup.Item>
                    {course.linkToText == "Invia la tua candidatura" ? (
                      <ListGroup.Item>Iscrizioni aperte</ListGroup.Item>
                    ) : (
                      ""
                    )}
                    {course.linkToText ==
                    "Candidatura terminata, attività in valutazione" ? (
                      <ListGroup.Item>Iscrizioni chiuse</ListGroup.Item>
                    ) : (
                      ""
                    )}
                    {course.linkToText == "" ? (
                      <ListGroup.Item>Iscrizioni aprono a breve</ListGroup.Item>
                    ) : (
                      ""
                    )}
                  </ListGroup>
                  <Card.Text>
                    <Button
                      variant="outline-dark"
                      className="mt-3"
                      href={`https://www.polimi.it${course.linkWs}`}
                      rel="nofollow"
                    >
                      Vai al Sito
                    </Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}
export default CourseList;
