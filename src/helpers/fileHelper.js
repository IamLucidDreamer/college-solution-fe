const dotenv = require('dotenv')
const { loggerUtil: logger } = require("../utils/logger")
const { S3Client, PutObjectAclCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require("fs")
const { statusCode: SC } = require("../utils/statusCode")

dotenv.config()

const createSiteData = async (file, res, err) => {
    let imageUrl = ""
    try {
        if (err) {
            logger(err, 'ERROR')
            return
        }
        if (file) {

            if (file.size > 5000000) {
                return
            } else {
                const fileName = file.originalFilename
                const client = new S3Client({
                    region: 'ap-south-1',
                    credentials: {
                        accessKeyId: process.env.ACCESS_KEY,
                        secretAccessKey: process.env.ACCESS_SECRET
                    }
                })
                const bucketParams = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: fileName,
                    Body: fs.createReadStream(file.filepath),
                    ContentType: file.mimetype
                }
                await client
                    .send(new PutObjectCommand(bucketParams))
                    .then(async () => {
                        await client
                            .send(
                                new PutObjectAclCommand({
                                    ACL: 'public-read',
                                    Bucket: process.env.BUCKET_NAME,
                                    Key: fileName
                                })
                            )
                            .then(async response => {
                                if (response.$metadata.httpStatusCode === 200) {
                                    imageUrl = `https://${process.env.BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${fileName}`
                                    return
                                } else {
                                    return
                                }
                            })
                    })
            }
        } else {
            return
        }
    } catch (err) {
        logger(err, 'ERROR')
    } finally {
        logger(`Create Site Data API Called!`)
        return imageUrl
    }
}

module.exports = { createSiteData }