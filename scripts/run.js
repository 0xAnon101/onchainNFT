const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("RariNFT");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("NFT contract address: ", nftContract.address);

  let txn = await nftContract.makeRariNFT();
  await txn.wait();
  console.log("Minted NFT#1");

  txn = await nftContract.makeRariNFT();
  await txn.wait();
  console.log("Minted NFT#2");

  txn = await nftContract.makeRariNFT();
  await txn.wait();
  console.log("Minted NFT#3");

  const total = await nftContract.getTotalNFTMintedSoFar();
  console.log(total.toNumber(), "total nft minted");

  const userTotal = await nftContract.getUserNFTMintedSoFar();
  console.log(userTotal.toNumber(), "user total nft mint count");
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
