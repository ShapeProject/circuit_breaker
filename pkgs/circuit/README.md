### GitHub Action sample workflow

```yml
circuit-test:
  runs-on: ubuntu-latest
  needs: [setup]
  steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
    - uses: actions/cache@v3
      with:
        path: "**/node_modules"
        key: ${{ runner.os }}-${{ hashFiles('**/yarn.lock') }}
    - name: Circuit test
      run: yarn circuit:test
      env:
        CI: true
```
