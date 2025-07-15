/**
 * Saves a given Blob as a downloadable file using the browser's native APIs.
 * This is a lightweight alternative to using libraries like `file-saver`.
 *
 * @param blob - The Blob to be downloaded (e.g. Excel file, PDF, etc.)
 * @param filename - The desired name of the downloaded file (e.g. "report.xlsx")
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
