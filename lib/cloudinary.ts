/**
 * Client-side unsigned upload to Cloudinary. Create an unsigned upload
 * preset in your Cloudinary dashboard (Settings → Upload) scoped to
 * the folders below, then set the env vars in Vercel.
 *
 * Firestore only ever stores the returned secure_url — never the raw
 * file — per the brief's media storage rule.
 */
export async function uploadToCloudinary(
  file: File,
  folder: "doctor-photos" | "pmc-licenses" | "clinic-banners" | "flash-sales"
): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error(
      "Cloudinary is not configured: set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env.local (or Vercel env vars) before uploading."
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset as string);
  formData.append("folder", `healthworkers/${folder}`);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) {
    throw new Error("Cloudinary upload failed");
  }

  const data = await res.json();
  return data.secure_url as string;
}
