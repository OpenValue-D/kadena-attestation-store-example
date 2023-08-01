import {useState} from "react";
import Result from "@/app/components/Result";
import CertificateLookupForm from "@/app/components/CertificateLookupForm";
import CertLoading from "@/app/components/CertLoading";

export const enum CertSearchAndShowState {
    search, loading, show, not_found, error
}
export default function CertSearchAndShow() {
    
    const [showResults, setShowResults] = useState(CertSearchAndShowState.search)
    const [searchResults, setSearchResults] = useState(JSON.parse("{}") as JSON)
    
    switch(showResults) {
        case CertSearchAndShowState.show: return <Result searchResults={searchResults}/>
        case CertSearchAndShowState.search:
        case CertSearchAndShowState.error:
        case CertSearchAndShowState.not_found: return <CertificateLookupForm searchState={showResults} 
                                                                             setSearchShowState={setShowResults} 
                                                                             setSearchResults={setSearchResults}/>
        case CertSearchAndShowState.loading: return <CertLoading/>
    }
    
}