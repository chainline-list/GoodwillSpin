const Token = artifacts.require("Token");
const Wheel = artifacts.require("Wheel");

module.exports = async function(deployer){
	await deployer.deploy(Token);
    const token = await Token.deployed();

    await deployer.deploy(Wheel, token.address);
    const wheel = await Wheel.deployed();

    await token.passMinterRole(wheel.address);
}; 