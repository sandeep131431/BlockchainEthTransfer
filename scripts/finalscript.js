
const {ethers} = require("hardhat");

async function main() {
    const [owner, from1, from2, from3] = await ethers.getSigners();

    // Deploy contract
    const Chai = await ethers.getContractFactory("chai");
    const contract = await Chai.deploy();
    await contract.waitForDeployment();
    console.log("Contract deployed to:", await contract.getAddress());
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});