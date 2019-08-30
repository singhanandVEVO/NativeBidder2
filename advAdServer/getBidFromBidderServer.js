
var fetch = require('node-fetch');
function getBidFromBidderServer(selectCriteria,BidderServer1Port,BidderServer2Port) {


    return new Promise(function(resolve, reject) {
        //'&units=' + selectCriteria.units + 
        let urls = [
            'http://localhost:' + BidderServer1Port + '/BidderServer/?slotDim=' + selectCriteria.slotDim + '&reqId=' + selectCriteria.reqId + '&units=' + selectCriteria.units + '&adUnit=' + selectCriteria.adUnit + '&platform=' + selectCriteria.platform + '&browser=' + selectCriteria.browser + '&ip=' + selectCriteria.ip + '&floorPrice=' + selectCriteria.floorPrice,
            'http://localhost:' + BidderServer2Port + '/BidderServer/?slotDim=' + selectCriteria.slotDim + '&reqId=' + selectCriteria.reqId + '&units=' + selectCriteria.units + '&adUnit=' + selectCriteria.adUnit + '&platform=' + selectCriteria.platform + '&browser=' + selectCriteria.browser + '&ip=' + selectCriteria.ip + '&floorPrice=' + selectCriteria.floorPrice
        ];

        Promise.all(urls.map(url => fetch(url)))
            .then(responses => Promise.all(responses.map(response => response.json()))).then(data => {
                resolve(data)
            }).catch(e =>{
                console.log(e)
            });
    })
}

module.exports = getBidFromBidderServer