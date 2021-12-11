const Web3 = require('web3')
const dotenv = require('dotenv');
const Connection = require("./connection")
const fs = require("fs")
dotenv.config();

connection = new Connection.Connection()
connection.connect()

const pvkey = process.env.PRIVATE_KEY
const pbkey = process.env.PUBLIC_ADDRESS
const value = process.env.AMOUNT

connection.provider.eth.net.isListening().then(() => {

    let wallets = fs.readFileSync(`./wallets.txt`, 'utf8').split("\n")

    connection.provider.eth.getTransactionCount(pbkey).then((nonce) => {

        let n = nonce 

        wallets.forEach((e) => {

            dataTX = {
                to: e,
                from: pbkey,
                value:connection.provider.utils.toWei(value.toString(), "ether"),
                gasLimit: 100000,
                nonce: n                 
            }
    
            connection.provider.eth.accounts.signTransaction(dataTX,pvkey).then((raw) => {
                connection.provider.eth.sendSignedTransaction(raw.rawTransaction).then(console.log).catch(console.log)
            })        

            n += 1
    
        })

    })

})