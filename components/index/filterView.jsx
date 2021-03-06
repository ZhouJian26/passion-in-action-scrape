import React from "react";
import { Form, Row, Button, Col, Container } from "react-bootstrap";

/**
 * Return the Filter view
 * @param {*} filter filter data to show
 * @param {*} onCheckboxClick event to rise on click on a filter value
 * @param {*} resetFilter event to rise to reset filter values
 * @param {*} switchView event to rise to switch to courses view
 */
const ViewFilter = ({ filter, onCheckboxClick, resetFilter, switchView }) => {
  return (
    <Container>
      <Form className="pt-3 list-group list-group-flush">
        {filter.map((categoria, index) => (
          <Form.Group
            className={`wv-100 ${
              index != filter.length - 1 ? "list-group-item" : ""
            } py-3`}
            key={`${categoria.key}-${index}`}
          >
            <Form.Label className="font-weight-bold w-100 text-center h3">
              {categoria.category}
            </Form.Label>
            <Row className="justify-content-center">
              {categoria.filter.map((filtro, index2) => (
                <Col
                  key={`${categoria.key}-${index}-${index2}`}
                  className="col-11 col-sm-5 col-md-5 col-lg-4 col-xl-4 py-2"
                >
                  <Form.Check
                    type="checkbox"
                    label={filtro.key}
                    id={`${categoria.key}-${index}-${index2}`}
                    checked={filtro.value}
                    onChange={() => {
                      onCheckboxClick({
                        categoryId: index,
                        filterId: index2,
                      });
                    }}
                  ></Form.Check>
                </Col>
              ))}
            </Row>
          </Form.Group>
        ))}
      </Form>
      <Row
        className="position-sticky"
        style={{
          bottom: "2.75vh",
          justifyContent: "center",
        }}
      >
        <Button
          variant="primary"
          className="pl-3 pr-3 mr-1"
          onClick={() => {
            resetFilter();
          }}
        >
          Reset
        </Button>
        <Button
          variant="primary"
          className="pl-3 pr-3 ml-1"
          onClick={() => {
            switchView();
          }}
        >
          Visualizza
        </Button>
      </Row>
    </Container>
  );
};
export default ViewFilter;
