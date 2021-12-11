const dotenv = require('dotenv');
dotenv.config();

class Contract {

    /**
     * 
     * Instancia da conexão com o provedor web3
     * 
     * @param {object} provider 
     */
    constructor(provider){
        this._endpoint = process.env.CONNECTION;
        this._provider = provider

        this._routerContract = new provider.eth.Contract(
            JSON.parse(process.env.ROUTER_ABI),
            this._endpoint === 'testnet' ? process.env.ROUTER_ADDRESS_TESTNET : process.env.ROUTER_ADDRESS_MAIN,
            
        )

        this._busdContract = new provider.eth.Contract(
            JSON.parse(process.env.ERC20_ABI),
            this._endpoint === 'testnet' ? process.env.BUSD_ADDRESS_TESTNET : process.env.BUSD_ADDRESS_MAINNET,            
        )

        this._etherContract = new provider.eth.Contract(
            JSON.parse(process.env.ERC20_ABI),
            this._endpoint === 'testnet' ? process.env.ETHER_ADDRESS_TESTNET : process.env.ETHER_ADDRESS_MAIN,            
        )

    }

    get router_contract() {
        return this._routerContract
    }

    get busd_contract(){
        return this._busdContract
    }

    get ether_contract(){
        return this._etherContract
    }

    setTarget_contract(address) {
        this._target_contract = new this._provider.eth.Contract(
            JSON.parse(process.env.ERC20_ABI),
            address
        )
    }

    get target_contract() {
        return this._target_contract
    }


}

module.exports = {
    Contract
}