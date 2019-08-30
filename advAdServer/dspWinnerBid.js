var request = require('request')
function dspWinnerBid(bid, port) {


    return new Promise(function(resolve, reject) {

        request.get({
            headers: { 'content-type': 'application/json' },
            json: true,
            url: 'http://localhost:' + port + '/dspWinnerBid/?bidAmount=' + bid.bidAmount + '&adTitle=' + bid.bidAsset.adTitle + '&adDesc=' + bid.bidAsset.adDesc,

        }, function(error, response, body) {
            console.log("Ad selected at DSP has been logged at respective BidderServer")
        });
    })
}
module.exports = dspWinnerBid
