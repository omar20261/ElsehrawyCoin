const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString(); 
    }

}

class BlockChain{
    constructor(){
        this.chain = [ this.createGenesisBlock() ];
    }

    createGenesisBlock(){
        return new Block(0,'05/08/2024', 'Genesis block', '0');
    }

    getLatestBlock(){
        return this.chain[ this.chain.length - 1 ]
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true
    }
}

let ElsehrawyCoin = new BlockChain();

ElsehrawyCoin.addBlock( new Block(1,'10/9/2024',{amount: 5}))
ElsehrawyCoin.addBlock( new Block(2,'12/9/2024',{amount: 8}))

console.log(' is BlokcChain vaild:', ElsehrawyCoin.isChainValid())

//console.log('ElsehrawyCoin', JSON.stringify(ElsehrawyCoin, null,4))

ElsehrawyCoin.chain[1].data = { amount: 100} //  if a change is made the hash will be different .. and so it invalid the chain
ElsehrawyCoin.chain[1].hash = ElsehrawyCoin.chain[1].calculateHash() // if the hash gets generated the chain will still be invalid chain because of the next block has different hash as prevoursHash

console.log(' is BlokcChain vaild:', ElsehrawyCoin.isChainValid())
