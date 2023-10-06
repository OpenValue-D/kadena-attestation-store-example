'use client'
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import React from "react";
import lookupCertificate, {createCert} from "../logic/BlockchainTools"
import {CertSearchAndShowState} from "@/app/components/CertSearchAndShow"

interface CertificateLookupFormProps {
    searchState: CertSearchAndShowState
    setSearchShowState: (state: CertSearchAndShowState) => void
    setSearchResults: (searchResults: JSON) => void
}

export default function CertificateLookupForm({searchState, setSearchShowState, setSearchResults}: CertificateLookupFormProps) {

    function convertResultsToJson(data: Object): JSON {
        return JSON.parse(JSON.stringify(data))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault() //prevent auto form submitting and page reloading
        setSearchShowState(CertSearchAndShowState.loading)
        const id = event.currentTarget.certIdInput.value
        const name = event.currentTarget.lastNameInput.value

        const certPromise= lookupCertificate(id, name)
        
        certPromise.then(
            resolvedValue => {
                if (resolvedValue && resolvedValue.result.status === "success") {
                    setSearchResults(convertResultsToJson(resolvedValue.result.data))
                    setSearchShowState(CertSearchAndShowState.show)
                } else {
                    setSearchShowState(CertSearchAndShowState.not_found)
                }
            },
            rejectedValue => {
                //todo: error handling
                setSearchShowState(CertSearchAndShowState.error)
            }
        ).catch(reason => {
            alert('timeout' + reason)
        })
    }
    
    return (
        <Container fluid={"sm px-3 my-3"}>
            <Row>
                <Col lg={3}/>
                <Col lg={6}>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group className={"mb-1"}>
                                    <Form.Label>Certificate ID</Form.Label>
                                    <Form.Control type={"text"} id={"certIdInput"}/>
                                    <Form.Text className={"text-muted"}>Certificate ID issued after the test</Form.Text>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className={"mb-1"}>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type={"text"} id={"lastNameInput"}/>
                                    <Form.Text className={"text-muted"}>Last Name of the participant</Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Label visuallyHidden={searchState !== CertSearchAndShowState.not_found} 
                                        className={"text-danger"}>No results found for given ID and Last Name
                            </Form.Label>
                            <Form.Label visuallyHidden={searchState !== CertSearchAndShowState.error}
                                        className={"text-danger"}>An error occurred while searching for certificate
                            </Form.Label>
                        </Row>
                        <Button variant="primary" type={"submit"}>Search</Button>
                    </Form>
                </Col>
                <Col lg={3}/>
            </Row>
        </Container>
    )
}