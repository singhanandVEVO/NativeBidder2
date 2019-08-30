"use strict";

const express = require('express')
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs');


const port = process.argv[2]
const database = process.argv[3].toString()
var url = "mongodb://localhost:27017/";
var selectBidFromCampaigns = require('./bidderServer/selectBidFromCampaigns')
var reqLogAtBidder = require('./bidderServer/reqLogAtBidder').default
var apPixel = require('./bidderServer/apPixel')
var fetchAssetsProcessing = require('./bidderServer/fetchAssetsProcessing')
var fetchAssets = require('./bidderServer/fetchAssets')
var stichPixel = require('./bidderServer/stichPixel')
var updateBudget = require('./bidderServer/updateBudget')



app.get('/BidderServer', async(req, res) => {
    return new Promise(async(resolve, reject) => {
        try {
            console.log("Request from AdvAdServer to " + database + " has received!\n")

            let campaignIdbidAmountslotDim = await selectBidFromCampaigns(req.query,database)
            if (campaignIdbidAmountslotDim == null) {
                res.json({ bidAmount: null, port: port }).end()
            } else {
                let bidAmountbidAsset = await fetchAssets(campaignIdbidAmountslotDim,database)
                let bidAmountbidAssettrackingPixel = await stichPixel(campaignIdbidAmountslotDim, bidAmountbidAsset,port)
                res.json(bidAmountbidAssettrackingPixel).end()

            }

        } catch (e) {

            console.log(e)
            res.sendStatus(500)


        }
    })
})

app.get('/addCampaign', (req, res) => {

    try {
        res.render('CampaignManager');
    } catch (e) {
        console.log(e)
    }
})


app.post('/addCampaign', function(req, res) {

    try {
        let campaignDetails = req.body;

        let campaignId = parseInt(Math.random() * 1000000, 10);

        let CampaignDBDetails = {

            campaignId: campaignId,
            custId: parseInt(campaignDetails.custId),
            adUnit: campaignDetails.adUnit,
            minBid: parseInt(campaignDetails.minBid),
            maxBid: parseInt(campaignDetails.maxBid),
            budget: parseInt(campaignDetails.budget),
            slotDim: campaignDetails.slotDim,
            targetDevice: campaignDetails.targetDevice,
            targetPlatform: campaignDetails.targetPlatform,
            targetBrowser: campaignDetails.targetBrowser,
            targetCountryCode: campaignDetails.targetCountryCode

        }

        let AssetDBDetails = {


            assetId: parseInt(Math.random() * 1000000, 10),
            campaignId: campaignId,
            adTitle: campaignDetails.adTitle,
            adDesc: campaignDetails.adDesc,
            redirectURL: campaignDetails.redirectURL,
            imageUrl: campaignDetails.imageUrl

        }

        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            var dbo = db.db(database);


            dbo.collection("CampaignDB").insertOne(CampaignDBDetails, function(err, res) {
                console.log("1 document inserted in CampaignDB");
                db.close()

            });


            dbo.collection("AssetDB").insertOne(AssetDBDetails, function(err, res) {
                console.log("1 document inserted in AssetDB");
                db.close()

            });

        });
        res.sendStatus(200)

    } catch (e) {

        console.log(e)
        res.sendStatus(500)

    }

});



app.get('/refillBudget', (req, res) => {
    try {
        res.render('refillBudget');
    } catch (e) {
        console.log(e)
    }

})


app.post('/refillBudget', (req, res) => {

    try {

        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            var dbo = db.db(database);
            dbo.collection("CampaignDB").updateOne({ custId: parseInt(req.body.custId) }, { $inc: { budget: +parseInt(req.body.refillAmount) } },
                function(err, res) {
                    console.log("Budget updated in CampaignDB ");
                    db.close()
                });

        });
        res.send(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)

    }
})

app.get('/renderStatus', async(req, response) => {

    try {

        let logData = {
            campaignId: req.query.campaignId,
            timestamp: req.query.time,
            hostname: req.query.hostname,
            userAgent: req.query.userAgent,

        }
        updateBudget(logData.campaignId, bidAmount / 2)

        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            var dbo = db.db(database);
            dbo.collection("renderData").insertOne(logData, function(err, res) {
                console.log("1 document inserted in renderData");
                response.sendFile("//home//anand//Desktop//NativeBidder//images//media.png")
            });

        });


    } catch (e) {
        console.log(e)
        res.sendStatus(500)

    }
})

app.get('/clickEvent', async(req, response) => {

    try {

        let logData = {
            campaignId: parseInt(req.query.campaignId),
            timestamp: req.query.time,
            hostname: req.query.hostname,
            userAgent: req.query.userAgent,
            bidAmount: req.query.bidAmount
        }
        updateBudget(logData.campaignId, bidAmount)

        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            var dbo = db.db(database);
            dbo.collection("clickData").insertOne(logData, function(err, res) {
                console.log("1 document inserted in clickData");
                response.sendFile("//home//anand//Desktop//NativeBidder//images//media.png")
            });

        });


    } catch (e) {
        console.log(e)
        res.sendStatus(500)

    }
})

app.get('/dspWinnerBid', async(req, response) => {

    try {
        let logData = {
            bidAmount: req.query.bidAmount,
            adTitle: req.query.adTitle,
            adDesc: req.query.adDesc
        }
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            var dbo = db.db(database);
            dbo.collection("dspWinnerBid").insertOne(logData, function(err, res) {
                console.log("1 document inserted in dspWinnerBid");
            });

        });


    } catch (e) {
        console.log(e)

    }
})

app.listen(port, () => console.log('BidderServer listening on port ' + port + ' and database ' + database + '!'))