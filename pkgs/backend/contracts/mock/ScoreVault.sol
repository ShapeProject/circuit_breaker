// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import './interface/IVerifier.sol';

contract ScoreVault {

  // verifierContract
  IVerifier public immutable verifierContract;

  // Score struct
  struct Score {
    uint256 count;
    string encryptedData;
  }

  mapping(address => Score) public scores;

  // Event
  event UpdateScore(address msgSender, uint256 count, string encryptedData);
  event Verify(address msgSender, bool result);

  /**
   * constructor 
   */
  constructor(address _verifierContract) {
    verifierContract = IVerifier(_verifierContract);
  }

  /**
   * setScore method
   */
  function setScore(
    uint256 _count, 
    string memory _encryptedData)
   external {
    scores[msg.sender] = Score(_count, _encryptedData);
    emit UpdateScore(msg.sender, _count, _encryptedData);
  }

  /**
   * getScore method
   */
  function getScore(address _address) external view returns (uint256, string memory) {
    return (scores[_address].count, scores[_address].encryptedData);
  }

  /**
   * Verify method
   */
  function verifyProof(
    uint[2] memory a,
    uint[2][2] memory b,
    uint[2] memory c,
    uint[2] memory input
  ) public returns (bool r) {
    // call verifyProof method
    if(verifierContract.verifyProof(a,b,c,input)) {
      emit Verify(msg.sender, true);
      return true;
    } else {
      emit Verify(msg.sender, false);
      return false;
    }
  }
}