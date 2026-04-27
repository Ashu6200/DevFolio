import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IResume extends Document {
  name: string;
  url: string;
  isActive: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const resumeSchema = new Schema<IResume>(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export const Resume: Model<IResume> =
  mongoose.models.Resume || mongoose.model<IResume>('Resume', resumeSchema);
