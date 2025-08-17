
import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase URL and service role key
const supabaseUrl = "https://zbdohbtpivctvqmnxphd.supabase.co"; 
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiZG9oYnRwaXZjdHZxbW54cGhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNTM3OTYsImV4cCI6MjA2ODgyOTc5Nn0.Wy9IrkjDesWC_8ON_SG9U5TqMvMHlvPfdNwiKRChsfw"; 

export const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadImageToSupabase = async (imageUri, fileName) => {
  try {
    // Convert image URI to blob
    const response = await fetch(imageUri);
    const blob = await response.blob();
    
    // Generate unique filename
    const timestamp = Date.now();
    const uniqueFileName = `${timestamp}_${fileName || 'image.jpg'}`;
    
    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from('img')
      .upload(uniqueFileName, blob, {
        contentType: blob.type || 'image/jpeg',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      throw error;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('img')
      .getPublicUrl(uniqueFileName);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
