
var dspWinnerBid = require('./dspWinnerBid')
var dspPixel = require('./dspPixel')
var Sort = require('array-sort');
function decideWinnigBid(bidsFromBidderServer,numberOfResponse,slot) {
    return new Promise(async(resolve, reject) => {
        Sort(bidsFromBidderServer,'bidAmount');
        console.log(bidsFromBidderServer.length)
        let i=0
        let temp=[]
        while(i<bidsFromBidderServer.length && i<numberOfResponse){
            temp.push(bidsFromBidderServer[i])
            i++;
        }
         /* if more bids then select only numberOfResponse bids only from bidsFromBidderServer
        */
       let nullbids ={
            bidSuccess: false,
            bidAmount: 0,
            reason: "suitable bid for slot " +slot+ " not exists."
            //bidAmount: null,
            //bidAsset: null,
           // renderPixel: null,
           // clickPixel: null,
           // port: null,
          //  slotdim: null
        }
        while(i<numberOfResponse){
            temp.push(nullbids)
            i++;
        }
        console.log("decide winning bid")
        console.log(temp.length)
        console.log(temp)
        /**/
      //  await dspWinnerBid(bidsFromBidderServer[maxIndex], bidsFromBidderServer[maxIndex].port)
      // await dspPixel(bidsFromBidderServer[maxIndex],parseInt(bidsFromBidderServer[maxIndex].reqId));
        return resolve(temp)
       // return resolve(bidsFromBidderServer[maxIndex])

    }) //promise
}

module.exports = decideWinnigBid