import React, { Component } from 'react'
import { CardColumns, Card, Container, ListGroup, Row, Col } from 'react-bootstrap'
const API = "/api/getCourses.js"
class CourseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            courseList: [],
        };
    }
    componentDidMount() {
        fetch(API)
            .then(response => response.json())
            .then(data => this.setState({ courseList: data }));
    }
    render() {
        const { courseList } = this.state;

        return (<Container className="mt-5">
            <Row className="justify-content-center pt-3 pb-3">
                {courseList.map((course, index) =>
                    <Col key={index} className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 py-2">
                        <Card className="text-center h-100">
                            <Card.Body className="d-flex flex-column justify-content-center">
                                <Card.Title>{course.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{course.tag.toLowerCase()}</Card.Subtitle>
                                <Card.Text>
                                    Descrizione Descrizione Descrizione Descrizione Descrizione Descrizione Descrizione Descrizione Descrizione Descrizione Descrizione Descrizione
                                </Card.Text>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Lingua: {course.lang}</ListGroup.Item>
                                    <ListGroup.Item>Dove: {course.location}</ListGroup.Item>
                                    <ListGroup.Item>Inizio iscrizioni: {course.startSubData}</ListGroup.Item>
                                    <ListGroup.Item>Fine iscrizioni: {course.endSubDate} alle ore {course.endSubTime}</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row></Container>)
    }
}
export default CourseList;