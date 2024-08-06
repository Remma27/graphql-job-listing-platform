import mongoose from 'mongoose';

// Define el esquema para JobListing
const jobListingSchema = new mongoose.Schema({
    employerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    professionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profession',
        required: true
    },
    requirements: {
        type: [String],
        default: []
    },
    salary: {
        min: {
            type: Number,
            required: false
        },
        max: {
            type: Number,
            required: false
        }
    },
    postedDate: {
        type: Date,
        default: Date.now
    },
    expirationDate: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        enum: ['open', 'closed', 'filled'],
        default: 'open'
    }
});

// Registra y exporta el modelo
mongoose.model('JobListing', jobListingSchema);
