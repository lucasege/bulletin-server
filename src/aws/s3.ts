import * as AWS from 'aws-sdk';
import * as uuid from 'node-uuid';

const s3 = new AWS.S3();

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

export const SignRoundupS3Request = async (fileName: string, fileType: string) => {
  // Set up the payload of what we are sending to the S3 api
  const s3Params = { Bucket: roundupBucket, Key: roundupKeyPrefix + fileName, Expires: 3000, ContentType: fileType, ACL: 'public-read' };
  // Make a request to the S3 API to get a signed URL which we can use to upload our file
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      throw (err);
    }
    // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
    const returnData = {
      signedRequest: data,
      url: `https://${roundupBucket}.s3.amazonaws.com/${roundupKeyPrefix + fileName}`
    };
    return returnData;
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
