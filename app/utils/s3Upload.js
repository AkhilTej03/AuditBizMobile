
export const uploadImageToS3 = async (imageUri, fileName) => {
  try {
    console.log('Starting S3 upload for:', fileName);
    
    // Convert image URI to blob
    const response = await fetch(imageUri);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }
    
    const blob = await response.blob();
    console.log('Image blob created, size:', blob.size);
    
    // Generate unique filename
    const timestamp = Date.now();
    const uniqueFileName = `${timestamp}_${fileName || 'image.jpg'}`;
    
    // S3-compatible endpoint
    const s3Endpoint = 'https://zbdohbtpivctvqmnxphd.storage.supabase.co/storage/v1/s3';
    const bucketName = 'img';
    
    // Create FormData for S3 upload
    const formData = new FormData();
    formData.append('file', blob, uniqueFileName);
    
    // Upload using S3 protocol
    const uploadResponse = await fetch(`${s3Endpoint}/${bucketName}/${uniqueFileName}`, {
      method: 'PUT',
      body: blob,
      headers: {
        'Content-Type': blob.type || 'image/jpeg',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiZG9oYnRwaXZjdHZxbW54cGhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNTM3OTYsImV4cCI6MjA2ODgyOTc5Nn0.Wy9IrkjDesWC_8ON_SG9U5TqMvMHlvPfdNwiKRChsfw`
      }
    });

    if (!uploadResponse.ok) {
      throw new Error(`S3 upload failed: ${uploadResponse.status}`);
    }

    // Return the public URL
    const publicUrl = `https://zbdohbtpivctvqmnxphd.supabase.co/storage/v1/object/public/img/${uniqueFileName}`;
    console.log('S3 upload successful, URL:', publicUrl);
    
    return publicUrl;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
};
