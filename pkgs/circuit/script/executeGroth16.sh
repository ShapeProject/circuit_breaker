#!/bin/bash

# Variable to store the name of the circuit
CIRCUIT=ComputeRating

# Variable to store the number of the ptau file
PTAU=14

# In case there is a circuit name as an input
if [ "$1" ]; then
    CIRCUIT=$1
fi

# In case there is a ptau file number as an input
if [ "$2" ]; then
    PTAU=$2
fi

echo "----- Compile the circuit -----"
# Compile the circuit
circom ./src/${CIRCUIT}.circom --r1cs --wasm --sym --c --output build

echo "----- Generate the witness.wtns -----"
# Generate the witness.wtns
node build/${CIRCUIT}_js/generate_witness.js build/${CIRCUIT}_js/${CIRCUIT}.wasm ./data/input.json build/${CIRCUIT}_js/witness.wtns

echo "----- Generate zk-proof -----"
# Generate a zk-proof associated to the circuit and the witness. This generates proof.json and public.json
snarkjs groth16 prove ./zkey/${CIRCUIT}_final.zkey build/${CIRCUIT}_js/witness.wtns ./data/proof.json ./data/public.json

echo "----- Verify the proof -----"
# Verify the proof
snarkjs groth16 verify ./zkey/verification_key.json ./data/public.json ./data/proof.json

echo "----- Generate Solidity verifier -----"
# Generate a Solidity verifier that allows verifying proofs on Ethereum blockchain
snarkjs zkey export solidityverifier ./zkey/${CIRCUIT}_final.zkey sol/${CIRCUIT}Verifier.sol

# Update the solidity version in the Solidity verifier
sed 's/0.6.11;/0.8.20;/g' sol/${CIRCUIT}Verifier.sol > sol/${CIRCUIT}Verifier2.sol
# Update the contract name in the Solidity verifier
sed "s/contract Verifier/contract ${CIRCUIT}Verifier/g" sol/${CIRCUIT}Verifier2.sol > sol/${CIRCUIT}Verifier.sol
rm sol/${CIRCUIT}Verifier2.sol

echo "----- Generate and print parameters of call -----"
# Generate and print parameters of call
snarkjs generatecall data/public.json data/proof.json | tee ./data/calldata.json