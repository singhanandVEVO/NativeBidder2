//"use strict";

const express = require('express')
var bodyParser = require("body-parser");
var request = require('request');
var fs = require('fs');
var fetch = require('node-fetch');
var MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs');

var url = "mongodb://localhost:27017/";
const port = process.argv[2]
const BidderServer1Port = process.argv[3]
const BidderServer2Port = process.argv[4]


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//var decideWinnigBid = require('./AdvAdServer/decideWinnigBid')


var getBidFromBidderServer = require('./advAdServer/getBidFromBidderServer')
var validatingBids = require('./advAdServer/validatingBids')
var validatingBids = require('./advAdServer/validatingBids')
//var dspPixel = require('./advAdServer/dspPixel')
var decideWinnigBid = require('./advAdServer/decideWinnigBid')
var fetchTemplate = require('./advAdServer/fetchTemplate')
var stichTemplate = require('./advAdServer/stichTemplate')
var dspWinnerBid = require('./advAdServer/dspWinnerBid')


app.get('/bidAdcodeRequest', async(req, res) => {

    try {
        //req.query.reqId=(req.query.reqId)+ Math.floor(Math.random() * 100);  //generate random id of request
        let bidsFromBidderServer1 = await getBidFromBidderServer(req.query,BidderServer1Port,BidderServer2Port)
        console.log("adserver started")
        //let ddddd=JSON.stringify(bidsFromBidderServer)
       // console.log(bidsFromBidderServer[0])
        //let fffff=Array.prototype.concat(bidsFromBidderServer)
        let bidsFromBidderServer=[...bidsFromBidderServer1[0], ...bidsFromBidderServer1[1]]
        //let bidsFromBidderServer=bidsFromBidderServer1.slice(0,3)
       // console.log(bidsFromBidderServer)
        let validBidsFromBidderServer = await validatingBids(bidsFromBidderServer, req.query.slotDim)
        if (validBidsFromBidderServer == null) {
            dspPixel("",parseInt(req.query.reqId))
            res.send("No bid")
        } else {
            let bidAmountbidAssettrackingPixel = await decideWinnigBid(validBidsFromBidderServer,req.query.units,req.query.slotDim)
            let template = await fetchTemplate(req.query.hostname, req.query.adUnit)
            let bidAmountbidAdcode = await stichTemplate(bidAmountbidAssettrackingPixel, template)
            res.json(bidAmountbidAdcode).end()
           //   res.json(bidAmountbidAssettrackingPixel)

        }

    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }

})

app.get('/addTemplate', (req, res) => {
    try {
        res.render('InsertTemplate');
    } catch (e) {
        console.log(e)
    }

})

app.post('/addTemplate', (req, res) => {

    try {

        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            var dbo = db.db("AdvAdServerDatabase");

            dbo.collection("TemplateDB").insertOne(req.body, function(err, res) {
                console.log("1 document inserted in TemplateDB");
                db.close()

            });

        });
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)

    }
})
app.listen(port, () => console.log('AdvAdServer listening on port ' + port + '!'));