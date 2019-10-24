import { Container } from 'react-bootstrap'

const Footer = () => (
    <Container fluid={true} className="text-center bg-dark text-light p-3">
        <p>Alternative website of...</p>
        <p className="m-0"> ©{new Date().getFullYear()}{" "}
            <b>
                <a href="https://zhoujiandev.com">Zhou Jian</a>
            </b>
        </p>
    </Container>
);

export default Footer;
