import mongoose from "mongoose";
import { Notes } from "../schemas/noteSchema.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import { checkIfNotesExist } from "../utils/utils.js";
import { getTimestamp } from "../utils/utils.js";

export async function createNotes(req, res) {
  try {
    const { title, subject, semester, description, isPublished } = req.body;

    if (
      !title ||
      !subject ||
      !semester ||
      !description ||
      !req.files?.thumbnail ||
      !req.files?.fileUrl
    ) {
      return res.status(404).json({
        message: "All fields and files are required",
      });
    }

    const isNotesPresent = await checkIfNotesExist(title);

    if (!isNotesPresent) {
      const thumbResult = await cloudinary.uploader.upload(
        req.files.thumbnail[0].path,
        {
          folder: "just_notes/thumbnails",
        },
      );

      const pdfResult = await cloudinary.uploader.upload(
        req.files.fileUrl[0].path,
        {
          folder: "just_notes/pdfs",
          resource_type: "raw",
        },
      );

      const notes = new Notes({
        title,
        subject,
        semester,
        thumbnail: thumbResult.secure_url,
        description,
        fileUrl: pdfResult.secure_url,
        isPublished,
      });

      const SavedNotes = await notes.save();

      fs.unlinkSync(req.files.thumbnail[0].path);
      fs.unlinkSync(req.files.fileUrl[0].path);

      res.status(201).json(SavedNotes);
      console.log(
        `[CREATE] ${getTimestamp()}: ${title} notes created by ${req.ip} Browser-Info: [${req.headers["user-agent"]}]`,
      );
    } else {
      return res.status(400).json({ message: "Notes already exists" });
    }
  } catch (error) {
    console.log("Error in createNotes", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getAllNotes(req, res) {
  try {
    const all_notes = await Notes.find({ isPublished: true }).sort({
      updatedAt: -1,
    });
    res.status(200).json(all_notes);
    console.log(
      `[FETCH] ${getTimestamp()}: All notes fetched by ${req.ip}\nBrowser-Info: [${req.headers["user-agent"]}]`,
    );
  } catch (error) {
    console.log("Error in getAllNotes: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getNotesByID(req, res) {
  try {
    const found_notes = await Notes.findById(req.params.id);

    if (!found_notes) {
      return res.status(404).json({ message: "Notes not found" });
    }

    res.status(200).json(found_notes);
    console.log(
      `[FETCH] ${getTimestamp()}: ${found_notes.title} fetched by ${req.ip}\nBrowser-Info: [${req.headers["user-agent"]}]`,
    );
  } catch (error) {
    console.log("Error in getNotesByID: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateNotes(req, res) {
  try {
    const { title, subject, semester, description, isPublished } = req.body;

    let updateData = { title, subject, semester, description, isPublished };

    if (req.files?.thumbnail) {
      const thumbResult = await cloudinary.uploader.upload(
        req.files.thumbnail[0].path,
        {
          folder: "just_notes/thumbnails",
        },
      );
      updateData.thumbnail = thumbResult.secure_url;
      fs.unlinkSync(req.files.thumbnail[0].path);
    }

    if (req.files?.fileUrl) {
      const pdfResult = await cloudinary.uploader.upload(
        req.files.fileUrl[0].path,
        {
          folder: "just_notes/pdfs",
          resource_type: "raw",
        },
      );
      updateData.fileUrl = pdfResult.secure_url;
      fs.unlinkSync(req.files.fileUrl[0].path);
    }

    const updatedNotes = await Notes.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true },
    );

    if (!updatedNotes) {
      return res.status(404).json({ message: "Notes not found" });
    }

    res.status(200).json(updatedNotes);
    console.log(
      `[UPDATE] ${getTimestamp()}: ${req.title} updated by ${req.ip}. Updated Title (if any) : ${updatedNotes.title}\nBrowser-Info: [${req.headers["user-agent"]}]`,
    );
  } catch (error) {
    console.log("Error in updateNotes: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteNotes(req, res) {
  try {
    const deletedNotes = await Notes.findByIdAndDelete(req.params.id);

    if (!deletedNotes) {
      return res.status(404).json({ message: "Notes not found" });
    }

    res.status(200).json({ message: "Deleted notes" });
    console.log(
      `[DELETE] ${getTimestamp()}: ${deletedNotes.title} deleted by ${req.ip}\nBrowser-Info: [${req.headers["user-agent"]}]`,
    );
  } catch (error) {
    console.log("Error in deleteNotes: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function downloadNotes(req, res) {
  try {
    const notes = await Notes.findById(req.params.id);

    if (!notes) return res.status(404).json({ message: "Notes not found" });

    const downloadUrl = notes.fileUrl;

    res.status(200).json({ pdfUrl: downloadUrl });
    console.log(
      `[FETCH] ${getTimestamp()}: ${notes.title} notes downloaded by ${req.ip}\nBrowser-Info: [${req.headers["user-agent"]}]`,
    );
  } catch (error) {
    console.log("Error in downloadNotes: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function searchNotes(req, res) {
  try {
    const { title } = req.query;

    console.log(
      `[SEARCH] ${getTimestamp()}: "${req.query.title}" searched by ${req.ip}\nBrowser-Info: [${req.headers["user-agent"]}]`,
    );
    const notes = await Notes.find({
      title: { $regex: title, $options: "i" },
      isPublished: true,
    });

    if (notes.length === 0) {
      return res
        .status(200)
        .json({ message: "No notes found with that title" });
    }

    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in searchNotes: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function groupNotesBySubject(req, res) {
  try {
    const groupedNotes = await Notes.aggregate([
      {
        $match: { isPublished: true },
      },
      {
        $sort: { updatedAt: -1 },
      },
      {
        $group: {
          _id: "$subject",
          allNotes: { $push: "$$ROOT" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    if (!groupedNotes || groupedNotes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No notes found",
      });
    }

    res.status(200).json(groupedNotes);
    console.log(
      `[FETCH] ${getTimestamp()}: Subject wise notes fetched by ${req.ip}\nBrowser-Info: [${req.headers["user-agent"]}]`,
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function countNotesPerSubject(_, res) {
  try {
    const notesPerSubject = await Notes.aggregate([
      {
        $match: { isPublished: true },
      },
      {
        $group: {
          _id: "$subject",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(notesPerSubject);
  } catch (error) {
    console.log("Error in countNotesPerSubject: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function countSubjectsPerSemester(_, res) {
  try {
    const stats = await Notes.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: "$semester", unique: { $addToSet: "$subject" } } },
      { $project: { _id: 0, semester: "$_id", count: { $size: "$unique" } } },
      { $sort: { semester: 1 } },
    ]);

    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
}

export async function getNotesByTimeRange(req, res) {
  try {
    const { start, end } = req.query;

    console.log(
      `[SEARCH] ${getTimestamp()}: Notes between "${req.query.start} to ${req.query.end}" searched by ${req.ip}\nBrowser-Info: [${req.headers["user-agent"]}]`,
    );

    if (!start || !end) {
      return res
        .status(400)
        .json({ message: "Start and end dates are required" });
    }

    const startDate = new Date(start);
    const endDate = new Date(end);
    endDate.setHours(23, 59, 59, 999);

    const notes = await Notes.find({
      isPublished: true,
      updatedAt: {
        $gte: startDate,
        $lte: endDate,
      },
    }).sort({ createdAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getUnpublishedNotes(req, res) {
  try {
    const unpublished_notes = await Notes.find({ isPublished: false }).sort({
      updatedAt: -1,
    });

    if (unpublished_notes.length === 0) {
      return res.status(200).json({ message: "No unpublished notes" });
    }

    res.status(200).json(unpublished_notes);
  } catch (error) {
    console.log("Error in getUnpublishedNotes: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
