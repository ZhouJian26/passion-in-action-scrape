/**
 * Controlled React-Component
 * for view of a list of course
 *
 * !!! IMPLEMENTARE FUNZIONE PER IL PANNELLO DI FILTRO
 */

import { Card, ListGroup, Row, Col, Button } from "react-bootstrap";
import React from "react";

const ViewCourse = ({ courseList, filter, switchView }) => {
  return (
    <React.Fragment>
      <Row className="justify-content-center pt-3 mr-lg-3 ml-lg-3">
        {courseList.map((course, index) => (
          <Col
            key={index}
            className="col-12 col-sm-10 col-md-6 col-lg-4 col-xl-4 py-2"
          >
            <Card className="text-center h-100 border border-dark">
              <Card.Body className="d-flex flex-column justify-content-center">
                <Card.Title>{course.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {course.tag
                    .toLowerCase()
                    .split(",")
                    .join(" - ")}
                </Card.Subtitle>

                <ListGroup variant="flush mt-3">
                  <ListGroup.Item>A {course.location}</ListGroup.Item>
                  <ListGroup.Item>
                    Rivolto a {course.addressedTo}
                  </ListGroup.Item>
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
                  <ListGroup.Item>{course.linkToText}</ListGroup.Item>
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
