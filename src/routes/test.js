const express = require('express')

// const { createSiteData } = require('../helpers/fileHelper')
// const { isAdmin, isSignedIn, isValidToken } = require('../controllers/middleware')
const router = express.Router()

router.get('/test', (req, res) => {
    res.status(200).send("<h1>Hello from College Solution Backend</h1>"
    )
})
// router.get('/test/file-ipload', isSignedIn, isValidToken, isAdmin, createSiteData)

module.exports = router
