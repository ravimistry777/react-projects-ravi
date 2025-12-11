import axios from "axios";

export const uploadFile = async (file) => {
    try {
        console.log("Uploading file:", file.name, file.type, file.size);
        
        let uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("upload_preset", "product");
        uploadData.append("cloud_name", "dyoixbvlf");
        uploadData.append("folder", "myntra_products");

        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dyoixbvlf/image/upload`,
            uploadData,
            {
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    console.log(`Upload progress: ${percentCompleted}%`);
                }
            }
        );

        console.log("Upload successful:", response.data.secure_url);
        return response.data.secure_url;
        
    } catch (error) {
        console.error("Upload failed:", error);
        throw new Error("Image upload failed: " + error.message);
    }
};