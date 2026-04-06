import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkExperience extends Document {
  userId: string;
  company: string;
  role: string;
  techStack: string[];
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const WorkExperienceSchema = new Schema<IWorkExperience>(
  {
    userId: { type: String, required: true, index: true },
    company: { type: String, required: true },
    role: { type: String, required: true },
    techStack: [{ type: String }],
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    description: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const WorkExperience =
  mongoose.models.WorkExperience ||
  mongoose.model<IWorkExperience>('WorkExperience', WorkExperienceSchema);
