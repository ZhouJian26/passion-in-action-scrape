import Link from "next/link";
/**
 * Questo è come si crea un compotenete, viene usato in layout/test
 */
const linkStyle = {
  marginRight: 15
};
const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
  </div>
);

export default Header;
