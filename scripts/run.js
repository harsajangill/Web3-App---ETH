

/*
// script will make it wasy to iterate: compile, deploy, execute of a smart contract
const main = async () => {
    // compile the contract and generate the necessary files needed to work woth the contract under the 'artifacts' directory
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

    // Hardhat creates a local Ethereum network, only for this contract. After execution, the network is destroyed
    // Every execution of the contract, there is a fresh blockchain.
    // When deployed, our function becomes available to be called on the blockchain since we used a special public keyword on our function.
    // Think of this as a public API endpoint 
    const waveContract = await waveContractFactory.deploy();

    //wait until contract is officially deployed to the local blockchain
    // constructor called when it deploys.
    await waveContract.deployed();

    //waveContract.address gives the address of the deployed contract 
    //exact address found in the blockchain.
    console.log("Contract deployed to:", waveContract.address);
    
  };
  */

  /*
  const main = async () => {

    // In order to deploy a contract we need a wallet address.
    // This grabs wallet address of owner and another random wallet address 'randomPerson'
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
  
    
    console.log("Contract deployed to:", waveContract.address);
    //See the address of the person deploying the contract 
    console.log("Contract deployed by:", owner.address);
  
    // We must manually call our function like any regular API:

    // Returns total number of waves
    await waveContract.getTotalWaves();
  
    // Execute a wave
    const waveTxn = await waveContract.wave();
    await waveTxn.wait();

    //Return total number of waves
    await waveContract.getTotalWaves();

    //Simulate other people hitting our functions:

    const secondWaveTxn = await waveContract.connect(randomPerson).wave();
    await secondWaveTxn.wait();

    await waveContract.getTotalWaves();
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0); // exit Node process without error
    } catch (error) {
      console.log(error);
      process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
    // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
  };
  
  runMain();
  */

/*
* pareEther("0.1") = go deploy my contract and fund it with 0.1 ETH
*/


const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();
  console.log("Contract addy:", waveContract.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  /*
   * Let's try two waves now
   */
  const waveTxn = await waveContract.wave("This is wave #1");
  await waveTxn.wait();

  const waveTxn2 = await waveContract.wave("This is wave #2");
  await waveTxn2.wait();

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
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
