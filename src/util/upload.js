import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(buffer, filename) {
  try {
    const base64 = buffer.toString("base64");
    const dataUri = `data:image/jpeg;base64,${base64}`;  

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "plans",
      public_id: filename,
      resource_type: "image",
      timeout: 60000,
    });

    return { success: true, result };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return { success: false, error };
  }
}
