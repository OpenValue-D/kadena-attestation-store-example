import {useState} from "react";
import CreateEndorsement from "./CreateEndorsement";

export const enum ScoreCreationState {
    created, error
}
export default function ScoreCreation() {
    
    const [createdResult, setCreatedResult] = useState(ScoreCreationState.created)
    
    switch(createdResult) {
       
        case ScoreCreationState.created: return <CreateEndorsement createdResult={createdResult} setCreatedResult={setCreatedResult}/>
        case ScoreCreationState.error: return <CreateEndorsement createdResult={createdResult} setCreatedResult={setCreatedResult}/>
    }
    
}