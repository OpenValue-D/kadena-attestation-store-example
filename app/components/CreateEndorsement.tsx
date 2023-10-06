import { createCert } from "@/app/logic/BlockchainTools";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import { ScoreCreationState } from "./ScoreCreation";

interface CreateEndorsementProps {
    createdResult: ScoreCreationState
    setCreatedResult: (state: ScoreCreationState) => void
}
export default function CreateEndorsement({createdResult, setCreatedResult}: CreateEndorsementProps) {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault() //prevent auto form submitting and page reloading
        // @ts-ignore
        if (event.nativeEvent.submitter.id === "create_btn") {
            const id = event.currentTarget.certIdInput.value
            const name = event.currentTarget.lastNameInput.value
            const date = event.currentTarget.date.value
            const score = event.currentTarget.score.value
            const graphData = event.currentTarget.graphData.value
            const tasks = event.currentTarget.tasks.value
            const endorsementBody = event.currentTarget.certBody.value
            const createScorePromise= createCert(id, name, date, score, graphData, tasks, endorsementBody)

            createScorePromise.then(
                resolvedValue => {
                    if (resolvedValue && resolvedValue.result.status === "success") {
                        setCreatedResult(ScoreCreationState.created)
                    } else {
                        setCreatedResult(ScoreCreationState.error)
                    }
                },
                rejectedValue => {
                    setCreatedResult(ScoreCreationState.error)
                }
            ).catch(reason => {
                alert('timeout' + reason)
            })
            return
        }
    }

    return (
        <Container fluid={"sm px-3 my-3"}>
            <Row>
                <Col lg={3}/>
                <Col lg={6}>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Row>
                                <Form.Group className={"mb-1"}>
                                    <Form.Label>Certificate ID</Form.Label>
                                    <Form.Control type={"text"} id={"certIdInput"}/>
                                    <Form.Text className={"text-muted"}>Certificate ID issued after the test</Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className={"mb-1"}>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type={"text"} id={"lastNameInput"}/>
                                    <Form.Text className={"text-muted"}>Last Name of the participant</Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className={"mb-1"}>
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type={"date"} id={"date"}/>
                                    <Form.Text className={"date"}>Date</Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className={"mb-1"}>
                                    <Form.Label>Score</Form.Label>
                                    <Form.Control type={"text"} id={"score"}/>
                                    <Form.Text className={"text-muted"}>Score</Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className={"mb-1"}>
                                    <Form.Label>Graph data</Form.Label>
                                    <Form.Control type={"text"} id={"graphData"}/>
                                    <Form.Text className={"text-muted"}>Graph data</Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className={"mb-1"}>
                                    <Form.Label>Tasks</Form.Label>
                                    <Form.Control type={"text"} id={"tasks"}/>
                                    <Form.Text className={"text-muted"}>Tasks</Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className={"mb-1"}>
                                    <Form.Label>Certification Body</Form.Label>
                                    <Form.Control type={"text"} id={"certBody"}/>
                                    <Form.Text className={"text-muted"}>Certification Body</Form.Text>
                                </Form.Group>
                            </Row>

                        </Row>

                        <Row>
                            <Form.Label visuallyHidden={createdResult !== ScoreCreationState.error}
                                        className={"text-danger"}>An error occurred while creating a certificate
                            </Form.Label>
                        </Row>
                        <Button variant="secondary" type={"submit"} id={"create_btn"}>Create</Button>
                    </Form>
                </Col>
                <Col lg={3}/>
            </Row>
        </Container>
    )
}

function setCreatedResult() {
    throw new Error("Function not implemented.");
}
