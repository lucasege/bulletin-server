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

// export const UploadRoundupToS3 = async (audioResponse: any) => {
//   // TODO
//   var params = {
//     Bucket: roundupBucket,
//     Key: roundupKeyPrefix + userName + locationName + date,
//     Body: audioResponse,
//   }

// }
