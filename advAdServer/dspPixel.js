
var { MongoClient, url} = require('./database')
function dspPixel(FinalBid,reqId){
    return new Promise(function(resolve, reject){

            MongoClient.connect(url, { useNewUrlParser: true}, function(err, db){
                var dbo = db.db("AdvAdServerDatabase");
               // if(FinalBid)
                dbo.collection("reqDspLog").insertOne({ "reqId":parseInt(reqId), "campaignId": FinalBid.campaignId, "bidAmount":FinalBid.bidAmount , "slotDim": FinalBid.slotDim , "timestamp": Math.floor(Date.now()/1000) , "bidderPort": FinalBid.port  },function(err,res){});
                //else 
               // dbo.collection("reqDspLog").insertOne({ "reqId":FinalBid.reqId, "campaignId":0, "bidAmount":0 ,"bidderPort":0 },function(err,res){});


            })

    })

}
//dbo.collection("apData").insertOne({ "campaignId": bid.campaignId, "selected": 1 }, function(err, res) {});

module.exports = dspPixel