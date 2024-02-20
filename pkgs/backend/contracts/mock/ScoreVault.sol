// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import './interface/IVerifier.sol';
import '@openzeppelin/contracts/metatx/ERC2771Context.sol';

contract ScoreVault is ERC2771Context {

  // verifier Contract
  IVerifier public immutable verifierContract;

  // Score struct
  struct Score {
    string encryptedCount;
    string encryptedData;
  }

  mapping(address => Score) public scores;
  mapping(address => uint256) public setCount;

  // Event
  event UpdateScore(address msgSender, string encryptedCount, string encryptedData, uint256 newCount);
  event Verify(address msgSender, bool result);

  /**
   * constructor 
   */
  constructor(
    address _verifierContract,
    address _trustedForwarder
  ) ERC2771Context(_trustedForwarder) {
    verifierContract = IVerifier(_verifierContract);
  }

  /**
   * setScore method
   */
  function setScore(
    address _to,
    string memory _encryptedCount,
    string memory _encryptedData)
  external {
    scores[_to] = Score(_encryptedCount, _encryptedData);
    // increment setCount
    uint256 currentCount = setCount[_to];
    uint256 newCount = currentCount + 1;
    // update setCount
    setCount[_to] = newCount;

    emit UpdateScore(_to, _encryptedCount, _encryptedData, newCount);
  }

  /**
   * getScore method
   */
  function getScore(
    address _address
  ) 
    external 
    view 
    returns 
  (
    string memory, 
    string memory, 
    uint256
  ) {
    return (
      scores[_address].encryptedCount, 
      scores[_address].encryptedData, 
      setCount[_address]
    );
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

  ///////////////////////////////// ERC2771 method /////////////////////////////////

  function _msgSender()
    internal
    view
    virtual
    override
    returns (address sender)
  {
    if (isTrustedForwarder(msg.sender)) {
      // The assembly code is more direct than the Solidity version using `abi.decode`.
      /// @solidity memory-safe-assembly
      assembly {
        sender := shr(96, calldataload(sub(calldatasize(), 20)))
      }
    } else {
      return super._msgSender();
    }
  }

  function _msgData()
    internal
    view
    virtual
    override
    returns (bytes calldata)
  {
    if (isTrustedForwarder(msg.sender)) {
      return msg.data[:msg.data.length - 20];
    } else {
      return super._msgData();
    }
  }
}