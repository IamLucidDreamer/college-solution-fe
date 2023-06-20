const mongoose = require('mongoose')
const crypto = require('crypto')
const { v1: uuidv1 } = require('uuid')

const teamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxlength: 32,
            trim: true,
            required: true
        },
        teamProfile: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            // required: true
        },
        type: {
            type: Number,
            enum: [1, 2],
            required: true
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('team', teamSchema, 'team')
