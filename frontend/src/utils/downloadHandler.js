export const handleDownload = (url, title, fileName = `${title}-just-notes.pdf`) => {
  if (!url) return;

  const downloadUrl = url.replace("/upload/", "/upload/fl_attachment/");

  const link = document.createElement("a");
  link.href = downloadUrl;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
