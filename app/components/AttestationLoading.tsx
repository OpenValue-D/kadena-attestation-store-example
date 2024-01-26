'use client'
import {Col, Container, Row, Spinner} from "react-bootstrap";

/**
 * This spinner might be useful if the response from the blockchain will take some time to arrive
 */
export default function AttestationLoading() {
    return (
        <Container>
            <Row>
                <Col/>
                <Col>
                    <Spinner/> {/*TODO: add moving graph? */}
                </Col>
                <Col/>
            </Row>
        </Container>
    )
}