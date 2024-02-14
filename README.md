# circuit_breaker

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
    NEXT_PUBLIC_ENABLE_TESTNETS=true
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=""
    NEXT_PUBLIC_SINDRI_API_KEY=""
    SCROLLSCAN_API_KEY=""
    DEFENDER_API_KEY=""
    DEFENDER_SECRET_KEY=""
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

### References

1. [particle-scroll-demo](https://particle-scroll-demo.replit.app/)
2. [GtiHub - particle-scroll-demo](https://github.com/TABASCOatw/particle-scroll-demo/tree/main)
3. [StackUp - particle-demo](https://docs.stackup.sh/docs/particle-demo)
4. [privy - Docs](https://docs.privy.io/)
5. [Transaction Fees on Scroll](https://docs.scroll.io/en/developers/transaction-fees-on-scroll/)
6. [Particle Network Web SDK Demo.](https://github.com/Particle-Network/particle-web-demo)
