import * as AWS from 'aws-sdk';
import * as uuid from 'node-uuid';

var s3 = new AWS.S3();

var bucketName = 'bulletin-news-images';
var keyPrefix = 'user_image_upload_';

export const UploadImageToS3 = (imageContent: any) => {
  var params = {
    Bucket: bucketName,
    Key: keyPrefix + uuid.v4(),
    Body: imageContent
  };
  let locator = "";
  s3.upload(params, function(err: any, data: any) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`)
    locator = data.Location;
    return locator;
  });
}
