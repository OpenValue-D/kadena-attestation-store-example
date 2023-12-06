import { Time } from 'highcharts';
import { IKeypair, Pact, createClient, createSignWithKeypair, isSignedTransaction, signWithChainweaver } from '@kadena/client';

const NETWORK_ID = "testnet01";
const CHAIN_ID = "1";
const API_HOST = "http://localhost:8080";


const userKeySet: IKeypair =  {
    publicKey: "eed1f83db0fcced5a668c2e397bedfe3ed33643f0f919426edca52bbd2e215c0",
    secretKey: "73ee51d18cdd0bbc3a944b9dcd6cd6f109082974753216043cf157db8cdbdeb1",
}

const adminKeySet: IKeypair =  {
    publicKey: "ba54b224d1924dd98403f5c751abdd10de6cd81b0121800bf7bdbdcfaec7388d",
    secretKey: "8693e641ae2bbe9ea802c736f42027b03f86afe63cae315e7169c9c496c17332",
}


export default async function lookupCertificate(id: string, lastName: string): Promise<any> {
    
    const transaction = Pact.builder
        .execution(
            Pact.modules['free.score-endorsement-module']['read-score-endorsement'](id, lastName)
        )
        .setMeta({ 
            chainId: '1',
            //gasLimit: 1000,
            //gasPrice: 1.0e-6,
            //senderAccount,
            //ttl: 10 * 60, // 10 minutes
        })
        //.setNetworkId('mainnet01')
        .createTransaction();
    
    const client = createClient(API_HOST);

    const res = client.local(transaction);

    return wrapPromiseWithTimeout(res, 3000)
}

export async function createCert(id: String, name: String, date: Date, score: string, graphData: String, tasks: String, endorsementBody: String): Promise<any> {    
    const parsedScore=parseFloat(score) 

    const transaction = Pact.builder
    .execution(
      Pact.modules['free.score-endorsement-module']['create-score-endorsement']( id, name, date, {decimal: parsedScore}, graphData, tasks, endorsementBody),
    )
    .addSigner(userKeySet.publicKey//, (withCapability) => [withCapability('coin.GAS')]
      )
    //.addKeyset('free', 'score-user-keyset', userKeySet.publicKey)
    .addKeyset('ks', 'keys-all', userKeySet.publicKey)
    .setMeta({ 
        chainId: '1',
        //senderAccount: userKeySet.publicKey, // pays the gas
        //gasLimit: 1000,
        //gasPrice: 1.0e-6,
        //ttl: 10 * 60, // 10 minutes
    })
    //.setNetworkId(NETWORK_ID)
    .createTransaction(); 

    // sign with keystore to not wait for manual approval
    const signWithKeystore = createSignWithKeypair(userKeySet);
    const signedTx = await signWithKeystore(transaction);
    
    const client = createClient(API_HOST);

    if (!isSignedTransaction(signedTx)) {
        throw new Error("Failed to sign Transaction!");
    }
    //if (isSignedTransaction(signedTx)) {
        //const transactionDescriptor = await client.submit(signedTx);
        //const response = await client.listen(transactionDescriptor, {});
        //if (response.result.status === 'failure') {
        //throw response.result.error;
        //} else {
       //console.log(response.result);
        //}
    //}

    // do not execute on error - saves gas
    const localResponse = await client.preflight(signedTx);
    if(localResponse.result.status !== 'success') {
        throw new Error("Failed to preflight Transaction!");
    }

    const transactionDescriptor = await client.submit(signedTx);
    const response = client.listen(transactionDescriptor);
    return wrapPromiseWithTimeout(response, 3000);
}

export function wrapPromiseWithTimeout<T>(promise: Promise<T>, delayMs: number, reason: string = 'request timeout'): Promise<T> {
    const timeout = new Promise<never>((_, reject) => {
        setTimeout(() => {
            reject(new Error(reason))
        }, delayMs)
    })
    return Promise.race<T>([promise, timeout])
}