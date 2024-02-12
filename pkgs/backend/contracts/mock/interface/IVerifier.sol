// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
interface IVerifier {
  function verifyProof(uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input) external returns (bool);
}