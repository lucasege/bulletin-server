import * as AWS from 'aws-sdk';
import * as uuid from 'node-uuid';

const s3 = new AWS.S3({
  "signatureVersion": "v4",
  "region": "us-east-2",
});

const imageBucket = 'bulletin-news-images';
const imageKeyPrefix = 'user_image_upload_';
const roundupBucket = 'bulletin-roundups';
const roundupKeyPrefix = 'user_roundup_upload_';

export const UploadImageToS3 = async (imageResponse: any) => {
  const buf = Buffer.from(imageResponse.imageSource.replace(/^data:image\/\w+;base64,/, ""), 'base64')
  var params = {
    Bucket: imageBucket,
    Key: imageKeyPrefix + uuid.v4() + '.jpg',
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: imageResponse.imageType,
    ACL: 'public-read'
  };
  return s3.upload(params).promise()
}

export const SignRoundupS3Request = (fileName: string, fileType: string, res: any) => {
  // Set up the payload of what we are sending to the S3 api
  const s3Params = {
    Bucket: roundupBucket,
    Key: fileName,
    Expires: 3000,
    ContentEncoding: 'base64',
    ContentType: fileType,
    ACL: "public-read",
  };
  // Make a request to the S3 API to get a signed URL which we can use to upload our file
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.error("error:", err)
      res.status(404).json({
        success: false
      })
      return;
    }
    // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
    console.log("Data", data)
    const returnData = {
      signedRequest: data,
      url: `https://${roundupBucket}.s3.us-east-2.amazonaws.com/${fileName}`
    };
    res.json({
      data: returnData,
      success: true,
    });
  });
}

// export const UploadRoundupToS3 = async (audioResponse: any) => {
//   // TODO
//   var params = {
//     Bucket: roundupBucket,
//     Key: roundupKeyPrefix + userName + locationName + date,
//     Body: audioResponse,
//   }

// }
