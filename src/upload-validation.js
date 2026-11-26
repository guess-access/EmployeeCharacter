const MAX_REFERENCE_IMAGE_BYTES = 10 * 1024 * 1024;
const ALLOWED_REFERENCE_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export function validateReferenceImage(file) {
  if (!file) return "Choose an image to continue.";
  if (!ALLOWED_REFERENCE_IMAGE_TYPES.has(file.type)) {
    return "Unsupported image format. Choose a JPG, PNG, or WEBP image.";
  }
  if (file.size <= 0) return "The selected image is empty. Choose another file.";
  if (file.size > MAX_REFERENCE_IMAGE_BYTES) {
    return "The image is larger than 10 MB. Choose a smaller file.";
  }
  return null;
}

export function formatFileSize(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
