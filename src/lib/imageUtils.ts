/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Reads a local image File and optimizes it (resizing if overly large and
 * compressing to JPEG/WebP when appropriate) so it fits cleanly in localStorage.
 */
export function processImageFile(file: File, maxDim = 1600, quality = 0.84): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.size > 10 * 1024 * 1024) {
      reject(new Error("File size exceeds 10MB limit. Please choose a smaller image."));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read selected file."));
    reader.onload = () => {
      const dataUrl = reader.result;
      if (typeof dataUrl !== "string") {
        reject(new Error("Invalid image data."));
        return;
      }

      // If it's already small (< 220KB) or an SVG/GIF, return as-is
      if (file.size < 220 * 1024 || file.type === "image/svg+xml" || file.type === "image/gif") {
        resolve(dataUrl);
        return;
      }

      const img = new Image();
      img.onerror = () => resolve(dataUrl); // fallback to raw dataUrl
      img.onload = () => {
        try {
          let { width, height } = img;
          if (width > maxDim || height > maxDim) {
            if (width >= height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(dataUrl);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const outputMime = file.type === "image/png" ? "image/webp" : "image/jpeg";
          const compressed = canvas.toDataURL(outputMime, quality);
          resolve(compressed.length < dataUrl.length ? compressed : dataUrl);
        } catch {
          resolve(dataUrl);
        }
      };
      img.src = dataUrl;
    };

    reader.readAsDataURL(file);
  });
}
