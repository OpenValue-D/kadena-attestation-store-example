import { createAttestation } from "@/app/logic/BlockchainTools";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import { ScoreCreationState } from "./ScoreCreation";
import { AttestationData } from "../model/Types";

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
            const id: string = event.currentTarget.attestationIdInput.value;
            const attestationData: AttestationData = {
                name: event.currentTarget.lastNameInput.value,
                date: event.currentTarget.date.value,
                score: event.currentTarget.score.value,
                tasks: event.currentTarget.tasks.value,
                body: event.currentTarget.attestationBody.value,
                graphData: {
                    skill1: event.currentTarget.skill1.value,
                    skill2: event.currentTarget.skill2.value,
                    skill3: event.currentTarget.skill3.value,
                    skill4: event.currentTarget.skill4.value,
                    skill5: event.currentTarget.skill5.value,
                    skill6: event.currentTarget.skill6.value,
                }
            };

            const createScorePromise = createAttestation(id, attestationData);

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
                                    <Form.Label>Attestation ID</Form.Label>
                                    <Form.Control type={"text"} id={"attestationIdInput"}/>
                                    <Form.Text className={"text-muted"}>Attestation ID issued after the test</Form.Text>
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
                                    <Form.Label>Skill 1</Form.Label>
                                    <Form.Control type={"number"} step={resultStepSize} id={"skill1"}/>
                                    <Form.Text className={"text-muted"}>Skill 1</Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className={"mb-1"}>
                                    <Form.Label>Skill 2</Form.Label>
                                    <Form.Control type={"number"} step={resultStepSize} id={"skill2"}/>
                                    <Form.Text className={"text-muted"}>Skill 2</Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className={"mb-1"}>
                                    <Form.Label>Skill 3</Form.Label>
                                    <Form.Control type={"number"} step={resultStepSize} id={"skill3"}/>
                                    <Form.Text className={"text-muted"}>Skill 3</Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className={"mb-1"}>
                                    <Form.Label>Skill 4</Form.Label>
                                    <Form.Control type={"number"} step={resultStepSize} id={"skill4"}/>
                                    <Form.Text className={"text-muted"}>Skill 4</Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className={"mb-1"}>
                                    <Form.Label>Skill 5</Form.Label>
                                    <Form.Control type={"number"} step={resultStepSize} id={"skill5"}/>
                                    <Form.Text className={"text-muted"}>Skill 5</Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className={"mb-1"}>
                                    <Form.Label>Skill 6</Form.Label>
                                    <Form.Control type={"number"} step={resultStepSize} id={"skill6"}/>
                                    <Form.Text className={"text-muted"}>Skill 6</Form.Text>
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
                                    <Form.Label>Attestation Body</Form.Label>
                                    <Form.Control type={"text"} id={"attestationBody"}/>
                                    <Form.Text className={"text-muted"}>Attestation Body</Form.Text>
                                </Form.Group>
                            </Row>

                        </Row>

                        <Row>
                            <Form.Label visuallyHidden={createdResult !== ScoreCreationState.error}
                                        className={"text-danger"}>An error occurred while creating an attestation
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
