var { MongoClient, url} = require('./database')

function fetchTemplate(hostname, adUnit) {
    return new Promise(function(resolve, reject) {

        console.log("fetch template")
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            var dbo = db.db("AdvAdServerDatabase");
            dbo.collection("TemplateDB").findOne({ hostname: { $regex: new RegExp('^' + hostname + '$') }, templateFor: adUnit }, { projection: { _id: 0, templateHtml: 1 } }, function(err, result) {
                if (result) {
                    return resolve(result.templateHtml)
                } else {
                    console.log("Template does not exist for " + hostname)
                    return resolve("")
                }

            });
        });

    })
}

module.exports = fetchTemplate




