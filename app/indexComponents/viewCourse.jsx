/**
 * Controlled React-Component
 * for view of a list of course
 *
 * !!! IMPLEMENTARE FUNZIONE PER IL PANNELLO DI FILTRO
 */

import { Card, ListGroup, Row, Col, Button, Container } from "react-bootstrap";
import React from "react";

const remainingDays = (today, target) => {
  target = new Date(target);
  today = new Date(today);
  return Math.floor((target - today) / (60 * 60 * 24 * 1000));
};
const subOpenDay = (today, target) => {
  const remainingDay = remainingDays(today, target);
  if (remainingDay == 0) {
    return <React.Fragment>Le iscrizioni chiudono a breve</React.Fragment>;
  }
  if (remainingDay > 0) {
    return (
      <React.Fragment>
        Iscrizioni aperte per{" "}
        {remainingDay == 1 ? `un altro giorno` : `altri ${remainingDay} giorni`}
      </React.Fragment>
    );
  }
};
const subSoonDay = (today, target) => {
  const remainingDay = remainingDays(today, target);
  if (remainingDay == 0) {
    return <React.Fragment>Iscrizioni aprono a breve</React.Fragment>;
  }
  if (remainingDay > 0) {
    return (
      <React.Fragment>
        Le iscrizioni aprono tra{" "}
        {remainingDay == 1 ? `un giorno` : `${remainingDay} giorni`}
      </React.Fragment>
    );
  }
};
const subEndDay = () => {
  return <React.Fragment>Iscrizioni chiuse</React.Fragment>;
};
const viewSubscriptionStatus = (today, course) => {
  return (
    <ListGroup.Item
      className={`font-weight-normal ${
        course.linkToText == "Iscrizioni aperte" ? "text-success" : ""
      } ${course.linkToText == "Iscrizioni chiuse" ? "text-danger" : ""} ${
        course.linkToText == "Prossimamente" ? "text-info" : ""
      } ${
        course.linkToText == "Iscrizioni aperte" &&
        remainingDays(
          today,
          course.EndSubDate.split("-")
            .reverse()
            .join("-") +
            "T" +
            course.EndSubTime +
            ":00"
        ) <= 1
          ? "text-warning"
          : ""
      }`}
    >
      {course.linkToText == "Iscrizioni aperte"
        ? subOpenDay(
            today,
            course.EndSubDate.split("-")
              .reverse()
              .join("-") +
              "T" +
              course.EndSubTime +
              ":00"
          )
        : ""}
      {course.linkToText == "Prossimamente"
        ? subSoonDay(
            today,
            course.StartSubData.split("-")
              .reverse()
              .join("-") +
              "T" +
              course.EndSubTime +
              ":00"
          )
        : ""}
      {course.linkToText == "Iscrizioni chiuse" ? subEndDay() : ""}
    </ListGroup.Item>
  );
};
const viewPeriod = course => {
  return (
    <React.Fragment>
      {course.period.length == 2 ? (
        <ListGroup.Item>
          Periodo svolgimento: {`${course.period[0]} ${course.period[1]}`}
        </ListGroup.Item>
      ) : (
        ""
      )}
      {course.period.length == 3 ? (
        <ListGroup.Item>
          Periodo svolgimento:{" "}
          {`${course.period[0]} a ${course.period[2]} ${course.period[1]}`}
        </ListGroup.Item>
      ) : (
        ""
      )}
      {course.period.length == 4 ? (
        <ListGroup.Item>
          Periodo svolgimento:{" "}
          {`${course.period[0]} ${course.period[1]} a ${course.period[2]} ${course.period[3]}`}
        </ListGroup.Item>
      ) : (
        ""
      )}
    </React.Fragment>
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
        className="position-sticky mt-1"
        style={{
          bottom: "2.25vh",
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
const createViewCourse = courseList => {
  //console.table(courseList, "EndSubDate");
  const today = new Date();
  //const today = [nowDay.getFullYear(), nowDay.getMonth() + 1, nowDay.getDate()];
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
                {viewPeriod(course)}
                <ListGroup.Item>Docente: {course.prof}</ListGroup.Item>
                <ListGroup.Item>Lingua: {course.lang}</ListGroup.Item>
                <ListGroup.Item>
                  Tipo corso: {course.type.join(", ")}
                </ListGroup.Item>
                {viewSubscriptionStatus(today, course)}
              </ListGroup>
              <Card.Text>
                <Button
                  variant="outline-dark"
                  className="mt-3"
                  target="_black"
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
export default ViewCourse;
