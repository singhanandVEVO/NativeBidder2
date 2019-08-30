
async function stichPixel(campaignIdbidAmountslotDim, bidAmountbidAsset,port) {
    return new Promise((resolve, reject) => {
        var bidAmountbidAssettrackingPixels = []
        var i=0
        bidAmountbidAsset.forEach(bidData =>{
            let bidAmountbidAssettrackingPixel = {};
            bidAmountbidAssettrackingPixel['bidSuccess']=bidData.bidSuccess
            bidAmountbidAssettrackingPixel['reqId'] = bidData.reqId
            bidAmountbidAssettrackingPixel['campaignId']=bidData.campaignId
            bidAmountbidAssettrackingPixel['bidAmount'] = bidData.bidAmount
            bidAmountbidAssettrackingPixel['bidAsset'] = bidData.bidAsset
            bidAmountbidAssettrackingPixel['renderPixel'] = "http://localhost:" + port + "/renderStatus/?campaignId=" + campaignIdbidAmountslotDim[i].campaignId + "&bidAmount=" + bidData.bidAmount,
            bidAmountbidAssettrackingPixel['clickPixel'] = `<script> var bidAmount=` + bidData.bidAmount + `;function adClick() {var img = document.createElement("img");img.setAttribute("src", "http://localhost:` + port + `/clickEvent/?campaignId=" ${campaignIdbidAmountslotDim[i].campaignId} "&time=" + (new Date().toLocaleString() + "&hostname=" + window.location.href.toLocaleString() + "&userAgent=" + (navigator.userAgent.toLocaleString())));img.setAttribute("height", "1px");img.setAttribute("width", "1px");document.body.appendChild(img);}<script>`
            bidAmountbidAssettrackingPixel['port'] = port //bidderServer identity
            bidAmountbidAssettrackingPixel['slotDim'] = campaignIdbidAmountslotDim[i].slotDim
            bidAmountbidAssettrackingPixels.push(bidAmountbidAssettrackingPixel)
            i++
        
          })
       // console.log("stich pixel")
       // console.log(bidAmountbidAssettrackingPixels)
        return resolve(bidAmountbidAssettrackingPixels)
    }) //promise
}   //end of function

module.exports = stichPixel
