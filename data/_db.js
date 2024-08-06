
let usuarios = [
    {
        "id": "1",
        "cedula": "123456789",
        "name": "Juan Pérez",
        "email": "juan.perez@example.com",
        "userType": "jobSeeker",
        "gender": "male",
        "address": {
            "canton": "Puntarenas",
            "details": "Calle 123, Casa 45"
        },
        "companyDetails": null
    },
    {
        "id": "2",
        "cedula": "987654321",
        "name": "Ana Gómez",
        "email": "ana.gomez@example.com",
        "userType": "employer",
        "gender": "female",
        "address": {
            "canton": "Esparza",
            "details": "Avenida 456, Edificio 78"
        },
        "companyDetails": {
            "companyName": "Tech Innovators",
            "companyType": "Technology"
        }
    }
]

let profesiones = [
    {
        "id": "1",
        "name": "Desarrollador de Software",
        "description": "Responsable del desarrollo y mantenimiento de software."
    },
    {
        "id": "2",
        "name": "Diseñador Gráfico",
        "description": "Encargado de crear elementos visuales para comunicación y marketing."
    }
]

let perfilesBuscadores = [
    {
        "id": "1",
        "user": {
            "id": "1",
            "cedula": "123456789",
            "name": "Juan Pérez",
            "email": "juan.perez@example.com",
            "userType": "jobSeeker",
            "gender": "male",
            "address": {
                "canton": "Puntarenas",
                "details": "Calle 123, Casa 45"
            },
            "companyDetails": null
        },
        "professions": [
            {
                "id": "1",
                "name": "Desarrollador de Software",
                "description": "Responsable del desarrollo y mantenimiento de software."
            }
        ],
        "education": [
            {
                "degree": "Ingeniería en Sistemas",
                "institution": "Universidad de Costa Rica",
                "year": 2020
            }
        ],
        "experience": [
            {
                "company": "Tech Solutions",
                "position": "Desarrollador Junior",
                "startDate": "2021-01-01",
                "endDate": "2022-06-30"
            }
        ],
        "skills": ["JavaScript", "React", "Node.js"]
    }
]

let ofertas = [
    {
        "id": "1",
        "employer": {
            "id": "2",
            "cedula": "987654321",
            "name": "Ana Gómez",
            "email": "ana.gomez@example.com",
            "userType": "employer",
            "gender": "female",
            "address": {
                "canton": "Esparza",
                "details": "Avenida 456, Edificio 78"
            },
            "companyDetails": {
                "companyName": "Tech Innovators",
                "companyType": "Technology"
            }
        },
        "title": "Desarrollador Frontend",
        "description": "Buscamos un desarrollador frontend con experiencia en React.",
        "profession": {
            "id": "1",
            "name": "Desarrollador de Software",
            "description": "Responsable del desarrollo y mantenimiento de software."
        },
        "requirements": ["React", "JavaScript", "HTML", "CSS"],
        "salary": {
            "min": 1500,
            "max": 2500
        },
        "postedDate": "2024-08-01",
        "expirationDate": "2024-09-01",
        "status": "open"
    }
]

let aplicaciones = [
    {
        "id": "1",
        "jobSeeker": {
            "id": "1",
            "cedula": "123456789",
            "name": "Juan Pérez",
            "email": "juan.perez@example.com",
            "userType": "jobSeeker",
            "gender": "male",
            "address": {
                "canton": "Puntarenas",
                "details": "Calle 123, Casa 45"
            },
            "companyDetails": null
        },
        "jobListing": {
            "id": "1",
            "employer": {
                "id": "2",
                "cedula": "987654321",
                "name": "Ana Gómez",
                "email": "ana.gomez@example.com",
                "userType": "employer",
                "gender": "female",
                "address": {
                    "canton": "Esparza",
                    "details": "Avenida 456, Edificio 78"
                },
                "companyDetails": {
                    "companyName": "Tech Innovators",
                    "companyType": "Technology"
                }
            },
            "title": "Desarrollador Frontend",
            "description": "Buscamos un desarrollador frontend con experiencia en React.",
            "profession": {
                "id": "1",
                "name": "Desarrollador de Software",
                "description": "Responsable del desarrollo y mantenimiento de software."
            },
            "requirements": ["React", "JavaScript", "HTML", "CSS"],
            "salary": {
                "min": 1500,
                "max": 2500
            },
            "postedDate": "2024-08-01",
            "expirationDate": "2024-09-01",
            "status": "open"
        },
        "applicationDate": "2024-08-05",
        "status": "pending"
    }
]

export default { usuarios, profesiones, perfilesBuscadores, ofertas, aplicaciones }