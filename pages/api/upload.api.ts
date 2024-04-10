import { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "cloudinary";
import multiparty from "multiparty";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new multiparty.Form();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: "Error parsing form data" });
      return;
    }

    try {
      const uploadedImages = [];
      for (const file of files.file) {
        const result = await cloudinary.v2.uploader.upload(file.path, { folder: "bucket" });
        uploadedImages.push(result.secure_url);
      }
      console.log("Uploaded images:", uploadedImages);
      res.status(200).json({ images: uploadedImages });
    } catch (error) {
      console.error("Error uploading images to Cloudinary:", error);
      res.status(500).json({ error: "Error uploading images to Cloudinary" });
    }
  });
}

export const config = {
  api: { bodyParser: false }
};
