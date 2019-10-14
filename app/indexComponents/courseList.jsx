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
        console.log(courseList);
        return (<ul className="courseList">
            {courseList.map((course, index) =>
                <li key={index}>
                    <h3>{course[0].value}</h3>
                    <p>Categoria: {course[1].value.toLowerCase()}</p>
                    <p>Lingua: {course[2].value}</p>
                    <p>Dove: {course[3].value}</p>
                </li>
            )}
        </ul>)
    }
}
export default CourseList;