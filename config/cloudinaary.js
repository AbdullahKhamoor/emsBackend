import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // tumhara cloud name
  api_key: process.env.CLOUDINARY_API_KEY,        // tumhara API key
  api_secret: process.env.CLOUDINARY_API_SECRET,  // tumhara API secret
  secure: true
});

export default cloudinary.v2