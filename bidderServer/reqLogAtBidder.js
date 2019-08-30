var { MongoClient, url} = require('./database')

async function reqLogAtBidder(bid,reqId,database){

    MongoClient.connect(url, { useNewUrlParser: true}, function(err, db){
        var dbo =db.db(database);
        //if(bid)
           dbo.collection("reqBidderLog").insertOne({ "reqId":parseInt(reqId), "campaignId": bid.campaignId, "bidAmount": bid.bidAmount, "slotDim" : bid.slotDim , "timestamp": Math.floor(Date.now()/1000) } , function(err, result) {});
        //else
           //dbo.collection("reqBidderLog").insertOne({ "reqId": bid.reqId, "campaignId":0, "bidAmount":0  } , function(err, result) {}); 
           //timestamp   slotdim     
    });

}

module.exports = reqLogAtBidder

