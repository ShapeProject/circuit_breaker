# circuit_breaker

## Deployed Contracts Info

| Conract Name | Address                                                                                                                         | Network        |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------ | :------------- |
| ScoreValut   | [0xacff3BF500e0E9F7734D39064B290873d80Fe749](https://sepolia.scrollscan.dev/address/0xacff3BF500e0E9F7734D39064B290873d80Fe749) | Scroll Sepolia |
| Forwarder    | [0x3140a4156db3a4077c41c2bcb22cc02ba407f0b5](https://sepolia.scrollscan.dev/address/0x3140a4156db3a4077c41c2bcb22cc02ba407f0b5) | Scroll Sepolia |
| Verifier     | [0x819cb57caEee4d4D10Dd583ffAe5DF4094EBb069](https://sepolia.scrollscan.dev/address/0x819cb57caeee4d4d10dd583ffae5df4094ebb069) | Scroll Sepolia |

## OpenZeppelin Defender Info

| No. | Address                                                                                                                         | Network        |
| :-- | :------------------------------------------------------------------------------------------------------------------------------ | :------------- |
| 1   | [0x1B38AB190EDf2bb4BcB2EC0b6639426731861581](https://sepolia.scrollscan.dev/address/0x1B38AB190EDf2bb4BcB2EC0b6639426731861581) | Scroll Sepolia |

## Created Ciruit

Circuit ID: 96ddd389-8412-4fa1-9033-1c608bbde247

## How to work

- setup `.env` & `.env.local`

  - create `.env` file in `backend` folder.  
    And you need to fill below.

    ```txt
    PRIVATE_KEY=
    SCROLLSCAN_API_KEY=
    DEFENDER_API_KEY=
    DEFENDER_SECRET_KEY=
    GAS_REPORT=
    COINMARKETCAP_API_KEY=
    ```

  - create `.env.local` file in `frontend` folder.  
    And you need to fill below.

    ```txt
    NEXT_PUBLIC_ENABLE_TESTNETS=
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=
    SCROLLSCAN_API_KEY=
    DEFENDER_API_KEY=
    DEFENDER_SECRET_KEY=
    BEARER_TOKEN=
    KEY_LENGTH=
    BACKEND_API_URL=
    CIRCUIT_ID=
    SINDRI_API_ENDPOINT=
    ```

- install

  ```bash
  yarn
  ```

- frontend build

  ```bash
  yarn frontend:build
  ```

- frontend run

  ```bash
  yarn build:dev
  ```

- smartcontract compile

  ```bash
  yarn backend:build
  ```

- smartcontract test

  ```bash
  yarn backend:test
  ```

- smartcontract deploy

  ```bash
  yarn backend:deploy:scrollSepolia
  ```

- call Mock contract `verifyproof` method

  ```bash
  yarn backend:script:verify:mock:scrollSepolia
  ```

- call Mock contract `verifyproof` method (Gasless)

  ```bash
  yarn backend:script:gaslessVerify:mock:scrollSepolia
  ```

- call Mock contract `setScore` method (Gasless)

  ```bash
  yarn backend:script:gaslessSetScore:mock:scrollSepolia
  ```

- compile circuit

  ```bash
  yarn circuit:executeGroth16
  ```

- test circuit

  ```bash
  yarn circuit:test
  ```

- execute getTxdata sample scripts

  ```bash
  yarn scripts:sample
  ```

  sample result

  ```bash
  Normal Transaction data: [
    .
    .
    .
  ]
  Normal Transaction count: 12
  Internal Transaction data: [
    .
    .
    .
  ]
  Internal Transaction count: 3
  Total Transaction count:15
  ================================== [END] ==================================
  ✨  Done in 1.61s.
  ```

## Backend APIs Overview

Before interacting with the backend APIs, ensure the frontend is built and running. Use the following command to start:

```bash
yarn build:dev
```

### 1. Generate Key Pairs

Generates a public and a private key for encryption and decryption.

- Endpoint: /api/generateKeyPairs
- Method: POST
- Request (req):
  ```
  { "name": "<your name>" }
  ```
- CURL Example:
  ```bash
  curl -X POST http://localhost:3000/api/generateKeyPairs -H "Content-Type: application/json" -d '{"name":"<your name>"}'
  ```

### 2. Encrypt Number

Encrypts a given number using the generated public key.

- Endpoint: /api/encrypt
- Method: POST
- Request (req):
  ```
  { "name": "<your name>", "num": "<put number>" }
  ```
- CURL Example:
  ```bash
  curl -X POST http://localhost:3000/api/encrypt -H "Content-Type: application/json" -d '{"name":"<your name>", "num":"<put number>"}'
  ```

### 3. Add Encrypted Numbers

Adds two encrypted numbers together, returning the encrypted sum.

- Endpoint: /api/add
- Method: POST
- Request (req):
  ```
  { "name": "<your name>", "encNum1": "<put encNum1>", "encNum2": "<put encNum2>" }
  ```
- CURL Example:
  ```bash
  curl -X POST http://localhost:3000/api/add -H "Content-Type: application/json" -d '{"name":"<your name>", "encNum1":"<put encNum1>", "encNum2":"<put encNum2>"}'
  ```

### 4. Decrypt Encrypted Number

Decrypts an encrypted number using the generated private key.

- Endpoint: /api/decypt
- Method: POST
- Request (req):
  ```
  { "name": "<your name>", "encNum": "<put encNum>" }
  ```
- CURL Example:
  ```bash
  curl -X POST http://localhost:3000/api/decrypt -H "Content-Type: application/json" -d '{"name":"<your name>", "encNum":"<put encNum>"}'
  ```
  This structured format provides a clear, concise description of each API endpoint, including the HTTP method used, a brief description, the request body format, and an example curl command to test the endpoint. Adjust the <your name>, <put number>, <put encNum1>, and <put encNum2> placeholders as necessary to match your actual use case.

### 4. Get Proof Detail

Retrieves the details of a proof using its unique proof ID.

- Endpoint: /api/getProofDetail
- Method: POST
- Request (req):
  ```
  { "proof_id": "<proof_id>" }
  ```
- CURL Example:
  ```bash
  curl -X POST http://localhost:3000/api/getProofDetail -H "Content-Type: application/json" -d '{"proof_id":"<proof_id>"}'
  ```

### 5. Submit Proof Input

Submits proof input for a circuit to generate a proof. This endpoint might typically be used to initiate the proving process for a specific circuit with given inputs.

- Endpoint: /api/submitProofInput
- Method: POST
- Request (req):
  ```
  {
  "name": "<your name>",
  "totalScore": "<totalScore>",
  "totalEvaluater": "<totalEvaluater>",
  "lineNumber": "<lineNumber>"
  }
  ```
- CURL Example:

  ```bash
  curl -X POST http://localhost:3000/api/submitProofInput -H "Content-Type: application/json" -d '{"name":"<your name>", "totalScore": "<totalScore>", "totalEvaluater": "<totalEvaluater>", "lineNumber": "<lineNumber>"}'

  ```

### 6. Check If Above Threshold

Checks if the calculated score is above a certain threshold. This endpoint might typically be used after submitting proof input and obtaining a proof to determine if the result meets a specific criterion.

- Endpoint: /api/isAbove
- Method: POST
- Request (req):

  ```
  {
  "name": "<your name>",
  "totalScore": "<totalScore>",
  "totalEvaluater": "<totalEvaluater>",
  "lineNumber": "<lineNumber>"
  }

  ```

- CURL Example:
  ```bash
  curl -X POST http://localhost:3000/api/isAbove -H "Content-Type: application/json" -d '{"name":"<your name>", "totalScore": "<totalScore>", "totalEvaluater": "<totalEvaluater>", "lineNumber": "<lineNumber>"}'
  ```

These additions provide a comprehensive overview of the backend APIs, including operations for generating key pairs, encrypting numbers, adding encrypted numbers, decrypting numbers, and interacting with proofs. Remember to replace <your name>, <totalScore>, <totalEvaluater>, <lineNumber>, and <proof_id> placeholders with actual values relevant to your use case.

### References

1. [particle-scroll-demo](https://particle-scroll-demo.replit.app/)
2. [GtiHub - particle-scroll-demo](https://github.com/TABASCOatw/particle-scroll-demo/tree/main)
3. [StackUp - particle-demo](https://docs.stackup.sh/docs/particle-demo)
4. [privy - Docs](https://docs.privy.io/)
5. [Transaction Fees on Scroll](https://docs.scroll.io/en/developers/transaction-fees-on-scroll/)
6. [Particle Network Web SDK Demo.](https://github.com/Particle-Network/particle-web-demo)
