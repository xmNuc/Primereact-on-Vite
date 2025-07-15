/**
 * Saves a Blob as a downloadable file using native browser APIs.
 *
 * @param blob - The binary Blob to save
 * @param filename - The name for the downloaded file
 */
export const saveBlobAsFile = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 0);
};
