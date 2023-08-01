(enforce-pact-version "2.3") ;should I?

; TODO: create or define a namespace
; TODO: ensure that GOVERNANCE allows to patch the smart contract only by admin (who is admin?)

(module programming-certification-test GOVERNANCE
    (defcap GOVERNANCE () true)
    (defconst NAMESPACE_GUARD (create-user-guard (succeed)))
    ; dummy keysets for testing
    (defconst cert-admin-keyset "368820f80c324bbc7c2b0610688a7da43e39f91d118732671cd9c7500ff43cca")
    (defconst cert-default-keyset "6be2f485a7af75fedb4b7f153a903f7e6000ca4aa501179c91a2450b777bd2a7")
    (defun succeed () true)
)

(define-namespace 'programming-certification NAMESPACE_GUARD NAMESPACE_GUARD)

(namespace "programming-certification")

(define-keyset "programming-certification.cert-admin-ks" (read-keyset "cert-admin-keyset")) ; creates keyset, but better to do it separately
(define-keyset "programming-certification.cert-default-ks" (read-keyset "cert-default-keyset")) ; creates keyset, but better to do it separately

(module programming-certification GOVERNANCE
    @doc "Contains logic to support creating and looking up the certifications records in the blockchain
    \as well as managing the certification organizations accounts
    \Version: 0.1
    \Author: Konstantin Gubanov"

    ;  todo: check capabilities
    (defcap GOVERNANCE ()
    ;  (enforce-guard (keyset-ref-guard 'some-keyset)))
        (enforce-keyset "programming-certification.cert-admin-ks")
    )
    

    ; a DB table should be first created for this schema

    (defschema cert-schema
        @doc "Schema for the certification"
        id: string
        name: string ; think about concatenation
        ; id-name: string
        certificationDate: time
        overallScore: decimal
        graphData ;custom type, TBD,
        testCodes ; list of tests passed
        ;  certificationBody: object{certification-authorities-} ;cert boby. Should it be stored on the chain in an other table?
        certificationBody: string
    )

    (deftable certifications:{cert-schema}
        @doc "Table to store the certificates"
    )

    (defschema certification-authorities-schema
        @doc "Schema for the certification bodies"
        id: string ; should be unique
        name: string 
        ;  account: string ; k:*****
        keyset: keyset
    )

    ; todo: it should be a gas station
    (deftable certification-authorities-table:{certification-authorities-schema}
        "Table to store the certification body accounts and their gas balances"
    )

    ;todo: function to retrieve data from the table

    (defun create-cert-body-account (id:string fullName:string keyset:keyset)
        @doc "Creates an account with KDA for the certificiation bodies which will push the certification results"
        ( enforce-keyset "programming-certification.cert-admin-ks" )
        ( enforce (!= (length fullName) 0) "Certification authority name can't be empty" )
        ( insert certification-authorities-table id 
            {
                "id": id,
                "name": fullName,
                "keyset": keyset
            }
        )
        ;  (coin.create-account name (describe-keyset "programming-certification.ks-"&id))
    )
    
    (defun create-credential(id name date overallScore graphData testCodes certificationBodyId)
        ; TODO: implement access rules for this function

        ;  (with-read certification-bodies cb
        ;      {
        ;          "keyset":=ks+"-"+certificationBodyId
        ;      }
        ;  )

        ;  (enforce-auth ks auth)
        ;  ( with-read certification-authorities-table certificationBodyId {"keyset" := keyset}
            ;  (enforce-one "Access denied"
                ;  [ (enforce-keyset keyset) (enforce-keyset 'cert-admin-ks) ]
            ;  )
        ;  )
        

        ;  TODO: add params verification

        (insert certifications id ; the id is not always stored with the data
            {
                "id": id,
                "name": name,
                "certificationDate": (time date),
                "overallScore": overallScore,
                "graphData": graphData,
                "certificationBody": certificationBodyId,
                "testCodes": testCodes
            }
        )
    )

    (defun read-certificate:string (id: string)
        @doc "retrieve certification by its id"
        (with-read certifications id
            {
                "id" := id,
                "name" := name,
                "certificationDate" := date,
                "overallScore" := overallScore,
                "graphData" := graphData,
                "testCodes" := testCodes,
                "certificationBody" := certificationBody
            }
            ; is there a better way to build this JSON response?
            (format "{\"id\":\"{}\", \"name\":\"{}\", \"date\":\"{}\", \"score\":\"{}\", \"graph\":\"{}\", \"testsTaken\":\"{}\", \"certOrg\":\"{}\"}" 
                [id,name,(format-time "%Y-%m-%d" date),overallScore,graphData,testCodes,certificationBody])
        )
    )

    ; todos: 
    ;  * credit cert-body account for gas
)

(create-table certifications) ; will it use the schema definition from the module without mentioning it explicitly?
(create-table certification-authorities-table)

;  (create-cert-body-account "cert-body" "Programming Certification" (read-keyset "programming-certification.cert-default-ks" ))