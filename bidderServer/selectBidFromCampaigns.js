var { MongoClient, url} = require('./database')

var reqLogAtBidder = require('./reqLogAtBidder')
var apPixel = require('./apPixel')
async function selectBidFromCampaigns(selectCriteria,database) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db(database);
            dbo.collection("CampaignDB").find({ minBid: { $gte: parseInt(selectCriteria.floorPrice) }, "$where": "this.minBid < this.budget", slotDim: selectCriteria.slotDim, adUnit: selectCriteria.adUnit }, { projection: { _id: 0, campaignId: 1, minBid: 1, maxBid: 1, slotDim: 1 } }).toArray(function(err, result) {
                if (result[0]) {
                    let campaigns = []
                    var i
                    for(i=0;i<result.length && i<selectCriteria.units;i++){
                        result[i]['bidSuccess']=true   //extra added feature
                        result[i]['bidAmount']=parseInt(Math.random() * (parseInt(result[i].maxBid) - parseInt(result[i].minBid) + 1) + parseInt(result[i].minBid))
                        result[i]['reqId']=selectCriteria.reqId
                        campaigns.push(result[i])
                    }
                    /*let index = Math.floor(Math.random() * result.length);
                    result[index]['reqId']=selectCriteria.reqId;
                    result[index]['bidAmount'] = parseInt(Math.random() * (parseInt(result[index].maxBid) - parseInt(result[index].minBid) + 1) + parseInt(result[index].minBid))*/
                    for(i=0;i<campaigns.length;i++){
                        reqLogAtBidder(result[i],parseInt(selectCriteria.reqId),database)
                        apPixel(result[i],database)
                    }
                    //console.log(campaigns)
                   // reqLogAtBidder(result[index],parseInt(selectCriteria.reqId))
                   // apPixel(result[index])
                    return resolve(campaigns)
                } else {
                    reqLogAtBidder("",parseInt(selectCriteria.reqId),database)
                    console.log("No bids because of criteria!")
                    return resolve(null)
                }
            });
        });

    })
}
module.exports = selectBidFromCampaigns
