import {Container, Nav, Navbar} from 'react-bootstrap';

function Header() {
    return (
        <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Exam System</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Exam</Nav.Link>
            <Nav.Link href="#pricing">Report</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )}
export default Header;