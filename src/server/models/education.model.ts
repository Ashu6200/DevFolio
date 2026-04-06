import mongoose, { Schema, Document } from 'mongoose';

export interface IEducation extends Document {
  userId: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  highlights: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const EducationSchema = new Schema<IEducation>(
  {
    userId: { type: String, required: true, index: true },
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    field: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    description: { type: String, default: '' },
    highlights: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Education =
  mongoose.models.Education ||
  mongoose.model<IEducation>('Education', EducationSchema);
