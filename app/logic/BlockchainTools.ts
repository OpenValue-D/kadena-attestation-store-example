import Pact from 'pact-lang-api'

const NETWORK_ID = "testnet01";
const CHAIN_ID = "1";
const API_HOST = "http://localhost:9001";

const KP = Pact.crypto.genKeyPair();

export default async function lookupCertificate(id: String, lastName: String): Promise<any> {
        const cmd = {
            // networkId: NETWORK_ID,
            keyPairs: KP,
            pactCode: Pact.lang.mkExp('programming-certification.programming-certification.read-certificate', id)
            // envData: {},
            // meta: {
            //     creationTime: Math.round(new Date().getTime() / 1000),
            //     ttl: 600,
            //     gasLimit: 600,
            //     chainId: CHAIN_ID,
            //     gasPrice: 0.0000001,
            //     sender: ""
            // }
        }

        return wrapPromiseWithTimeout(Pact.fetch.local(cmd, API_HOST), 3000)
    }
    
export function createCert(id: string, name: string) {
    const cmd = {
        keyPairs: KP,
        // Dummy data
        pactCode: Pact.lang.mkExp('programming-certification.programming-certification.create-credential', id, name, "2016-07-23T13:30:45Z", 100500.1, "as:12,s:1,r:23", "1,2,3A", "0")
    }
    
    return wrapPromiseWithTimeout(Pact.fetch.send(cmd, API_HOST), 3000)
}

export function wrapPromiseWithTimeout<T>(promise: Promise<T>, delayMs: number, reason: string = 'request timeout'): Promise<T> {
    const timeout = new Promise<never>((_, reject) =>{
        setTimeout(() => {
            reject(new Error(reason))
        }, delayMs)
    })
    return Promise.race<T>([promise, timeout])
}