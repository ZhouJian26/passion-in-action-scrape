import React, { Component } from "react";
import { Container } from "react-bootstrap";
import ViewCourse from "./viewCourse";
import ViewLoading from "./viewLoading";
import ViewFilter from "./viewFilter";
/**
 * add get data form S3
 * add a controlledcomponent for card
 * add a component for filter
 * handle/hook function for control view
 */
const API = "/static/example.json"; //"/api/getCourses.js"
class CourseListApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0, //0 carico i dati, 1 view, 2 filtra
      courseList: [],
      filter: []
    };
    this.handleClickCheckbox = this.handleClickCheckbox.bind(this);
    this.handleClickSwitchView = this.handleClickSwitchView.bind(this);
    this.handleClickResetFilter = this.handleClickResetFilter.bind(this);
  }
  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => {
        /*data = data.map(el => {
          el.period = el.period
            .split(" ")
            .filter(el2 => el2 != "a" && el2 != "dal" && el2 != "");
          return el;
        });*/
        /*console.log(
          [...new Set(data.map(el => el.period).flat(1))].filter(el =>
            isNaN(el)
          )
        );*/
        /**
         * Costruzione valori dei filtri
         */
        data = data.map(el => {
          if (el.linkToText == "") {
            el.linkToText = "Prossimamente";
            return el;
          }
          if (el.linkToText == "Invia la tua candidatura") {
            el.linkToText = "Iscrizioni aperte";
            return el;
          }
          el.linkToText = "Iscrizioni chiuse";
          return el;
        });
        const filter = [
          {
            category: "Stato iscrizioni",
            key: "linkToText",
            filter: [...new Set(data.map(el => el.linkToText))].map(el => {
              return { key: el, value: 0 };
            })
          },
          {
            category: "Interessati",
            key: "addressedTo",
            filter: [...new Set(data.map(el => el.addressedTo))].map(el => {
              return { key: el, value: 0 };
            })
          },
          {
            category: "Dove",
            key: "location",
            filter: [...new Set(data.map(el => el.location))].map(el => {
              return { key: el, value: 0 };
            })
          },
          {
            category: "Lingua",
            key: "lang",
            filter: [...new Set(data.map(el => el.lang))].map(el => {
              return { key: el, value: 0 };
            })
          },
          {
            category: "Prof",
            key: "prof",
            filter: [...new Set(data.map(el => el.prof))].map(el => {
              return { key: el, value: 0 };
            })
          }
        ];
        this.setState({ courseList: data, status: 1, filter: filter });
      });
  }
  handleClickSwitchView() {
    if (this.state.status == 1) {
      this.setState({ status: 2 });
      return;
    }
    this.setState({ status: 1 });
  }
  handleClickResetFilter() {
    const filter = this.state.filter.map(category => {
      category.filter = category.filter.map(filtro => {
        filtro.value = 0;
        return filtro;
      });
      return category;
    });
    this.setState({ filter: filter });
  }
  handleClickCheckbox({ categoryKey, filterKey }) {
    const filter = this.state.filter.map(category => {
      if (category.key != categoryKey) return category;
      category.filter = category.filter.map(filtro => {
        if (filtro.key != filterKey) return filtro;
        return { key: filtro.key, value: filtro.value == 0 ? 1 : 0 };
      });
      return category;
    });
    this.setState({ filter: filter });
  }
  render() {
    const { courseList, status, filter } = this.state;
    //console.log(filter);
    return (
      <Container fluid={true} className="mt-5 mb-2">
        {status == 2 ? (
          <ViewFilter
            filter={filter}
            onCheckboxClick={this.handleClickCheckbox}
            resetFilter={this.handleClickResetFilter}
            switchView={this.handleClickSwitchView}
          ></ViewFilter>
        ) : (
          ""
        )}
        {status == 1 ? (
          <ViewCourse
            courseList={courseList}
            filter={filter}
            switchView={this.handleClickSwitchView}
          ></ViewCourse>
        ) : (
          ""
        )}
        {status == 0 ? <ViewLoading /> : ""}
      </Container>
    );
  }
}
export default CourseListApp;
