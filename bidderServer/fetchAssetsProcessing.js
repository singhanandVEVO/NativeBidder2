
var { MongoClient, url} = require('./database')
function fetchAssetsProcessing(i,lht,dbo,campaignIdbidAmountslotDim,callback,bidAmountbidAssets)
{
            dbo.collection("AssetDB").findOne({ campaignId:parseInt(campaignIdbidAmountslotDim[i].campaignId)}, { projection: { _id: 0, adTitle: 1, adDesc: 1, redirectURL: 1, imageUrl: 1 } }, function(err, result) {
            let bidAmountbidAsset = {};
            console.log(i);
            console.log("mongo query")
            bidAmountbidAsset['bidSuccess']=campaignIdbidAmountslotDim[i].bidSuccess
            bidAmountbidAsset['reqId']=campaignIdbidAmountslotDim[i].reqId
            bidAmountbidAsset['campaignId']=campaignIdbidAmountslotDim[i].campaignId
            bidAmountbidAsset['id']=campaignIdbidAmountslotDim[i].campaignId
            bidAmountbidAsset['bidAmount'] = campaignIdbidAmountslotDim[i].bidAmount
            bidAmountbidAsset['bidAsset'] = result
            bidAmountbidAssets.push(bidAmountbidAsset);    
            if(i==(lht-1))
                callback();
    });
}

module.exports= fetchAssetsProcessing