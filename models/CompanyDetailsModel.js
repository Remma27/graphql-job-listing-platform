import mongoose from 'mongoose';

const companyDetailsSchema = new mongoose.Schema({
    CompanyDetailsID: { type: Number, required: true },
    companyName: { type: String, required: true },
    companyType: { type: String, required: true },
});

mongoose.model('CompanyDetails', companyDetailsSchema);

export default mongoose.model('CompanyDetails');
