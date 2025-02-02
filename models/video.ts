import mongoose from "mongoose";
export const VIDEO_DIMENSIONS = {
    width: 1080,
    height: 1920,
} as const;
export interface Ivideo{
    title:string;
    description:string;
    _id?:mongoose.Types.ObjectId;
    createdAt?:Date;
    updatedAt?:Date;
    videoUrl:string;
    controls?:boolean;
    transformation?:{
        width:number;
        height:number;
        crop?:string;
        quality?:number;
    }
}
const videoSchema = new mongoose.Schema<Ivideo>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    controls: { type: Boolean, default: false },
    transformation: {
        width: { type: Number, default: VIDEO_DIMENSIONS.width },
        height: { type: Number, default: VIDEO_DIMENSIONS.height },
        crop: { type: String, default: "fill" },
        quality: { type: Number, default: 80 },
    },
}, { timestamps: true });
const Video = mongoose.models.Video || mongoose.model<Ivideo>("Video", videoSchema);
export default Video;