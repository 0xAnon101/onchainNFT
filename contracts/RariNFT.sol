// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import { Base64 } from "./libraries/Base64.sol";

contract RariNFT is ERC721URIStorage {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  string _baseTokenURI;
  uint256 public MAX_MINT_LIMIT = 50;
  address public owner;
  mapping(uint256 => address) rariIndexToAddress;
  mapping (address => uint256) public _balanceOf;

  event NewRareNFTMinted(address _sender, uint256 _tokenId);

  constructor() ERC721 ("RariNAME", "NRARI") {
    owner = msg.sender;
  }

  modifier OnlyOwner {
    require(msg.sender == owner, "Sender is not owner!");
    _;
  }

  function getTotalNFTMintedSoFar() public view returns (uint256) {
    return _tokenIds.current();
  }

  function getUserNFTMintedSoFar() public view returns (uint256) {
    return _balanceOf[msg.sender];
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return _baseTokenURI;
  }

  function _setBaseTokenURI(string memory _uri) public OnlyOwner {
    _baseTokenURI = _uri;
  }

  function _pickRandomFirstWord(uint256 tokenId, string[9] memory firstWords) internal pure returns (string memory) {
      uint256 rand = random(string(abi.encodePacked("FIRST_WORD", Strings.toString(tokenId))));
      rand = rand % firstWords.length;
      return firstWords[rand];
  }

  function _pickRandomSecondWord(uint256 tokenId, string[8] memory secondWords) internal pure returns (string memory) {
    uint256 rand = random(string(abi.encodePacked("SECOND_WORD", Strings.toString(tokenId))));
    rand = rand % secondWords.length;
    return secondWords[rand];
  }

  function _pickRandomThirdWord(uint256 tokeId, string[9] memory thirdWords) internal pure returns(string memory) {
    uint256 rand = random(string(abi.encodePacked("THIRD_WORD", Strings.toString(tokeId))));
    rand = rand % thirdWords.length;
    return thirdWords[rand];
  }

  function _pickRandomColor(uint256 tokenId, string[6] memory colors) internal pure returns (string memory) {
    uint256 rand = random(string(abi.encodePacked("COLOR", Strings.toString(tokenId))));
    rand = rand % colors.length;
    return colors[rand];
  }

  function random(string memory input) internal pure returns (uint256) {
      return uint256(keccak256(abi.encodePacked(input)));
  }

  function _combineWords(uint256 newItemId) internal pure returns (string memory){
    string[9] memory firstWords = ["Saitama", "Goku", "Vegeta", "Luffy", "Ichigo", "Aomine", "Kira", "Naruto", "Deku"];
    string[8] memory secondWords = ["Slaps", "Punches", "Kicks", "Kills", "Loves", "Hates", "Envy", "Stares"];
    string[9] memory thirdWords = ["Lion", "Hyena", "Tiger", "Snake", "Elephant", "Cheetah", "Monkey", "Chimp", "Eagle"];
    string memory first = _pickRandomFirstWord(newItemId, firstWords);
    string memory second = _pickRandomSecondWord(newItemId, secondWords);
    string memory third = _pickRandomThirdWord(newItemId, thirdWords);
    string memory combinedWord = string(abi.encodePacked(first, second, third));

    return combinedWord;
  }

  function _tokenURI(uint256 newItemId) public pure returns (string memory) {
    string memory svgPartOne = "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='";
    string memory svgPartTwo = "'/><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";
    string[6] memory colors = ["red", "#08C2A8", "black", "yellow", "blue", "green"];
    string memory combinedWord = _combineWords(newItemId);
    string memory randomColor = _pickRandomColor(newItemId, colors);
    string memory finalSvg = string(abi.encodePacked(svgPartOne, randomColor, svgPartTwo, combinedWord, "</text></svg>"));
  
    string memory json = Base64.encode(
        bytes(string(abi.encodePacked(
            '{"name": "',
              combinedWord,
              '", "description": "A highly acclaimed collection of Rari Anime Names", "image": "data:image/svg+xml;base64,',
              Base64.encode(bytes(finalSvg)),
            '"}'
          ))));
    string memory finalTokenURI =  string(abi.encodePacked("data:application/json;base64, ", json));

    return finalTokenURI;
  }


  function makeRariNFT() public {
    uint256 newItemId = _tokenIds.current();
    require(MAX_MINT_LIMIT >= newItemId, "All NFT's has been minted!");

    string memory finalTokenURI = _tokenURI((newItemId));
    console.log(finalTokenURI);

    _safeMint(msg.sender, newItemId);
    _setTokenURI(newItemId, finalTokenURI);
    _tokenIds.increment();
    rariIndexToAddress[newItemId] = msg.sender;
    _balanceOf[msg.sender] += 1;

    emit NewRareNFTMinted(msg.sender, newItemId);
    console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);
  }
}
