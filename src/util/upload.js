// /util/upload.js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(buffer, filename) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: "auto", public_id: filename,timeout: 60000, },
      (error, result) => {
        if (error) return reject({ success: false, error });
        resolve({ success: true, result });
      }
    ).end(buffer);
  });
}
