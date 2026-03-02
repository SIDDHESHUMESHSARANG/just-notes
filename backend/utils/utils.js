import { Notes } from "../schemas/noteSchema.js";

export function getTimestamp() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const mins = String(date.getMinutes()).padStart(2, "0");
  const secs = String(date.getSeconds()).padStart(2, "0");

  return `[${hours}:${mins}:${secs} IST]`;
}

export async function checkIfNotesExist(title) {
  // NOTE: THIS IS NOT A CONTROLLER
  try {
    const confirmation = await Notes.findOne({ title: title.trim() });

    if (confirmation) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(`${getTimestamp()}: Error in checking if book exists`);
  }
}
