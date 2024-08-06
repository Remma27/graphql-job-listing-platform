import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    AplicationID: { type: Number, required: true },
    JobSeekerID: { type: Number, required: true },
    JobListingID: { type: Number, required: true },
    aplicationDate: { type: Date, required: true },
    status: { type: String, required: true },
});

const Application = mongoose.model('Application', applicationSchema);
export default Application;
