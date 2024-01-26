import AppNavbar from "../app/components/AppNavbar";
import "bootstrap/dist/css/bootstrap.css"
import "./globals.css"
import { Col, Container, Row } from "react-bootstrap";

export default function Home() {
  return (
    <>
    <AppNavbar/>
    <Container fluid={"sm px-3 my-3"}>
            <Row>
                <Col lg={6}>
                  <p>
                    This is the attestation portal. <br />
                    You can create an attestation which is then saved on the Kadena blockchain. 
                    You can also search for created attestations.  <br />
                    Be aware that this is only a Proof-of-Concept.
                    For production purposes the creation should only be done in the backend!
                  </p>
                </Col>
            </Row>
        </Container>
    
    </>
  )
}
