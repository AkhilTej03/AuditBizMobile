
import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase URL and service role key
const supabaseUrl = "https://zbdohbtpivctvqmnxphd.supabase.co"; 
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiZG9oYnRwaXZjdHZxbW54cGhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNTM3OTYsImV4cCI6MjA2ODgyOTc5Nn0.Wy9IrkjDesWC_8ON_SG9U5TqMvMHlvPfdNwiKRChsfw"; 

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
});

export const uploadImageToSupabase = async (imageUri, fileName) => {
  try {
    console.log('Starting image upload for:', fileName);
    
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
    
    // Upload to Supabase storage with additional options
    const { data, error } = await supabase.storage
      .from('img')
      .upload(uniqueFileName, blob, {
        contentType: blob.type || 'image/jpeg',
        upsert: false,
        duplex: 'half'
      });

    if (error) {
      console.error('Upload error details:', error);
      throw new Error(`Upload failed: ${error.message}`);
    }

    console.log('Upload successful:', data);

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('img')
      .getPublicUrl(uniqueFileName);

    console.log('Public URL generated:', urlData.publicUrl);
    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
