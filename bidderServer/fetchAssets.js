var { MongoClient, url} = require('./database')
var fetchAssetsProcessing = require('./fetchAssetsProcessing')

async function fetchAssets(campaignIdbidAmountslotDim,database) {
    return new Promise((resolve, reject) => {
        let bidAmountbidAssets = []
        function callback()
            {
                console.log(bidAmountbidAssets)
                return resolve(bidAmountbidAssets) 
            } 
            console.log("fetch assets start")
            //console.log(campaignIdbidAmountslotDim[i].campaignId)
            MongoClient.connect(url, { useNewUrlParser: true }, (err, db) =>{
                    var dbo = db.db(database);
                    //let j=i;
                    console.log("mongo connect");
                    for(let i=0;i<campaignIdbidAmountslotDim.length;i++)
                    {
                        fetchAssetsProcessing(i,campaignIdbidAmountslotDim.length,dbo,campaignIdbidAmountslotDim,callback,bidAmountbidAssets);
                    }
                    // console.log(j);
                    // dbo.collection("AssetDB").findOne({ campaignId:parseInt(campaignIdbidAmountslotDim[0].campaignId)}, { projection: { _id: 0, adTitle: 1, adDesc: 1, redirectURL: 1, imageUrl: 1 } }, function(err, result) {
                    // let bidAmountbidAsset = {};
                    // console.log("mongo query")
                    // bidAmountbidAsset['reqId']=campaignIdbidAmountslotDim[0].reqId
                    // bidAmountbidAsset['campaignId']=campaignIdbidAmountslotDim[0].campaignId
                    // bidAmountbidAsset['id']=campaignIdbidAmountslotDim[0].campaignId
                    // bidAmountbidAsset['bidAmount'] = campaignIdbidAmountslotDim[0].bidAmount
                    // bidAmountbidAsset['bidAsset'] = result
                    // bidAmountbidAssets.push(bidAmountbidAsset)
                    // console.log(bidAmountbidAsset);
                    //query
                }); //mongo client
          //  }  //end of for
            
            
            }) //promise
}  //end of function 


module.exports = fetchAssets