import AWS from 'aws-sdk';

const s3Instance = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    region: process.env.AWS_SES_REGION,
});

export const uploadImage = async (
    imageFile: Express.Multer.File,
    imageName: string,
): Promise<string | Error> => {
    try {
        const uploadedImage = await s3Instance
            .upload({
                Bucket: process.env.AWS_S3_BUCKET_NAME ?? '',
                Key: imageName,
                Body: imageFile.buffer,
                ContentType: 'image/png',
            })
            .promise();

        const imageLocation = uploadedImage.Location;

        return imageLocation;
    } catch (err) {
        return err as Error;
    }
};

export const getImageSignedUrl = async (
    imageUrl: string,
    expires?: number,
): Promise<string | Error> => {
    try {
        const imageName = imageUrl.split('/').pop();
        const signedUrl = s3Instance.getSignedUrl('getObject', {
            Key: imageName,
            Bucket: process.env.AWS_S3_BUCKET_NAME ?? '',
            Expires: expires ?? 900,
        });
        return signedUrl;
    } catch (err) {
        return err as Error;
    }
};

export default uploadImage;
