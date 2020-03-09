import Link from "next/link";
/**
 * Questo è come si crea un compotenete, viene usato in layout/test
 */
import { Navbar } from "react-bootstrap";
const Navbar_c = () => (
  <Navbar fixed="top" style={{ backgroundColor: "#0f2c53" }} variant="dark">
    <Link href="/">
      <Navbar.Brand
        href="#home"
        style={{ letterSpacing: ".4px" }}
        className="font-weight-light"
      >
        AlternativePassion
      </Navbar.Brand>
    </Link>
  </Navbar>
);

export default Navbar_c;
