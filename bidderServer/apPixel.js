
var { MongoClient, url} = require('./database')
async function apPixel(bid,database) {

    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        var dbo = db.db(database);

        dbo.collection("apData").findOne({ campaignId: bid.campaignId }, { projection: { _id: 0 } }, function(err, result) {
            if (result == null) {

                dbo.collection("apData").insertOne({ "campaignId": bid.campaignId, "selected": 1 }, function(err, res) {});

            } else {
                dbo.collection("apData").updateOne({ campaignId: result.campaignId }, { $inc: { selected: +1 } },
                    function(err, res) {});
            }

        });


    });
}
module.exports = apPixel