export const typeDefs = `#graphql
type CompanyDetails {
  CompanyDetailsID: Int!
  companyName: String
  companyType: String
}

type Address {
  AddressID: Int!
  canton: String
  details: String
}

type Experience {
  ExperienceID: Int!
  company: String
  position: String
  startDate: String
  endDate: String
}

type Education {
  EducationID: Int!
  degree: String
  institution: String
  year: Int
}

type Profesion {
  ProfesionID: Int!
  name: String
  description: String
}

type User {
  UserID: Int!
  CompanyDetailsID: Int!
  AddressID: Int!
  Cedula: Int!
  name: String
  email: String
  userType: String
  gender: String
}

type JobSeeker {
  JobSeekerID: Int!
  UserID: Int!
  ProfesionID: Int!
  EducationID: Int!
  ExperienceID: Int!
}

type JobListing {
  JobListingID: Int!
  UserID: Int!
  ProfesionID: Int!
  title: String
  description: String
  requirements: [String]
  salaryMin: Int
  salaryMax: Int
  postedDate: String
  expirationDate: String
  status: String
}

type Aplicacion {
  AplicacionID: Int!
  JobSeekerID: Int!
  JobListingID: Int!
  applicationDate: String
  status: String
}

type Query {
  usuarios: [User]
  usuario(UserID: Int!): User
  profesiones: [Profesion]
  profesion(ProfesionID: Int!): Profesion
  jobSeekers: [JobSeeker]
  jobSeeker(JobSeekerID: Int!): JobSeeker
  jobListings: [JobListing]
  jobListing(JobListingID: Int!): JobListing
  aplicaciones: [Aplicacion]
  aplicacion(AplicacionID: Int!): Aplicacion
  experiences: [Experience]
  experience(ExperienceID: Int!): Experience
  education(EducationID: Int!): Education
  educations: [Education]
  companyDetail(CompanyDetailsID: Int!): CompanyDetails
  companyDetails: [CompanyDetails]
  address(AddressID: Int!): Address
  addresses: [Address]
}

type Mutation {
  createUsuario(
    Cedula: Int!
    name: String
    email: String
    userType: String
    gender: String
    addressID: Int
    companyDetailsID: Int
  ): User

  updateUsuario(
    UserID: Int!
    Cedula: Int!
    name: String
    email: String
    userType: String
    gender: String
    addressID: Int
    companyDetailsID: Int
  ): User

  deleteUsuario(UserID: Int!): User

  createProfesion(
    name: String
    description: String
  ): Profesion

  updateProfesion(
    ProfesionID: Int!
    name: String
    description: String
  ): Profesion

  deleteProfesion(ProfesionID: Int!): Profesion

  createJobSeeker(
    UserID: Int!
    ProfesionID: Int!
    EducationID: Int!
    ExperienceID: Int!
  ): JobSeeker

  updateJobSeeker(
    JobSeekerID: Int!
    ProfesionID: Int
    EducationID: Int
    ExperienceID: Int
  ): JobSeeker

  deleteJobSeeker(JobSeekerID: Int!): JobSeeker

  createJobListing(
    UserID: Int!
    ProfesionID: Int
    title: String
    description: String
    requirements: [String]
    salaryMin: Int
    salaryMax: Int
    postedDate: String
    expirationDate: String
    status: String
  ): JobListing

  updateJobListing(
    JobListingID: Int!
    title: String
    description: String
    ProfesionID: Int
    requirements: [String]
    salaryMin: Int
    salaryMax: Int
    postedDate: String
    expirationDate: String
    status: String
  ): JobListing

  deleteJobListing(JobListingID: Int!): JobListing

  createAplicacion(
    JobSeekerID: Int!
    JobListingID: Int!
    applicationDate: String
    status: String
  ): Aplicacion

  updateAplicacion(
    AplicacionID: Int!
    applicationDate: String
    status: String
  ): Aplicacion

  deleteAplicacion(AplicacionID: Int!): Aplicacion
}
`;