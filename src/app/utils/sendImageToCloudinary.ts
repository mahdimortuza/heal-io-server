import { v2 as cloudinary } from 'cloudinary';

export const sendImageToCloudinary = async () => {
  // Configuration
  cloudinary.config({
    cloud_name: 'dkwnfybul',
    api_key: '959152257574516',
    api_secret: 'kVLxoXHOMWyyaqRtesbmlAj7FMQ', // Click 'View API Keys' above to copy your API secret
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(
      'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
      {
        public_id: 'shoes',
      },
    )
    .catch((error) => {
      console.log(error);
    });

  console.log(uploadResult);

  // Optimize delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cloudinary.url('shoes', {
    fetch_format: 'auto',
    quality: 'auto',
  });

  console.log(optimizeUrl);
};
