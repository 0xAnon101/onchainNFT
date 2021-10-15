const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("RariNFT");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("NFT contract address: ", nftContract.address);

  let txn = await nftContract.makeRariNFT();
  await txn.wait();
  console.log("Minted NFT#1");
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
