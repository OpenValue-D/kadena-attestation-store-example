import {Container, Image, Navbar, Nav} from "react-bootstrap";
// import Nav from 'react-bootstrap/Nav';

export default function AppNavbar() {
    return (
            <Navbar expand={"lg"} className={"bg-body-tertiary"}>
                <Container>
                    <Navbar.Brand href={"#home"}>
                        <Navbar.Text>Certification Portal</Navbar.Text>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className={"py-3"}>
                        <Nav>
                            <Nav.Link href={"#home"}>Home</Nav.Link>
                            <Nav.Link href={"#admin"}>Admin</Nav.Link>
                            <Nav.Link href={"#about"}>About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                <i className={"bi bi-person-circle"}></i>
            </Navbar>
        );
}
