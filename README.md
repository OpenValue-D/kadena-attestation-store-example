## Development of the smart contract.

All the functionalities related to smart contract are in pact directory.

To develop in Visual Studio Code use Pact and Pact Snippets extensions.

### Prerequisites

Generate types from the smart contract:
```bash
npx pactjs contract-generate --file "./pact/score_endorsement.pact"
```


1. How to install Pact and dependencies: 
```bash
brew install kadena-io/pact/pact
```

Install the pact-lang-api by running:
```bash
npm install pact-lang-api
```

2. How to run Pact: 

```bash
pact
```
Pact environment should open up. You can run any commands available in Pact from this environment.
You can verify by issuing: 
```bash
$ pact
pact> (+ 1 2)
3
pact> (+ "hello, " "world")
"hello, world"
```

3. How to run repl tests:
```bash
pact> (load "score_endorsement.repl")
```

4. How to deploy smart contract locally:

Start pact server on port defined in server.yaml config (8080).

```bash
run pact -s server.yaml
```

Before the deployment send request to the server that defines namespace and key-sets:
```bash
pact -a request/send/before_deployment.yaml | curl -H "Content-Type: application/json" -d @- http://localhost:8080/api/v1/send
```

In Response you will get a hash:
```json
{
  "requestKeys": [
    "wWvGbvOa7LCvWz8BLHgCRnMNbbF0UkxG6KCR5XKfkaI"
  ]
}
```

With this key you can get the result of the request: 
```bash
curl -H "Content-Type: application/json" -d '{"requestKeys":["wWvGbvOa7LCvWz8BLHgCRnMNbbF0UkxG6KCR5XKfkaI"]}' -X POST http://localhost:8080/api/v1/poll
```

```json
{
  "wWvGbvOa7LCvWz8BLHgCRnMNbbF0UkxG6KCR5XKfkaI": {
    "gas": 0,
    "result": {
      "status": "success",
      "data": "Keyset defined"
    },
    "reqKey": "wWvGbvOa7LCvWz8BLHgCRnMNbbF0UkxG6KCR5XKfkaI",
    "logs": "sIBiJ_PrbVN923Mh111T2ngyO4eQmM-d5KBLprYIxQ4",
    "metaData": null,
    "continuation": null,
    "txId": 5
  }
}
```

Send the next request to the server to initially deploy smart contract:

```bash
pact -a request/send/deploy_with_table_init.yaml | curl -H "Content-Type: application/json" -d @- http://localhost:8080/api/v1/send
```

Use requests from request/send to create and read score endorsements. 


## Development of the frontend part 

Project build on Next.js and React-Bootstrap

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Run:
```bash
npm run dev
```
to start the development server. 

Open [http://localhost:3000](http://localhost:3000)

Pact server has to be running locally.


## Testnet deplyoment

### Preparation
```bash
pact -a request/send/before_deployment_testnet.yaml | curl -H "Content-Type: application/json" -d @- https://api.testnet.chainweb.com/chainweb/0.0/testnet04/chain/1/pact/api/v1/send
```
In Response you will get a hash:
```json
{
  "requestKeys": [
    "wWvGbvOa7LCvWz8BLHgCRnMNbbF0UkxG6KCR5XKfkaI"
  ]
}
```
With this key you can get the result of the request: 
```bash
curl -H "Content-Type: application/json" -d '{"requestKeys":["wWvGbvOa7LCvWz8BLHgCRnMNbbF0UkxG6KCR5XKfkaI"]}' -X POST https://api.testnet.chainweb.com/chainweb/0.0/testnet04/chain/1/pact/api/v1/poll
```

### Deploy contract
```bash
pact -a request/send/deploy_contract_testnet.yaml | curl -H "Content-Type: application/json" -d @- https://api.testnet.chainweb.com/chainweb/0.0/testnet04/chain/1/pact/api/v1/send
```
In Response you will get a hash:
```json
{
  "requestKeys": [
    "wWvGbvOa7LCvWz8BLHgCRnMNbbF0UkxG6KCR5XKfkaI"
  ]
}
```

With this key you can get the result of the request: 
```bash
curl -H "Content-Type: application/json" -d '{"requestKeys":["wWvGbvOa7LCvWz8BLHgCRnMNbbF0UkxG6KCR5XKfkaI"]}' -X POST https://api.testnet.chainweb.com/chainweb/0.0/testnet04/chain/1/pact/api/v1/poll
```

### Create and read
There are also files to create and read entries. They work the same way.

pact -a request/send/create_score_endorsement_testnet.yaml | curl -H "Content-Type: application/json" -d @- https://api.testnet.chainweb.com/chainweb/0.0/testnet04/chain/1/pact/api/v1/send
pact -a request/send/read_score_endorsement_testnet.yaml | curl -H "Content-Type: application/json" -d @- https://api.testnet.chainweb.com/chainweb/0.0/testnet04/chain/1/pact/api/v1/send