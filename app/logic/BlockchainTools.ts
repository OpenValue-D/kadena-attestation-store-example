import { IClient, ICommand, ICommandResult, IKeypair, ITransactionDescriptor, IUnsignedCommand, Pact, createClient, createSignWithKeypair, isSignedTransaction } from '@kadena/client';
import { AttestationData } from '../model/Types';
import type { ILocalCommandResult } from '@kadena/chainweb-node-client';

const chainId: string = process.env.NEXT_PUBLIC_CHAIN_ID ?? "0";
const networkId: string = process.env.NEXT_PUBLIC_NETWORK_ID ?? "";

const gasLimit: number | undefined = process.env.NEXT_PUBLIC_BLOCKCHAIN_GAS_LIMIT ? parseFloat(process.env.NEXT_PUBLIC_BLOCKCHAIN_GAS_LIMIT) : undefined;
const gasPrice: number | undefined = process.env.NEXT_PUBLIC_BLOCKCHAIN_GAS_PRICE ? parseFloat(process.env.NEXT_PUBLIC_BLOCKCHAIN_GAS_PRICE) : undefined;

if (!process.env.NEXT_PUBLIC_API_HOST) { throw new Error("API_HOST missing in .env!")}
const client: IClient = createClient(process.env.NEXT_PUBLIC_API_HOST ?? "");

if (!process.env.NEXT_PUBLIC_USER_PUBLIC_KEY) { throw new Error("USER_PUBLIC_KEY missing in .env!") };
if (!process.env.NEXT_PUBLIC_USER_SECRET_KEY) { throw new Error("USER_SECRET_KEY missing in .env!") };
const userKeySet: IKeypair =  {
    publicKey: process.env.NEXT_PUBLIC_USER_PUBLIC_KEY ?? "",
    secretKey: process.env.NEXT_PUBLIC_USER_SECRET_KEY ?? "",
}

const readTimeoutSeconds: number = parseInt(process.env.NEXT_PUBLIC_BLOCKCHAIN_READ_TIMEOUT_SECONDS ?? "3");
const writeTimeoutSeconds: number = parseInt(process.env.NEXT_PUBLIC_BLOCKCHAIN_WRITE_TIMEOUT_SECONDS ?? "3");

export default async function lookupAttestation(id: string, lastName: string): Promise<any> {
    
    const transaction: IUnsignedCommand = Pact.builder
        .execution(
            Pact.modules['free.score-endorsement-module']['read-score-endorsement'](id, lastName)
        )
        .setMeta({ 
            chainId: chainId,
        })
        .setNetworkId(networkId)
        .createTransaction();

        const res = client.local(transaction);

    return wrapPromiseWithTimeout(res, readTimeoutSeconds)
}

export async function createAttestation(id: string, attestationData: AttestationData): Promise<any> {    
    const parsedScore: number =parseFloat(attestationData.score) 
    const graphDataList: number[] = [
        attestationData.graphData.skill1,
        attestationData.graphData.skill2, 
        attestationData.graphData.skill3,
        attestationData.graphData.skill4, 
        attestationData.graphData.skill5, 
        attestationData.graphData.skill6, 
    ];
    // we currently cannot store json on chain, thus we just join this
    const parsedGraphData: string = graphDataList.join(';');

    const transaction: IUnsignedCommand = Pact.builder
    .execution(
      Pact.modules['free.score-endorsement-module']['create-score-endorsement']
      ( id, attestationData.name, attestationData.date, {decimal: parsedScore}, parsedGraphData, attestationData.tasks, attestationData.body),
    )
    .addSigner(userKeySet.publicKey, (withCapability) => [
        withCapability('coin.GAS'),
        withCapability('free.score-endorsement-module.CREATE_SCORE_ENDORSEMENT'),
    ])
    .addKeyset('ks', 'keys-all', userKeySet.publicKey)
    .setMeta({ 
        chainId: chainId,
        senderAccount: userKeySet.publicKey, // pays the gas
        gasLimit: gasLimit,
        gasPrice: gasPrice,
        ttl: writeTimeoutSeconds,
    })
    .setNetworkId(networkId)
    .createTransaction(); 

    // sign with keystore to not wait for manual approval
    const signWithKeystore = createSignWithKeypair(userKeySet);
    const signedTx: IUnsignedCommand | ICommand = await signWithKeystore(transaction);
    
    if (!isSignedTransaction(signedTx)) {
        return Promise.reject(new Error("Failed to sign Transaction!"));
    }

    // do not execute on error - saves gas
    const localResponse: ILocalCommandResult = await client.preflight(signedTx);
    if(localResponse.result.status !== 'success') {
        console.log(localResponse.result.error);
        return Promise.reject(new Error("Failed to preflight Transaction!"));
    }

    const transactionDescriptor: ITransactionDescriptor = await client.submit(signedTx);
    const response: Promise<ICommandResult> = client.listen(transactionDescriptor);
    return wrapPromiseWithTimeout(response, writeTimeoutSeconds);
}

export function wrapPromiseWithTimeout<T>(promise: Promise<T>, delaySeconds: number, reason: string = 'request timeout'): Promise<T> {
    const timeout = new Promise<never>((_, reject) => {
        setTimeout(() => {
            reject(new Error(reason))
        }, delaySeconds * 1000)
    })
    return Promise.race<T>([promise, timeout])
}