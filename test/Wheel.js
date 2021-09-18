const { assert } = require('chai');

const Token = artifacts.require("Token");
const Wheel = artifacts.require("Wheel");

function tokensToWei(val) {
    return web3.utils.toWei(val, 'ether');
}

contract('Restaurants', ([deployer, account1]) => {
    let tokenBK;
    let wheelBK;

    before(async() => {
        tokenBK = await Token.new();
        wheelBK = await Wheel.new(tokenBK.address);

        await tokenBK.passMinterRole(wheelBK.address);
    });
    
    describe('buy tokens ', async() => {
        let result;
    
        it('received correct amount', async() => {
            let oldBalanace = await web3.eth.getBalance(account1);
            oldBalanace = new web3.utils.BN(oldBalanace);
            //oldBalanace -= tokensToWei('1');

            result = await wheelBK.buyTokens({ from: account1, value: tokensToWei('1') });
            
            let newBalanace = await web3.eth.getBalance(account1);
            newBalanace = new web3.utils.BN(newBalanace);

            assert.equal(oldBalanace.toString(), newBalanace.toString());
        });
    });
});