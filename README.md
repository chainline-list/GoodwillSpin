# Goodwill Spin
Gamifying donation process

- Live Site:  https://goodwillspin.netlify.app/    (Harmony Testnet)
- YouTube: https://youtu.be/JrqaB9KaDnA

## Techologies
- React
- Ant Design
- Solidity
- Openzeppelin
- Magic
- Node.js
- Chainlink Price Feed

## Running the dapp on local host
- Run `npm i`
- Create a file called 'config.js' on the src folder and add the following code:
```
export const MAGICAPIKEY = '[YOUR MAGIC API KEY]';
export const SERVERLINK = 'http://localhost:4000'

```
- Create a file called '.env' on the project root folder and add the following code:
```
MNEMONIC="[YOUR MNEMONIC]"
```
- Run `truffle migrate --network onetestnet --reset` to deploy the contracts
- Run `npm start` to start the Dapp
- Open a new terminal, CD to `server` folder, and run `npm start` to start the server