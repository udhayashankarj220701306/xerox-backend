import blobServiceClient from "../libs/blob.js";
import path from "path";

export const uploadFileToBlob = async (file) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(process.env.CONTAINER_NAME);
    const blobName = `${Date.now()}-${path.basename(file.originalname)}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(file.buffer, file.buffer.length, {
      blobHTTPHeaders: {
        // Set the Content-Type to allow the browser to render the file
        // For example: 'image/jpeg', 'image/png', 'application/pdf'
        // If the type is unknown, set to a default that might not display
        blobContentType: file.mimetype,

        // Set the Content-Disposition to 'inline' to tell the browser to display it
        blobContentDisposition: "inline",
      },
    });
    return blockBlobClient.url;
  } catch (error) {
    console.log("Error uploading file to Azure Blob Storage", error.message);
    throw error;
  }
};