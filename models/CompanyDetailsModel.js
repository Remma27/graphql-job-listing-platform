import exp from 'constants';
import mongoose from 'mongoose';

const companyDetailsSchema = new mongoose.Schema({
    companyName: String,
    companyType: String,
});

mongoose.model('CompanyDetails', companyDetailsSchema);

export default mongoose.model('CompanyDetails');
