const test = require("./test")
const auth = require("./auth")
const team = require("./team")


function routesV1(app) {
    app.use('/api/v1', test)
    app.use('/api/v1', auth)
    app.use('/api/v1', team)
}

module.exports = { routesV1 }