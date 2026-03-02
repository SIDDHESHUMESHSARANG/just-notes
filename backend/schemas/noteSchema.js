import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, "Please add a title"], 
    trim: true 
  },

  subject: { 
    type: String, 
    required: [true, "Please specify the subject"] 
  },

  semester: { 
    type: Number, 
    required: [true, "Semester is required"],
    min: 1, 
    max: 6 
  },

  description: { 
    type: String, 
  },

  thumbnail: { 
    type: String, 
    default: "https://via.placeholder.com/150"
  },

  fileUrl: { 
    type: String, 
    required: [true, "The Google Drive link is missing"] 
  },

  isPublished: { 
    type: Boolean, 
    default: false
  }
},
{ timestamps: true });

export const Notes = mongoose.model('Notes', noteSchema);
 