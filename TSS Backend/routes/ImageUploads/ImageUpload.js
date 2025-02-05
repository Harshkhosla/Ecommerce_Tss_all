const express = require("express");
const AWS = require("aws-sdk");
const multer = require("multer");
require("dotenv").config();
const multerS3 = require("multer-s3");

const router = express.Router();
const { S3Client } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});



const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `uploads/${Date.now()}_${file.originalname}`);
    },
  }),
});



router.post("/upload", upload.array("images", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }
  
  const imageUrls = req.files.map((file) => {
      console.log(`${process.env.CLOUDFRONT_DOMAIN}${file.key}`);
    return `${process.env.CLOUDFRONT_DOMAIN}${file.key}`;
  });

  res.json({ imageUrls });
});


router.get("/", async (req, res) => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Prefix: "uploads/", 
    };

    const data = await s3.listObjectsV2(params).promise();
    const imageUrls = data.Contents.map((file) => {
      return `https://${process.env.CLOUDFRONT_DOMAIN}/${file.Key}`;
    });

    res.json({ images: imageUrls });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

module.exports = router;
