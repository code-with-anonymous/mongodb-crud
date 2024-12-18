// const { v2: cloudinary } = require('cloudinary');
// const fs = require('fs');


// cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET 
// });

// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         console.log(localFilePath);
//         if (!localFilePath) return null
//         //upload the file on cloudinary
//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto"
//         })
//         // file has been uploaded successfull
//         console.log("file is uploaded on cloudinary ", response.url);
//         fs.unlinkSync(localFilePath)
//         return response;

//     } catch (error) {
//         if (error) {
//             return res.status(500).json({ message: "Failed to upload image." });
//         }
//         fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
//         return null;
//     }
// }

// module.exports = { uploadOnCloudinary };








const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME , 
  api_key: process.env.API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET  
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) throw new Error("Local file path is missing.");

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        console.log("Uploaded to Cloudinary:", response.secure_url);

        // Remove the file after upload
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error.message);
        // Safely handle unlink operation
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null; // Indicate failure
    }
};

module.exports = { uploadOnCloudinary };
