// lib/aws.ts
import { S3 } from '@aws-sdk/client-s3';

const s3Client = new S3({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || '',
  },
});

export const uploadToS3 = async (file: Blob, fileName: string,folderName:string) => {
  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || '',
    Key: `${folderName}/${fileName}`,
    Body: file,
    ContentType: file.type,
    
  };

  try {
    await s3Client.putObject(params);
    console.log('File uploaded successfully');
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};
