
function stichTemplate(bidAmountbidAssettrackingPixel, template) {
    return new Promise((resolve, reject) => {

        console.log("stich template")
        let bidAmountbidAdcode = []
        var i
        bidAmountbidAssettrackingPixel.forEach(element =>{
            if(element.bidSuccess){
                template = template.replace(/adTitle/g, element.bidAsset.adTitle)
                template = template.replace(/adDesc/g, element.bidAsset.adDesc)
                template = template.replace(/imageUrl/g, element.bidAsset.imageUrl)
                template = template.replace(/redirectUrl/g, element.bidAsset.redirectURL)
                let bidAdcode = template.concat(element.clickPixel)
                let bidAmountbidAdcode1 = {
                    bidSuccess: element.bidSuccess,
                    bidAmount: element.bidAmount,
                    bidderId:  parseInt(element.port),
                    reason : "",
                    bidAdcode: bidAdcode,
                    renderPixel: element.renderPixel
                }
                bidAmountbidAdcode.push(bidAmountbidAdcode1)
            } //if condition
            else{
                let bidAmountbidAdcode1 = {
                    bidSuccess: element.bidSuccess,
                    bidAmount: element.bidAmount,
                    bidderId:-1,
                    reason: element.reason,
                    bidAdcode:"{}",
                    renderPixel:"{}"
                     }
                bidAmountbidAdcode.push(bidAmountbidAdcode1)
            } //else loop
        })  //foreach loop
        return resolve(bidAmountbidAdcode)
    })  //promise
}  //function
module.exports = stichTemplate