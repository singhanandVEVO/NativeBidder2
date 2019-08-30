

function validatingBids(bidsFromBidderServer, slotDim) {
    return new Promise((resolve, reject) => {
        let bids = []
        bidsFromBidderServer.forEach(bid => {
            if (parseInt(bid['bidAmount']) != null && bid['slotDim'] === slotDim) {
                bids.push(bid)
            }
        })
        if (bids.length == 0) {
            return resolve(null);
        } else {
            console.log(bids)
            return resolve(bids)
        }

    })
}
  
module.exports = validatingBids   

