import {Container, Image, Navbar, Nav} from "react-bootstrap";
// import Nav from 'react-bootstrap/Nav';

export default function AppNavbar() {
    return (<header>
                <Navbar expand={"lg"} className={"bg-body-tertiary"}>
                    <Container>
                        <Navbar.Brand href={"/"}>
                            <Navbar.Text>Attestation Portal</Navbar.Text>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse className={"py-3"}>
                            <Nav>
                                <Nav.Link href={"/"}>Home</Nav.Link>
                                <Nav.Link href={"/searchScore"}>Search Score</Nav.Link>
                                <Nav.Link href={"/createScore"}>Create Score</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                    <i className={"bi bi-person-circle"}></i>
                </Navbar>
            </header>
        );
}
