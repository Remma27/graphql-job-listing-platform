export const typeDefs = `#graphql
type Usuario {
    id: ID!
    cedula: String
    name: String
    email: String
    userType: String
    gender: String
    address: Address
    companyDetails: CompanyDetails
  }

  type Address {
    id: ID!
    canton: String
    details: String
  }

  type CompanyDetails {
    id: ID!
    companyName: String
    companyType: String
  }

  type Profesion {
    id: ID!
    name: String
    description: String
  }

  type PerfilBuscador {
    id: ID!
    user: Usuario
    professions: [Profesion]
    education: [Education]
    experience: [Experience]
  }

  type Education {
    id: ID!
    degree: String
    institution: String
    year: Int
  }

  type Experience {
    id: ID!
    company: String
    position: String
    startDate: String
    endDate: String
  }

  type Oferta {
    id: ID!
    employer: Usuario
    title: String
    description: String
    profession: Profesion
    requirements: [String]
    salary: Salary
    postedDate: String
    expirationDate: String
    status: String
  }

  type Salary {
    min: Int
    max: Int
  }

  type Aplicacion {
    id: ID!
    jobSeeker: Usuario
    jobListing: Oferta
    applicationDate: String
    status: String
  }

  type Query {
    usuarios: [Usuario]
    usuario(id: ID!): Usuario
    profesiones: [Profesion]
    profesion(id: ID!): Profesion
    perfilesBuscadores: [PerfilBuscador]
    perfilBuscador(id: ID!): PerfilBuscador
    ofertas: [Oferta]
    oferta(id: ID!): Oferta
    aplicaciones: [Aplicacion]
    aplicacion(id: ID!): Aplicacion
  }
  
  type Mutation {
  createUsuario(
    cedula: String
    name: String
    email: String
    userType: String
    gender: String
    addressId: ID
    companyDetailsId: ID
  ): Usuario

  updateUsuario(
    id: ID!
    cedula: String
    name: String
    email: String
    userType: String
    gender: String
    addressId: ID
    companyDetailsId: ID
  ): Usuario

  deleteUsuario(id: ID!): Usuario

  createProfesion(name: String, description: String): Profesion

  updateProfesion(id: ID!, name: String, description: String): Profesion

  deleteProfesion(id: ID!): Profesion

  createPerfilBuscador(
    userId: ID!
    professionsIds: [ID]
    educationIds: [ID]
    experienceIds: [ID]
  ): PerfilBuscador

  updatePerfilBuscador(
    id: ID!
    professionsIds: [ID]
    educationIds: [ID]
    experienceIds: [ID]
  ): PerfilBuscador

  deletePerfilBuscador(id: ID!): PerfilBuscador

  createOferta(
    employerId: ID!
    title: String
    description: String
    professionId: ID
    requirements: [String]
    salaryMin: Int
    salaryMax: Int
    postedDate: String
    expirationDate: String
    status: String
  ): Oferta

  updateOferta(
    id: ID!
    title: String
    description: String
    professionId: ID
    requirements: [String]
    salaryMin: Int
    salaryMax: Int
    postedDate: String
    expirationDate: String
    status: String
  ): Oferta

  deleteOferta(id: ID!): Oferta

  createAplicacion(
    jobSeekerId: ID!
    jobListingId: ID!
    applicationDate: String
    status: String
  ): Aplicacion

  updateAplicacion(
    id: ID!
    applicationDate: String
    status: String
  ): Aplicacion

  deleteAplicacion(id: ID!): Aplicacion
}`;