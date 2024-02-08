import * as paillierBigint from 'paillier-bigint';
import * as bcu from 'bigint-crypto-utils';

// Extend the BigInt prototype to include a toJSON method
declare global {
    interface BigInt {
        toJSON(): string;
    }
}

BigInt.prototype.toJSON = function(): string { return this.toString(); };

async function paillierTest(): Promise<void> {
    // Asynchronous creation of a random private, public key pair for the Paillier cryptosystem
    const { publicKey, privateKey } = await paillierBigint.generateRandomKeys(2048);

    console.log('# private_key  ');
    console.log(JSON.stringify(privateKey, null, 4));
    console.log('\n');

    console.log('#  public_key  ');
    console.log(JSON.stringify(publicKey, null, 4));
    console.log('\n');

    const m1: bigint = 80n;
    const m2: bigint = 90n;
  
    // Encryption/decryption
    console.log('# encrypted m1=80  ');
    const c1: bigint = publicKey.encrypt(m1);
    console.log(c1.toString());
    console.log('\n');
  
    console.log('# encrypted m2=90  ');
    const c2: bigint = publicKey.encrypt(m2);
    console.log(c2.toString());
    console.log('\n');

    // Homomorphic addition of two ciphertexts (encrypted numbers)
    console.log('# encrypted m1+m2  ');
    const encryptedSum: bigint = publicKey.addition(c1, c2);
    console.log(encryptedSum.toString());
    console.log('\n');

    console.log('# decrypted m1+m2  ');
    const lambda: bigint = privateKey.lambda;
    const n: bigint = publicKey.n;
    const nn: bigint = publicKey._n2;
    const mu: bigint = privateKey.mu;
    const denom: bigint = (bcu.modPow(encryptedSum, lambda, nn) - 1n) / publicKey.n;
    const m: bigint = denom * mu % n;
    console.log(m.toString());
}

paillierTest();
