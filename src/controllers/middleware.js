const userModel = require('../models/user.js')
const { expressjwt } = require('express-jwt')
const { statusCode: SC } = require('../utils/statusCode')

const isSignedIn = expressjwt({
	secret: process.env.SECRET || 'dummy',
	algorithms: ['HS256', 'RS256'],
	userProperty: 'auth'
})

const isValidToken = (err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		return res.status(SC.UNAUTHORIZED).json({ error: 'Authentication Failed!' })
	}
	next()
}

const isAuthenticated = (req, res, next) => {
	const checker = req.profile && req.auth && req.profile._id == req.auth._id
	if (!checker) {
		return res.status(SC.FORBIDDEN).json({
			error: 'ACCESS DENIED!'
		})
	}
	next()
}

const isAdmin = async (req, res, next) => {
	const authId = req.auth._id
	if (authId) {
		await userModel.findById(authId).then((user) => {
			if (!user) {
				return res.status(SC.NOT_FOUND).json({
					error: 'No user was found in DB or token expired!'
				})
			}
			if (user.role === 3) {
				next()
			} else {
				res.status(SC.UNAUTHORIZED).json({
					error: 'Not an admin!'
				})
			}
		}).catch(err => {
			return res.status(SC.NOT_FOUND).json({
				error: 'Error in the Query!',
				err: err
			})
		})
	}
}

const isClubAdmin = async (req, res, next) => {
	const authId = req.auth._id
	if (authId) {
		await userModel.findById(authId).exec((err, user) => {
			if (err || !user) {
				return res.status(SC.NOT_FOUND).json({
					error: 'No user was found in DB or token expired!'
				})
			}
			if (user.role === 2) {
				next()
			} else {
				res.status(SC.UNAUTHORIZED).json({
					error: 'Not an admin!'
				})
			}
		})
	}
}


const isClubAdminOrAdmin = async (req, res, next) => {
	const authId = req.auth._id
	if (authId) {
		await userModel.findById(authId).exec((err, user) => {
			if (err || !user) {
				return res.status(SC.NOT_FOUND).json({
					error: 'No user was found in DB or token expired!'
				})
			}
			if (user.role === 2 || user.role === 3) {
				next()
			} else {
				res.status(SC.UNAUTHORIZED).json({
					error: 'Not an admin!'
				})
			}
		})
	}
}

module.exports = {
	isSignedIn,
	isValidToken,
	isAuthenticated,
	isAdmin,
	isClubAdmin,
	isClubAdminOrAdmin
}
