import React, { Component } from 'react'
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

        return (<ul className="courseList">
            {courseList.map((course, index) =>
                <li key={index}>
                    <h3>{course.title}</h3>
                    <p>Categoria: {course.tag.toLowerCase()}</p>
                    <p>Lingua: {course.lang}</p>
                    <p>Dove: {course.where}</p>
                    <p>Inizio iscrizioni: {course.subStartDate}</p>
                    <p>Fine iscrizioni: {course.subEndDate} alle ore {course.subEndTime}</p>
                </li>
            )}
        </ul>)
    }
}
export default CourseList;