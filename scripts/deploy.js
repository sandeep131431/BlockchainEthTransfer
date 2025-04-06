const { ethers } = require("hardhat");

async function getBalance(address) {
    const balanceBigInt = await ethers.provider.getBalance(address);
    return ethers.formatEther(balanceBigInt);
}
async function consoleBalances(addresses) {
    for(let i = 0; i < addresses.length; i++) {
        console.log(`Address ${i} balance:`, await getBalance(addresses[i]));
    }
}
async function consoleMemos(memos) {
    for(const memo of memos) {
        console.log(`At ${memo.timestamp}, name ${memo.name}, from ${memo.from}, message: ${memo.message}`);
    }
}
async function main() {
    const [owner, from1, from2, from3] = await ethers.getSigners();

    // Deploy contract
    const Chai = await ethers.getContractFactory("chai");
    const contract = await Chai.deploy();
    await contract.waitForDeployment();

    console.log("Contract deployed to:", await contract.getAddress());
    const addresses = [
        owner.address,
        from1.address,
        from2.address,
        from3.address
    ];
    console.log("Balances before buying chai:");
    await consoleBalances(addresses);
    const amount = {value: ethers.parseEther("1")};
    await contract.connect(from1).buyChai("sandeep", "very nice chai", amount);
    await contract.connect(from2).buyChai("sunita", "good", amount);
    console.log("Balances after buying chai:");
    await consoleBalances(addresses);
    const memos = await contract.getMemos();
    console.log("Memos:");
    await consoleMemos(memos);
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});