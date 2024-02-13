# circuit_breaker

## How to work

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

### References

1. [particle-scroll-demo](https://particle-scroll-demo.replit.app/)
2. [GtiHub - particle-scroll-demo](https://github.com/TABASCOatw/particle-scroll-demo/tree/main)
3. [StackUp - particle-demo](https://docs.stackup.sh/docs/particle-demo)
4. [privy - Docs](https://docs.privy.io/)
5. [Transaction Fees on Scroll](https://docs.scroll.io/en/developers/transaction-fees-on-scroll/)
6. [Particle Network Web SDK Demo.](https://github.com/Particle-Network/particle-web-demo)
