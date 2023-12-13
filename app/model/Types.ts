export type CertificateData = {
    name: string;
    date: string;
    score: string;
    tasks: string;
    body: string;
    graphData: GraphData;
}

export type GraphData = {
    codingSpeed: number;
    unitTest: number;
    regression: number;
    implement: number;
    objectOrientation: number;
    refactor: number;
}