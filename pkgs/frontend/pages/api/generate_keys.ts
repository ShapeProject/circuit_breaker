import * as bcu from 'bigint-crypto-utils';

interface PaillierParameters {
    n: bigint;
    g: bigint;
    lambda: bigint;
    mu: bigint;
}

async function calculatePaillierParameters(): Promise<PaillierParameters> {
    const p: bigint = 3n;
    const q: bigint = 11n;
    const n: bigint = p * q;
    const lambda: bigint = bcu.lcm(p - 1n, q - 1n);
    const g: bigint = n + 1n;
    const nSquared: bigint = n ** 2n;

    // L function definition
    function L(x: bigint): bigint {
        return (x - 1n) / n;
    }

    // g^lambda mod n^2
    const gLambdaModNSquared: bigint = bcu.modPow(g, lambda, nSquared);

    // L(g^lambda mod n^2)
    const LResult: bigint = L(gLambdaModNSquared);

    // mu = (L(g^lambda mod n^2))^-1 mod n
    const mu: bigint = bcu.modInv(LResult, n);

    return { n, g, lambda, mu };
}

calculatePaillierParameters().then(params => {
    console.log('Parameters:', params);
}).catch(console.error);
