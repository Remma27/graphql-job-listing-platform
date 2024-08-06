import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    professionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profession', required: true },
    salary: { type: Number, required: false },
    location: { type: String, required: false },
    datePosted: { type: Date, default: Date.now },
});

mongoose.model('Offer', offerSchema);

export default mongoose.model('Offer');