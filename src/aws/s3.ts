import * as AWS from 'aws-sdk';
import * as uuid from 'node-uuid';

const s3 = new AWS.S3();

const bucketName = 'bulletin-news-images';
const keyPrefix = 'user_image_upload_';

export const UploadImageToS3 = async (imageContent: any) => {
  var params = {
    Bucket: bucketName,
    Key: keyPrefix + uuid.v4(),
    Body: imageContent
  };
  return s3.upload(params).promise()
}
