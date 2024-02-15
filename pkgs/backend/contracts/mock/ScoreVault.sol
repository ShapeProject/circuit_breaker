// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import './interface/IVerifier.sol';
import '@openzeppelin/contracts/metatx/ERC2771Context.sol';

contract ScoreVault is ERC2771Context {

  // verifier Contract
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
    uint256 _count, 
    string memory _encryptedData)
  external {
    scores[_to] = Score(_count, _encryptedData);
    emit UpdateScore(_to, _count, _encryptedData);
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