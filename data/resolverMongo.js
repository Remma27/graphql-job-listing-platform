import User from '../models/userModel.js';
import JobListing from '../models/JobListingModel.js';
import Application from '../models/ApplicationModel.js';
import Profession from '../models/ProfessionModel.js';
import JobSeeker from '../models/JobSeekerModel.js';
import Education from '../models/EducationModel.js';
import Experience from '../models/ExperienceModel.js';
import Address from '../models/AddressModel.js';
import CompanyDetails from '../models/CompanyDetailsModel.js';

export const resolvers = {
    Query: {
        usuarios: async () => {
            return await User.find().exec();
        },
        usuario: async (_, { UserID }) => {
            return await User.findOne({ UserID }).exec();
        },
        profesiones: async () => {
            return await Profession.find().exec();
        },
        profesion: async (_, { ProfesionID }) => {
            return await Profession.findOne({ ProfesionID }).exec();
        },
        jobSeekers: async () => {
            return await JobSeeker.find().exec();
        },
        jobSeeker: async (_, { JobSeekerID }) => {
            return await JobSeeker.findOne({ JobSeekerID }).exec();
        },
        jobListings: async () => {
            return await JobListing.find().exec();
        },
        jobListing: async (_, { JobListingID }) => {
            return await JobListing.findOne({ JobListingID }).exec();
        },
        experience: async (_, { ExperienceID }) => {
            return await Experience.findOne({ ExperienceID }).exec();
        },
        experiences: async () => {
            return await Experience.find().exec();
        },
        education: async (_, { EducationID }) => {
            return await Education.findOne({ EducationID }).exec();
        },
        educations: async () => {
            return await Education.find().exec();
        },
        companyDetail: async (_, { CompanyDetailsID }) => {
            return await CompanyDetails.findOne({ CompanyDetailsID }).exec();
        },
        companyDetails: async () => {
            return await CompanyDetails.find().exec();
        },
        aplicaciones: async () => {
            return await Application.find().exec();
        },
        aplicacion: async (_, { AplicacionID }) => {
            return await Application.findOne({ AplicacionID }).exec();
        },
        address: async (_, { AddressID }) => {
            return await Address.findOne({ AddressID }).exec();
        },
        addresses: async () => {
            return await Address.find().exec();
        },
    },
    Mutation: {
        createUsuario: async (_, { Cedula, name, email, userType, gender, addressID, companyDetailsID }) => {
            const newUser = new User({ Cedula, name, email, userType, gender, AddressID: addressID, CompanyDetailsID: companyDetailsID });
            return await newUser.save();
        },
        updateUsuario: async (_, { UserID, Cedula, name, email, userType, gender, addressID, companyDetailsID }) => {
            return await User.findOneAndUpdate({ UserID }, { Cedula, name, email, userType, gender, AddressID: addressID, CompanyDetailsID: companyDetailsID }, { new: true }).exec();
        },
        deleteUsuario: async (_, { UserID }) => {
            const user = await User.findOneAndDelete({ UserID }).exec();
            if (!user) throw new Error('Usuario no encontrado');
            return user;
        },
        createProfesion: async (_, { name, description }) => {
            const newProfession = new Profession({ name, description });
            return await newProfession.save();
        },
        updateProfesion: async (_, { ProfesionID, name, description }) => {
            return await Profession.findOneAndUpdate({ ProfesionID }, { name, description }, { new: true }).exec();
        },
        deleteProfesion: async (_, { ProfesionID }) => {
            const profession = await Profession.findOneAndDelete({ ProfesionID }).exec();
            if (!profession) throw new Error('Profesión no encontrada');
            return profession;
        },
        createJobSeeker: async (_, { UserID, ProfesionID, EducationID, ExperienceID }) => {
            const newJobSeeker = new JobSeeker({ UserID, ProfesionID, EducationID, ExperienceID });
            return await newJobSeeker.save();
        },
        updateJobSeeker: async (_, { JobSeekerID, ProfesionID, EducationID, ExperienceID }) => {
            return await JobSeeker.findOneAndUpdate({ JobSeekerID }, { ProfesionID, EducationID, ExperienceID }, { new: true }).exec();
        },
        deleteJobSeeker: async (_, { JobSeekerID }) => {
            const jobSeeker = await JobSeeker.findOneAndDelete({ JobSeekerID }).exec();
            if (!jobSeeker) throw new Error('Buscador de empleo no encontrado');
            return jobSeeker;
        },
        createJobListing: async (_, { UserID, ProfesionID, title, description, requirements, salaryMin, salaryMax, postedDate, expirationDate, status }) => {
            const newJobListing = new JobListing({ UserID, ProfesionID, title, description, requirements, salaryMin, salaryMax, postedDate, expirationDate, status });
            return await newJobListing.save();
        },
        updateJobListing: async (_, { JobListingID, title, description, ProfesionID, requirements, salaryMin, salaryMax, postedDate, expirationDate, status }) => {
            return await JobListing.findOneAndUpdate({ JobListingID }, { title, description, ProfesionID, requirements, salaryMin, salaryMax, postedDate, expirationDate, status }, { new: true }).exec();
        },
        deleteJobListing: async (_, { JobListingID }) => {
            const jobListing = await JobListing.findOneAndDelete({ JobListingID }).exec();
            if (!jobListing) throw new Error('Anuncio de trabajo no encontrado');
            return jobListing;
        },
        createAplicacion: async (_, { JobSeekerID, JobListingID, applicationDate, status }) => {
            const newApplication = new Application({ JobSeekerID, JobListingID, applicationDate, status });
            return await newApplication.save();
        },
        updateAplicacion: async (_, { AplicacionID, applicationDate, status }) => {
            return await Application.findOneAndUpdate({ AplicacionID }, { applicationDate, status }, { new: true }).exec();
        },
        deleteAplicacion: async (_, { AplicacionID }) => {
            const application = await Application.findOneAndDelete({ AplicacionID }).exec();
            if (!application) throw new Error('Aplicación no encontrada');
            return application;
        },
    },
};

export default resolvers;
