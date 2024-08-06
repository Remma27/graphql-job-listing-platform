import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
    ExperienceID: { type: Number, required: true },
    company: { type: String, required: true },
    jobTitle: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: false },
    responsibilities: { type: String, required: false },
});

mongoose.model('Experience', experienceSchema);

export default mongoose.model('Experience');