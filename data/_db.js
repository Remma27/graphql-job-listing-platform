import mongoose from 'mongoose';
import User from '../models/userModel.js';
import Profession from '../models/ProfessionModel.js';
import JobSeekerProfile from '../models/JobSeekerModel.js';
import JobListing from '../models/JobListiningModel.js';
import Application from '../models/ApplicationModel.js';

// Sample data
const users = [
    {
        _id: new mongoose.Types.ObjectId(),  // Generate new ObjectId
        cedula: "123456789",
        name: "Juan Pérez",
        email: "juan.perez@example.com",
        userType: "jobSeeker",
        gender: "male",
        address: {
            canton: "Puntarenas",
            details: "123 Calle Principal, Puntarenas"
        },
        companyDetails: null
    },
    {
        _id: new mongoose.Types.ObjectId(),  // Generate new ObjectId
        cedula: "987654321",
        name: "María López",
        email: "maria.lopez@example.com",
        userType: "employer",
        gender: "female",
        address: {
            canton: "Esparza",
            details: "456 Avenida Secundaria, Esparza"
        },
        companyDetails: {
            companyName: "Tech Solutions",
            companyType: "IT"
        }
    }
];

const professions = [
    {
        _id: new mongoose.Types.ObjectId(),  // Generate new ObjectId
        name: "Software Developer",
        description: "Develops software applications."
    },
    {
        _id: new mongoose.Types.ObjectId(),  // Generate new ObjectId
        name: "Graphic Designer",
        description: "Creates visual content."
    }
];

// Use these IDs to create references
const userIds = {
    jobSeeker: users[0]._id,
    employer: users[1]._id
};

const professionIds = {
    softwareDeveloper: professions[0]._id,
    graphicDesigner: professions[1]._id
};

const jobSeekerProfiles = [
    {
        _id: new mongoose.Types.ObjectId(),  // Generate new ObjectId
        user: userIds.jobSeeker,  // Asegúrate de usar `user` aquí
        professions: [professionIds.softwareDeveloper],
        education: [
            {
                degree: "Bachelor's Degree in Computer Science",
                institution: "Universidad de Costa Rica",
                year: 2020
            }
        ],
        experience: [
            {
                company: "Tech Innovators",
                position: "Junior Developer",
                startDate: new Date("2021-01-01"),
                endDate: new Date("2023-01-01")
            }
        ],
        skills: ["JavaScript", "React", "Node.js"]
    }
];

const jobListings = [
    {
        _id: new mongoose.Types.ObjectId(),  // Generate new ObjectId
        employerId: userIds.employer,  // Use the correct field name
        title: "Senior Software Engineer",
        description: "Responsible for developing and maintaining software applications.",
        professionId: professionIds.softwareDeveloper,  // Use the correct field name
        requirements: ["5+ years experience", "Knowledge of JavaScript frameworks"],
        salary: {
            min: 60000,
            max: 90000
        },
        postedDate: new Date('2024-08-01'),
        expirationDate: new Date('2024-09-01'),
        status: "open"
    }
];

const applications = [
    {
        _id: new mongoose.Types.ObjectId(),  // Generate new ObjectId
        jobSeeker: userIds.jobSeeker,
        jobListing: jobListings[0]._id,
        applicationDate: new Date('2024-08-02'),
        status: "pending"
    }
];

export async function seedDatabase() {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Profession.deleteMany({});
        await JobSeekerProfile.deleteMany({});
        await JobListing.deleteMany({});
        await Application.deleteMany({});

        // Insert Users
        const insertedUsers = await User.insertMany(users);
        console.log('Users inserted', insertedUsers);

        // Insert Professions
        const insertedProfessions = await Profession.insertMany(professions);
        console.log('Professions inserted', insertedProfessions);

        // Insert Job Seeker Profiles
        const profilesWithReferences = jobSeekerProfiles.map(profile => ({
            ...profile,
            user: insertedUsers.find(u => u._id.toString() === profile.user.toString())?._id,
            professions: profile.professions.map(profId => insertedProfessions.find(p => p._id.toString() === profId.toString())?._id)
        }));

        await JobSeekerProfile.insertMany(profilesWithReferences);
        console.log('Job Seeker Profiles inserted');

        // Insert Job Listings
        const listingsWithReferences = jobListings.map(listing => ({
            ...listing,
            employer: insertedUsers.find(u => u._id.toString() === listing.employer.toString())?._id,
            profession: insertedProfessions.find(p => p._id.toString() === listing.profession.toString())?._id
        }));

        await JobListing.insertMany(listingsWithReferences);
        console.log('Job Listings inserted');

        // Insert Applications
        const applicationsWithReferences = applications.map(app => ({
            ...app,
            jobSeeker: insertedUsers.find(u => u._id.toString() === app.jobSeeker.toString())?._id,
            jobListing: jobListings.find(l => l._id.toString() === app.jobListing.toString())?._id
        }));

        await Application.insertMany(applicationsWithReferences);
        console.log('Applications inserted');

    } catch (error) {
        console.error('Error seeding database:', error);
    }
}
