import { createCert } from "@/app/logic/BlockchainTools";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import { ScoreCreationState } from "./ScoreCreation";
import { CertificateData } from "../model/Types";

interface CreateEndorsementProps {
    createdResult: ScoreCreationState
    setCreatedResult: (state: ScoreCreationState) => void
}

const resultStepSize: number = 0.1;

export default function CreateEndorsement({createdResult, setCreatedResult}: CreateEndorsementProps) {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault() //prevent auto form submitting and page reloading
        // @ts-ignore
        if (event.nativeEvent.submitter.id === "create_btn") {
            const id: string = event.currentTarget.certIdInput.value;
            const certData: CertificateData = {
                name: event.currentTarget.lastNameInput.value,
                date: event.currentTarget.date.value,
                score: event.currentTarget.score.value,
                tasks: event.currentTarget.tasks.value,
                body: event.currentTarget.certBody.value,
                graphData: {
                    codingSpeed: event.currentTarget.codingSpeed.value,
                    unitTest: event.currentTarget.unitTest.value,
                    regression: event.currentTarget.regression.value,
                    implement: event.currentTarget.implement.value,
                    objectOrientation: event.currentTarget.objectOrientation.value,
                    refactor: event.currentTarget.refactor.value,
                }
            };

            const createScorePromise = createCert(id, certData);

            createScorePromise.then(
                resolvedValue => {
                    if (resolvedValue && resolvedValue.result.status === "success") {
                        setCreatedResult(ScoreCreationState.created)
                    } else {
                        setCreatedResult(ScoreCreationState.error)
                    }
                },
                rejectedValue => {
                    console.log(rejectedValue);
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
                                    <Form.Control type={"number"} step={resultStepSize} id={"score"}/>
                                    <Form.Text className={"text-muted"}>Score</Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                Graph Data
                            </Row>
                            <Row>
                                <Form.Group className={"mb-1"}>
                                    <Form.Label>Coding Speed</Form.Label>
                                    <Form.Control type={"number"} step={resultStepSize} id={"codingSpeed"}/>
                                    <Form.Text className={"text-muted"}>Coding Speed</Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className={"mb-1"}>
                                    <Form.Label>Unit Test</Form.Label>
                                    <Form.Control type={"number"} step={resultStepSize} id={"unitTest"}/>
                                    <Form.Text className={"text-muted"}>Unit Test</Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className={"mb-1"}>
                                    <Form.Label>Regression</Form.Label>
                                    <Form.Control type={"number"} step={resultStepSize} id={"regression"}/>
                                    <Form.Text className={"text-muted"}>Regression</Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className={"mb-1"}>
                                    <Form.Label>Implement</Form.Label>
                                    <Form.Control type={"number"} step={resultStepSize} id={"implement"}/>
                                    <Form.Text className={"text-muted"}>Implement</Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className={"mb-1"}>
                                    <Form.Label>Object Orientation</Form.Label>
                                    <Form.Control type={"number"} step={resultStepSize} id={"objectOrientation"}/>
                                    <Form.Text className={"text-muted"}>Object Orientation</Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className={"mb-1"}>
                                    <Form.Label>Refactor</Form.Label>
                                    <Form.Control type={"number"} step={resultStepSize} id={"refactor"}/>
                                    <Form.Text className={"text-muted"}>Refactor</Form.Text>
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
