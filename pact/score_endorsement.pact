(namespace "free")

(enforce-keyset (read-keyset "score-admin-keyset"))
(define-keyset "free.score-admin-keyset" (read-keyset "score-admin-keyset"))
  

(module score-endorsement-module "free.score-admin-keyset"

(defcap CREATE_SCORE_ENDORSEMENT ()
      @doc "Enforce only score user account can create score endorsement."
      (enforce-guard (keyset-ref-guard "free.score-user-keyset")))

    (defschema score-endorcement-schema
        id: string
        nameHash: string
        scoreEndorsementDate: string
        overallScore: decimal
        graphData: string
        testCodes: string
        scoreEndorsementBody: string
    )

    (deftable score-endorcements:{score-endorcement-schema}
        @doc "Table to store the score endorcement"
    )
    
    (defun create-score-endorsement:string (id name date overallScore graphData testCodes scoreEndorsementBodyId)
    (with-capability (CREATE_SCORE_ENDORSEMENT)
        (insert score-endorcements id
            {
                "id": id,
                "nameHash": (hash name),
                "scoreEndorsementDate":  date,
                "overallScore":  overallScore,
                "graphData": graphData,
                "testCodes": testCodes,
                "scoreEndorsementBody": scoreEndorsementBodyId 
            }
        )
        )
    )

    (defun read-score-endorsement:object (id: string lastname: string)
    
        (with-read score-endorcements id
            {
                "id" := id,
                "nameHash" := name,
                "scoreEndorsementDate" :=  date,
                "overallScore" := overallScore,
                "graphData" := graphData,
                "testCodes" := testCodes,
                "scoreEndorsementBody" := scoreEndorsementBody
               
            }

            (enforce (= name (hash lastname)) "Name is incorrect" )

            {
                 
                "id" : id,
                "name" : lastname,
                "date" :  date,
                "score" : overallScore,
                "graph" : graphData,
                "testsTaken" : testCodes,
                "scoreEndorsementOrg" : scoreEndorsementBody
            }
        )
    )
)

(if (read-msg "init")
(create-table score-endorcements)
  "Upgrade complete")
  