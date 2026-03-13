import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema(
  {
    url: String,
    filename: String,
    originalName: String,
    type: String,
    size: Number,
  },
  { timestamps: true }
);

export const File = mongoose.model('File', fileSchema);
