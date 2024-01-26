'use client'
import {Col, Container, Row} from "react-bootstrap";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import getChartData from "../logic/ChartConfig";
import {getChartOptions} from "../logic/ChartConfig";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface SearchResultsAttestation {
    searchResults: JSON
}

export default function Result({searchResults}: SearchResultsAttestation) {
    return (
        <Container>
            <Row>
                <Col>
                    <h1>Your Attestation results</h1>
                </Col>
            </Row>
            <Row>
                <Col lg={4} sm={0}/>
                <Col lg={4} sm={12}>
                    <div>
                        <p>Name: {searchResults.name}</p>
                        <p>Date acquired: {searchResults.date}</p>
                        <p>Total Score: {searchResults.score}</p>
                        <p>Tests: {searchResults.testsTaken}</p>
                    </div>
                </Col>
                <Col lg={4} sm={0}/>
            </Row>
            <Row>
                <Col lg={4} sm={0}/>
                <Col lg={4} sm={12} >
                    <Radar data={getChartData(searchResults.graph.split(';'))} options={getChartOptions()} />
                </Col>
                <Col lg={4} sm={0}/>
            </Row>
        </Container>
    )
}