// awsService.ts
import {S3} from 'aws-sdk';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import RNFetchBlob from 'rn-fetch-blob';
import {Buffer} from 'buffer';
import Config from 'react-native-config';

const S3_BUCKET = Config.S3_BUCKET;
const REGION = Config.REGION;
const ACCESS_KEY = Config.ACCESS_KEY;
const SECRET_ACCESS_KEY = Config.SECRET_KEY;

const config = {
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
};

// Initialize the S3 client
const s3 = new S3(config);

const uploadAndEncryptImage = async imageUri => {
  // Prepare the image for upload
  const file = {
    uri: imageUri,
    name: `${uuidv4()}.jpg`,
    type: 'image/jpeg',
  };

  console.log('File:', file);

  // Read the Base64-encoded data
  const base64Data = await RNFetchBlob.fs.readFile(file.uri, 'base64');

  // Decode Base64 data to binary
  const binaryData = Buffer.from(base64Data, 'base64');

  // Upload the image to AWS S3
  const uploadParams = {
    Bucket: S3_BUCKET,
    Key: file.name,
    Body: binaryData,
    ContentType: file.type,
    ACL: 'private',
  };

  console.log('Upload Params', uploadParams);

  try {
    const response = await s3.upload(uploadParams).promise();
    console.log('AWS S3 Upload Response:', response);

    // Handle success or failure as needed
    if (response) {
      console.log('Image uploaded successfully!');
      // Additional logic if needed after successful upload
      alert('Image uploaded successfully!');
    } else {
      console.log('Image upload failed.');
      // Additional error handling logic
    }
  } catch (error) {
    console.log('Error uploading image:', error);
  }
};

const getPresignedUrl = imageKey => {
  const params = {
    Bucket: S3_BUCKET,
    Key: imageKey,
    Expires: 60, // URL expiration time in seconds
  };
  return s3.getSignedUrl('getObject', params);
};

async function listImagesFromBucket() {
  const params = {
    Bucket: S3_BUCKET,
  };

  try {
    const objects = await s3.listObjectsV2(params).promise();
    const imageKeys = objects.Contents.map(object => object.Key);
    return imageKeys;
  } catch (error) {
    console.error('Error listing objects from S3 bucket:', error);
    throw error;
  }
}

const deleteImageFromBucket = async key => {
  const params = {
    Bucket: S3_BUCKET,
    Key: key,
  };

  try {
    const response = await s3.deleteObject(params).promise();
    console.log('AWS S3 Delete Response:', response);
    return response;
  } catch (error) {
    console.error('Error deleting image from S3 bucket:', error);
    throw error;
  }
};

export {
  uploadAndEncryptImage,
  listImagesFromBucket,
  getPresignedUrl,
  deleteImageFromBucket,
};
