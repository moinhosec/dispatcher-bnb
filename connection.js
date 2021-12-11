const Web3 = require('web3')
const dotenv = require('dotenv');
dotenv.config();
class Connection {

    constructor() {
        this._endpoint = process.env.CONNECTION;
    }

    connect() {
        
        this._provider = new Web3 (
            new Web3.providers.HttpProvider(
                this._endpoint === 'testnet' ? process.env.LINK_TESTNET : process.env.LINK_FULLNODE
            )
        );
        
    } 

    get provider(){
        return this._provider
    }

    set provider(value){
        this._provider = value 
    }

}

module.exports = {
    Connection
}