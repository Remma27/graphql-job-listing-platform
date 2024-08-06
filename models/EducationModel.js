import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    fieldOfStudy: { type: String, required: false },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String, required: false },
});

mongoose.model('Education', educationSchema);

export default mongoose.model('Education');