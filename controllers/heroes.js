const Web3 = require("web3");
const definaABI = require("../abis/defina-card-abi.json");

const web3 = new Web3("https://bsc-dataseed.binance.org/");
const card_contract = new web3.eth.Contract(definaABI, "0xa318d9a2D6900A652FD0C9fea8c57a29b2a63709"); // defina hero NFT smart contract

module.exports.getCardInfo = async (req) => {
    let result = {
        heroes: []
    };

    // for every hero in existence
    for (let i = 1; i <= 28; i++) {
        try {
            const cardInfo = await card_contract.methods.cardInfoes(i).call();
            // if hero id exists, get info about that hero and push it to response object
            if (cardInfo) {
                let cardObj = {
                    id: i,
                    amount: cardInfo.currentAmount
                }
                result.heroes.push(cardObj);
            } else {
                result.status = 409;
                result.msg = "Couldn't get card info for id: " + i;
            }
        } catch (error) {
            console.log(error);
        }
    }

    if(!result.status) result.status = 200;
    return result;
}