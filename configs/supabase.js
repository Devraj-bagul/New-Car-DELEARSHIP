import { createClient } from "@supabase/supabase-js";

// Your config (from .env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON;

// Initialize Supabase (same as initializeApp in Firebase)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Instead of exporting storage object like firebase
// we directly use supabase.storage in functions

// Example upload function (like uploadBytes in firebase)
export const uploadImage = async (file, folder = "car-images") => {
  const fileName = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from(folder)
    .upload(fileName, file);

  if (error) {
    console.error("Upload failed:", error);
    return null;
  }

  const { data: publicUrl } = supabase.storage
    .from(folder)
    .getPublicUrl(fileName);

  return publicUrl.publicUrl;
};
