
var { MongoClient, url} = require('./database')

function updateBudget(campaignId, bidAmount) {

    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            var dbo = db.db(database);

            dbo.collection("CampaignDB").findOne({ campaignId: parseInt(campaignId) }, { "bidAmount": 1, _id: 0 },
                function(err, res) {
                    dbo.collection("CampaignDB").updateOne({ campaignId: parseInt(campaignId) }, { $inc: { budget: -parseInt(bidAmount) } },
                        function(err, res) {});

                    console.log("Ad has been clicked. Budget updated in CampaignDB ");
                });


        });

    })
}
module.exports = updateBudget
