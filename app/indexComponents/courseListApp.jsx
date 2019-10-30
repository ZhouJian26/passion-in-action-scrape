import React, { Component } from "react";
import { Container } from "react-bootstrap";
import ViewCourse from "./viewCourse";
import ViewLoading from "./viewLoading";
import ViewFilter from "./viewFilter";
/**
 * add get data form S3
 */
const API = "/api/courseList.js"; //"/static/example.json"; //"/api/courseList.js";

const buildFilterList = arrToFormat => {
  return [...new Set(arrToFormat)].sort().map(el => {
    return { key: el, value: 0 };
  });
};
const buildFilterCategory = (category, key, filterList) => {
  return {
    category: category,
    key: key,
    filter: buildFilterList(filterList)
  };
};
const filterCourse = (filter, courseList) => {
  const trueFilter = filter
    .map(categoriaFiltro => {
      return {
        key: categoriaFiltro.key,
        filter: categoriaFiltro.filter
          .filter(filtro => {
            return filtro.value == 1;
          })
          .map(filter => {
            return filter.key;
          })
      };
    })
    .filter(categoriaFiltro => {
      return categoriaFiltro.filter.length;
    });
  return courseList.filter(course => {
    let hit = 0;
    trueFilter.forEach(categoriaFiltro => {
      if (
        typeof course[categoriaFiltro.key] === "string" &&
        categoriaFiltro.filter.includes(course[categoriaFiltro.key])
      ) {
        hit++;
        return;
      }

      if (
        typeof course[categoriaFiltro.key] === "object" &&
        new Set(
          [].concat(
            categoriaFiltro.filter,
            course[categoriaFiltro.key].filter(el => isNaN(el))
          )
        ).size !=
          categoriaFiltro.filter.length +
            course[categoriaFiltro.key].filter(el => isNaN(el)).length
      ) {
        hit++;
        return;
      }
    });
    return hit == trueFilter.length;
  });
};
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
        data = data.map(el => {
          el.type = el.type.toLowerCase().split(/; |,  |, /);
          el.period = [
            ...new Set(
              el.period
                .split(" ")
                .filter(el2 => el2 != "a" && el2 != "dal" && el2 != "")
            )
          ];
          return el;
        });
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
        const filter = [];
        filter.push(
          buildFilterCategory("Dove", "location", data.map(el => el.location))
        );

        filter.push(
          buildFilterCategory(
            "Stato iscrizioni",
            "linkToText",
            data.map(el => el.linkToText)
          )
        );
        filter.push(
          buildFilterCategory(
            "Interessati",
            "addressedTo",
            data.map(el => el.addressedTo)
          )
        );
        filter.push(
          buildFilterCategory(
            "Periodo svolgimento",
            "period",
            [...new Set(data.map(el => el.period).flat(1))].filter(el =>
              isNaN(el)
            )
          )
        );
        filter.push(
          buildFilterCategory("Tipo corso", "type", [
            ...new Set(data.map(el => el.type).flat(1))
          ])
        );
        /*
        filter.push(
          buildFilterCategory("Lingua", "lang", data.map(el => el.lang))
        );*/
        filter.push(
          buildFilterCategory("Prof", "prof", data.map(el => el.prof))
        );

        this.setState({ courseList: data, status: 1, filter: filter });
      });
  }
  handleClickSwitchView() {
    window.scrollTo(0, 0);
    this.setState({ status: this.state.status == 1 ? 2 : 1 });
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
  handleClickCheckbox({ categoryId, filterId }) {
    const { filter } = this.state;
    filter[categoryId].filter[filterId].value =
      filter[categoryId].filter[filterId].value == 0 ? 1 : 0;
    this.setState({ filter: [...filter] });
  }
  render() {
    const { courseList, status, filter } = this.state;
    const toViewCourse = filterCourse(filter, courseList);
    console.table(toViewCourse);
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
            courseList={toViewCourse}
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
