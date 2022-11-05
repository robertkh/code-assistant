//
import AWS from "aws-sdk";

//
AWS.config.update({
  secretAccessKey: process.env.ACCESS_SECRET,
  accessKeyId: process.env.ACCESS_KEY,
  region: process.env.REGION,
});

//
export const s3 = new AWS.S3();
