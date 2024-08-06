// models/JobSeekerProfile.js
import exp from 'constants';
import mongoose from 'mongoose';

const jobSeekerProfileSchema = new mongoose.Schema({
    JobSeekerID: { type: Number, required: true },
    UserID: { type: Number, required: true },
    ProfesionID: { type: Number, required: true },
    EducationID: { type: Number, required: true },
    ExperienceID: { type: Number, required: true },
});

mongoose.model('JobSeekerProfile', jobSeekerProfileSchema);

export default mongoose.model('JobSeekerProfile');