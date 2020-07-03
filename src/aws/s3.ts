import * as AWS from 'aws-sdk';
import * as uuid from 'node-uuid';

const s3 = new AWS.S3();

const bucketName = 'bulletin-news-images';
const keyPrefix = 'user_image_upload_';

export const UploadImageToS3 = async (imageResponse: any) => {
  const buf = Buffer.from(imageResponse.imageSource.replace(/^data:image\/\w+;base64,/, ""), 'base64')
  var params = {
    Bucket: bucketName,
    Key: keyPrefix + uuid.v4() + '.jpg',
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: imageResponse.imageType,
    ACL: 'public-read'
  };
  return s3.upload(params).promise()
}
