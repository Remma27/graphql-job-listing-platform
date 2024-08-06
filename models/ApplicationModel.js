// models/JobListing.js
import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    jobSeekerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobListingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobListing',
        required: true
    },
    applicationDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'accepted', 'rejected'],
        default: 'pending'
    }
});

const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);

export default Application;