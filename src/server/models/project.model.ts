import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  userId: string;
  title: string;
  description: Record<string, unknown>;
  techStack: string[];
  githubLink?: string;
  liveUrl?: string;
  coverImage?: string;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: Schema.Types.Mixed, required: true },
    techStack: [{ type: String }],
    githubLink: { type: String },
    liveUrl: { type: String },
    coverImage: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Project =
  mongoose.models.Project ||
  mongoose.model<IProject>('Project', ProjectSchema);
