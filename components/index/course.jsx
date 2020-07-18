import { Card, ListGroup, Row, Col, Button, Container } from "react-bootstrap";
import React from "react";
/**
 * Return remaining days value
 * @param {*} today start day
 * @param {*} target end day
 */
const remainingDays = (today, target) => {
  target = new Date(target);
  today = new Date(today);
  return Math.floor((target - today) / (60 * 60 * 24 * 1000));
};

/**
 * Return remaining days value mapped into a component
 * @param {*} today start day
 * @param {*} target end day
 */
const subOpenDay = (today, target) => {
  const remainingDay = remainingDays(today, target);

  if (remainingDay < 0) return;

  if (remainingDay == 0)
    return <React.Fragment>Le iscrizioni chiudono a breve</React.Fragment>;

  return (
    <React.Fragment>
      Iscrizioni aperte per{" "}
      {remainingDay == 1 ? `un altro giorno` : `altri ${remainingDay} giorni`}
    </React.Fragment>
  );
};
/**
 * Return remaining days value mapped into a component
 * @param {*} today start day
 * @param {*} target end day
 */
const subSoonDay = (today, target) => {
  const remainingDay = remainingDays(today, target);
  if (remainingDay < 0) return;
  if (remainingDay == 0)
    return <React.Fragment>Iscrizioni aprono a breve</React.Fragment>;

  return (
    <React.Fragment>
      Le iscrizioni aprono tra{" "}
      {remainingDay == 1 ? `un giorno` : `${remainingDay} giorni`}
    </React.Fragment>
  );
};
/**
 * Return end subscription component
 */
const subEndDay = () => {
  return <React.Fragment>Iscrizioni chiuse</React.Fragment>;
};
/**
 * Return a component showing the current status of the course
 * @param {*} today start day
 * @param {*} target end day
 */
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
          `${course.EndSubDate.split("-").reverse().join("-")}T${
            course.EndSubTime
          }:00`
        ) <= 1
          ? "text-warning"
          : ""
      }`}
    >
      {course.linkToText == "Iscrizioni aperte"
        ? subOpenDay(
            today,
            `${course.EndSubDate.split("-").reverse().join("-")}T${
              course.EndSubTime
            }:00`
          )
        : ""}
      {course.linkToText == "Prossimamente"
        ? subSoonDay(
            today,
            `${course.StartSubData.split("-").reverse().join("-")}T${
              course.EndSubTime
            }:00`
          )
        : ""}
      {course.linkToText == "Iscrizioni chiuse" ? subEndDay() : ""}
    </ListGroup.Item>
  );
};
/**
 * Return subscriptions status of the course
 * @param {*} course course
 */
const viewPeriod = (course) => {
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
/**
 * Return a page that said there aren't any course to show for the given filter values
 */
const nothingView = () => {
  return (
    <Container className="min-vh-100 d-flex flex-column justify-content-center text-center">
      <h1>:(</h1>
      <h2>Non ci sono corsi che soddisfano i filtri posti.</h2>
    </Container>
  );
};
/**
 * Return the component with the course list mapped into components and a button to switch to filter view
 * @param {*} courseList course list
 * @param {*} switchView function to rise to switch into filter view
 */
const ViewCourse = ({ courseList, switchView }) => {
  return (
    <React.Fragment>
      {courseList.length != 0 ? createViewCourse(courseList) : nothingView()}
      <Row
        className="position-sticky mt-2"
        style={{
          bottom: "2.75vh",
          justifyContent: "center",
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
/**
 * Return the component with the course list mapped into components
 * @param {*} courseList course list
 */
const createViewCourse = (courseList) => {
  const today = new Date();
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
                {course.tag.toLowerCase().split(",").join(" - ")}
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
