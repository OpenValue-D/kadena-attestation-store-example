import {useState} from "react";
import Result from "@/app/components/Result";
import AttestationLookupForm from "@/app/components/AttestationLookupForm";
import AttestationLoading from "@/app/components/AttestationLoading";

export const enum AttestationSearchAndShowState {
    search, loading, show, not_found, error
}
export default function AttestationSearchAndShow() {
    
    const [showResults, setShowResults] = useState(AttestationSearchAndShowState.search)
    const [searchResults, setSearchResults] = useState(JSON.parse("{}") as JSON)
    
    switch(showResults) {
        case AttestationSearchAndShowState.show: return <Result searchResults={searchResults}/>
        case AttestationSearchAndShowState.search:
        case AttestationSearchAndShowState.error:
        case AttestationSearchAndShowState.not_found: return <AttestationLookupForm searchState={showResults} 
                                                                             setSearchShowState={setShowResults} 
                                                                             setSearchResults={setSearchResults}/>
        case AttestationSearchAndShowState.loading: return <AttestationLoading/>
    }
    
}