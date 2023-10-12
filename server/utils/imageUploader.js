const cloudinary = require("cloudinary").v2;

// Function to upload an image to Cloudinary
exports.uploadImageToCloudinary = async (file, folder, height, quality=40) => {
  const options = { folder };
  console.log("Quality: ",quality);
  // Set the height option if provided
  if (height) {
    options.height = height;
  }
  // Set the quality option if provided
  // if (quality) {
    options.quality = quality;
  // }

  // Resource type should be automatically determined based on the file extension
  options.resource_type = "auto";
  console.log("OPTIONS", options);
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};
