// models/JobSeekerProfile.js
import mongoose from 'mongoose';

const jobSeekerProfileSchema = new mongoose.Schema({
    user: {  // Asegúrate de usar el nombre correcto aquí
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    professions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profession',
        required: true
    }],
    education: [{
        degree: String,
        institution: String,
        year: Number
    }],
    experience: [{
        company: String,
        position: String,
        startDate: Date,
        endDate: Date
    }],
    skills: [String]
});

mongoose.model('JobSeekerProfile', jobSeekerProfileSchema);