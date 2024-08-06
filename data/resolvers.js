import User from '../models/userModel.js';
import JobSeekerProfile from '../models/JobSeekerModel.js';
import JobListing from '../models/JobListiningModel.js';
import Application from '../models/ApplicationModel.js';
import Profession from '../models/ProfessionModel.js';

const resolvers = {
    Query: {
        getUser: async (_, { id }) => {
            return await User.findById(id);
        },
        getAllUsers: async () => {
            return await User.find();
        },
        getJobSeekerProfile: async (_, { userId }) => {
            return await JobSeekerProfile.findOne({ userId }).populate('userId').populate('professions');
        },
        getJobListing: async (_, { id }) => {
            return await JobListing.findById(id).populate('employerId').populate('professionId');
        },
        getAllJobListings: async () => {
            return await JobListing.find().populate('employerId').populate('professionId');
        },
        getApplicationsForJobListing: async (_, { jobListingId }) => {
            return await Application.find({ jobListingId }).populate('jobSeekerId').populate('jobListingId');
        },
        getApplicationsForJobSeeker: async (_, { jobSeekerId }) => {
            return await Application.find({ jobSeekerId }).populate('jobSeekerId').populate('jobListingId');
        },
        getProfessionalsForArea: async (_, { professionId }) => {
            return await JobSeekerProfile.find({ professions: professionId }).populate('userId').populate('professions');
        },
        getProfessionalCountByArea: async () => {
            const professions = await Profession.find();
            const totalProfiles = await JobSeekerProfile.countDocuments();

            const counts = await Promise.all(professions.map(async (profession) => {
                const count = await JobSeekerProfile.countDocuments({ professions: profession._id });
                return {
                    profession,
                    count,
                    percentage: (count / totalProfiles) * 100
                };
            }));

            return counts;
        },
        getProfessionalCountByGender: async () => {
            const maleCount = await User.countDocuments({ userType: 'jobSeeker', gender: 'male' });
            const femaleCount = await User.countDocuments({ userType: 'jobSeeker', gender: 'female' });
            const otherCount = await User.countDocuments({
                userType: 'jobSeeker',
                $or: [{ gender: { $nin: ['male', 'female'] } }, { gender: { $exists: false } }]
            });

            return { male: maleCount, female: femaleCount, other: otherCount };
        },
    },
    Mutation: {
        createUser: async (_, { input }) => {
            const user = new User(input);
            await user.save();
            return user;
        },
        createJobSeekerProfile: async (_, { input }) => {
            const profile = new JobSeekerProfile(input);
            await profile.save();
            return await JobSeekerProfile.findById(profile._id).populate('userId').populate('professions');
        },
        createJobListing: async (_, { input }) => {
            const jobListing = new JobListing(input);
            await jobListing.save();
            return await JobListing.findById(jobListing._id).populate('employerId').populate('professionId');
        },
        applyForJob: async (_, { jobSeekerId, jobListingId }) => {
            // Check if the job seeker has already applied to 3 jobs this month
            const currentDate = new Date();
            const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const applicationsThisMonth = await Application.countDocuments({
                jobSeekerId,
                applicationDate: { $gte: firstDayOfMonth }
            });

            if (applicationsThisMonth >= 3) {
                throw new Error('You have already applied to 3 jobs this month');
            }

            const application = new Application({ jobSeekerId, jobListingId });
            await application.save();
            return await Application.findById(application._id).populate('jobSeekerId').populate('jobListingId');
        },
        updateJobListingStatus: async (_, { id, status }) => {
            const updatedJobListing = await JobListing.findByIdAndUpdate(id, { status }, { new: true })
                .populate('employerId')
                .populate('professionId');
            return updatedJobListing;
        },
    },
};

export default resolvers;
