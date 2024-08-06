import mongoose from 'mongoose';

// Define el esquema para JobListing
const jobListingSchema = new mongoose.Schema({
    JobListingID: { type: Number, required: true },
    UserID: { type: Number, required: true },
    ProfesionID: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    salaryMin: { type: Number, required: true },
    salaryMax: { type: Number, required: true },
    postedDate: { type: Date, required: true },
    expirationDate: { type: Date, required: true },
    status: { type: String, required: true },
});

// Registra y exporta el modelo
mongoose.model('JobListing', jobListingSchema);

export default mongoose.model('JobListing');
