/**
 * Controlled React-Component
 * for view of a list of course
 *
 * !!! IMPLEMENTARE FUNZIONE PER IL PANNELLO DI FILTRO
 */

import { Card, ListGroup, Row, Col, Button, Container } from "react-bootstrap";
import React from "react";
const createViewCourse = courseList => {
  return (
    <Row className="justify-content-center pt-3 mr-lg-3 ml-lg-3 min-vh-100">
      {courseList.map((course, index) => (
        <Col
          key={index}
          className="col-12 col-sm-10 col-md-6 col-lg-4 col-xl-4 py-2"
        >
          <Card className="text-center h-100 border border-dark">
            <Card.Body className="d-flex flex-column justify-content-center">
              <Card.Title>{course.title}</Card.Title>
              <Card.Subtitle className="mb-2 font-weight-light text-dark">
                {course.tag
                  .toLowerCase()
                  .split(",")
                  .join(" - ")}
              </Card.Subtitle>

              <ListGroup variant="flush mt-3">
                <ListGroup.Item>Presso {course.location}</ListGroup.Item>
                <ListGroup.Item>Rivolto a {course.addressedTo}</ListGroup.Item>
                <ListGroup.Item>
                  Tipo corso:{" "}
                  {course.type
                    .toLowerCase()
                    .split(";")
                    .join(", ")}
                </ListGroup.Item>
                {course.period.length == 2 ? (
                  <ListGroup.Item>
                    Periodo svolgimento:{" "}
                    {`${course.period[0]} ${course.period[1]}`}
                  </ListGroup.Item>
                ) : (
                  ""
                )}
                {course.period.length == 3 ? (
                  <ListGroup.Item>
                    Periodo svolgimento:{" "}
                    {`${course.period[0]} a ${course.period[2]} ${
                      course.period[1]
                    }`}
                  </ListGroup.Item>
                ) : (
                  ""
                )}
                {course.period.length == 4 ? (
                  <ListGroup.Item>
                    Periodo svolgimento:{" "}
                    {`${course.period[0]} ${course.period[1]} a ${
                      course.period[2]
                    } ${course.period[3]}`}
                  </ListGroup.Item>
                ) : (
                  ""
                )}
                <ListGroup.Item>Lingua: {course.lang}</ListGroup.Item>
                <ListGroup.Item>Docente: {course.prof}</ListGroup.Item>
                <ListGroup.Item
                  className={`${
                    course.linkToText == "Iscrizioni aperte"
                      ? "text-success"
                      : ""
                  } ${
                    course.linkToText == "Iscrizioni chiuse"
                      ? "text-danger"
                      : ""
                  } ${
                    course.linkToText == "Prossimamente" ? "text-warning" : ""
                  }`}
                >
                  {course.linkToText}
                </ListGroup.Item>
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
  );
};
const nothingView = () => {
  return (
    <Container className="min-vh-100 d-flex flex-column justify-content-center text-center">
      <h1>:(</h1>
      <h2>Non ci sono corsi che soddisfano i filtri posti.</h2>
    </Container>
  );
};
const ViewCourse = ({ courseList, switchView }) => {
  return (
    <React.Fragment>
      {courseList.length != 0 ? createViewCourse(courseList) : nothingView()}
      <Row
        className="position-sticky"
        style={{
          bottom: 0,
          padding: "1vh",
          justifyContent: "center"
        }}
      >
        <Button
          variant="primary"
          className="pl-5 pr-5"
          style={{ letterSpacing: ".5px" }}
          onClick={() => {
            switchView();
          }}
        >
          Filtra
        </Button>
      </Row>
    </React.Fragment>
  );
};
export default ViewCourse;
