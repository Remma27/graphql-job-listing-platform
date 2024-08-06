// models/JobListing.js
import mongoose from 'mongoose';

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
    requirements: [String],
    salary: {
        min: Number,
        max: Number
    },
    postedDate: {
        type: Date,
        default: Date.now
    },
    expirationDate: Date,
    status: {
        type: String,
        enum: ['open', 'closed', 'filled'],
        default: 'open'
    }
});

const JobListing = mongoose.model.JobListing || mongoose.model('JobListing', jobListingSchema);
export default JobListing;
