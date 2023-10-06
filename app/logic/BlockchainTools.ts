import { Time } from 'highcharts';
import Pact from 'pact-lang-api'

const NETWORK_ID = "testnet01";
const CHAIN_ID = "1";
const API_HOST = "http://localhost:8080";


const userKeySet = Pact.KeyPair = {
    publicKey: "eed1f83db0fcced5a668c2e397bedfe3ed33643f0f919426edca52bbd2e215c0",
    secretKey: "73ee51d18cdd0bbc3a944b9dcd6cd6f109082974753216043cf157db8cdbdeb1",
}

export default async function lookupCertificate(id: String, lastName: String): Promise<any> {
    const cmd = {
        keyPairs: [],
        pactCode: Pact.lang.mkExp('free.score-endorsement-module.read-score-endorsement', id, lastName)
    }

    return wrapPromiseWithTimeout(Pact.fetch.local(cmd, API_HOST), 3000)
}

export async function createCert(id: String, name: String, date: Date, score: string, graphData: String, tasks: String, endorsementBody: String): Promise<any> {
    const parsedScore=parseFloat(score) 
    const cmd = {
        keyPairs: userKeySet,
        pactCode: Pact.lang.mkExp('free.score-endorsement-module.create-score-endorsement', id, name, date, parsedScore, graphData, tasks, endorsementBody)
    }
    const response = await Pact.fetch.send(cmd, API_HOST);

    return wrapPromiseWithTimeout(Pact.fetch.listen({ listen: response.requestKeys[0] },
        API_HOST), 3000)
}

export function wrapPromiseWithTimeout<T>(promise: Promise<T>, delayMs: number, reason: string = 'request timeout'): Promise<T> {
    const timeout = new Promise<never>((_, reject) => {
        setTimeout(() => {
            reject(new Error(reason))
        }, delayMs)
    })
    return Promise.race<T>([promise, timeout])
}