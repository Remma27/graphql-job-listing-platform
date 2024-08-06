Obtener Todos los Detalles de la Empresa

query {
  companyDetails {
    CompanyDetailsID
    companyName
    companyType
  }
}

Obtener un Detalle de la Empresa por ID

query {
  companyDetail(CompanyDetailsID: 1) {
    CompanyDetailsID
    companyName
    companyType
  }
}

Obtener Todas las Direcciones

query {
  addresses {
    AddressID
    canton
    details
  }
}

Obtener una Dirección por ID

query {
  address(AddressID: 1) {
    AddressID
    canton
    details
  }
}

Obtener Todas las Experiencias

query {
  experiences {
    ExperienceID
    company
    position
    startDate
    endDate
  }
}

Obtener una Experiencia por ID

query {
  experience(ExperienceID: 1) {
    ExperienceID
    company
    position
    startDate
    endDate
  }
}

Obtener Toda la Educación

query {
  educations {
    EducationID
    degree
    institution
    year
  }
}

Obtener Educación por ID

query {
  education(EducationID: 1) {
    EducationID
    degree
    institution
    year
  }
}

Obtener Todos los Anuncios de Trabajo

query {
  jobListings {
    JobListingID
    UserID
    ProfesionID
    title
    description
    requirements
    salaryMin
    salaryMax
    postedDate
    expirationDate
    status
  }
}

Obtener un Anuncio de Trabajo por ID

query {
  jobListing(JobListingID: 1) {
    JobListingID
    UserID
    ProfesionID
    title
    description
    requirements
    salaryMin
    salaryMax
    postedDate
    expirationDate
    status
  }
}

Obtener Todas las Aplicaciones

query {
  aplicaciones {
    AplicacionID
    JobSeekerID
    JobListingID
    applicationDate
    status
  }
}

Obtener una Aplicación por ID

query {
  aplicacion(AplicacionID: 1) {
    AplicacionID
    JobSeekerID
    JobListingID
    applicationDate
    status
  }
}


