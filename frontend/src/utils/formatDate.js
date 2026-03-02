export default function formatDate(date) {
  const dateObj = new Date(date);

  return dateObj.toLocaleString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Asia/Kolkata"
  });
}
