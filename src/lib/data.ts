import { College } from "@/lib/types";

export const colleges: College[] = [
  {
    slug: "iit-delhi",
    name: "Indian Institute of Technology Delhi",
    location: "New Delhi, Delhi",
    fees: 85000,
    rating: 4.8,
    overview:
      "Top-tier engineering institute known for research depth, strong startup culture, and excellent campus placements across core and product roles.",
    type: "Public Technical University",
    established: 1961,
    campus: "320 acres",
    website: "https://home.iitd.ac.in/",
    courses: ["B.Tech CSE", "B.Tech EE", "M.Tech AI", "MBA"],
    placements: {
      medianPackage: "₹21.5 LPA",
      highestPackage: "₹2.5 Cr",
      recruiters: ["Google", "Microsoft", "Apple", "JPMorgan"],
      placementRate: 97
    },
    reviews: [
      {
        author: "Aarav",
        program: "B.Tech CSE",
        rating: 4.9,
        summary: "Rigorous academics with tremendous peer learning and outstanding recruiter reach."
      },
      {
        author: "Meera",
        program: "MBA",
        rating: 4.7,
        summary: "Great exposure to tech-driven business roles and solid industry mentorship."
      }
    ],
    stats: {
      nirfRank: 2,
      studentStrength: "10,000+",
      hostelAvailability: true,
      examAccepted: ["JEE Advanced", "GATE", "CAT"]
    }
  },
  {
    slug: "bits-pilani",
    name: "Birla Institute of Technology and Science, Pilani",
    location: "Pilani, Rajasthan",
    fees: 300000,
    rating: 4.7,
    overview:
      "Private deemed university with a flexible academic structure, strong alumni network, and high-performing product placement outcomes.",
    type: "Private Deemed University",
    established: 1964,
    campus: "328 acres",
    website: "https://www.bits-pilani.ac.in/",
    courses: ["B.Tech", "M.Sc", "MBA", "Ph.D"],
    placements: {
      medianPackage: "₹18.8 LPA",
      highestPackage: "₹60 LPA",
      recruiters: ["Adobe", "Amazon", "Flipkart", "Deutsche Bank"],
      placementRate: 95
    },
    reviews: [
      {
        author: "Kunal",
        program: "B.Tech",
        rating: 4.8,
        summary: "One of the best campuses for exploring interdisciplinary engineering choices."
      }
    ],
    stats: {
      nirfRank: 7,
      studentStrength: "15,000+",
      hostelAvailability: true,
      examAccepted: ["BITSAT", "CAT", "GATE"]
    }
  },
  {
    slug: "nsut-delhi",
    name: "Netaji Subhas University of Technology",
    location: "New Delhi, Delhi",
    fees: 72000,
    rating: 4.4,
    overview:
      "Delhi-based technology university with competitive peer group, strong coding culture, and affordable fees for engineering aspirants.",
    type: "State University",
    established: 1983,
    campus: "145 acres",
    website: "https://www.nsut.ac.in/",
    courses: ["B.Tech CSE", "B.Tech IT", "M.Tech", "Ph.D"],
    placements: {
      medianPackage: "₹14.2 LPA",
      highestPackage: "₹60 LPA",
      recruiters: ["Adobe", "ZS", "Nagarro", "Deloitte"],
      placementRate: 90
    },
    reviews: [
      {
        author: "Sana",
        program: "B.Tech IT",
        rating: 4.5,
        summary: "Balanced mix of affordability, exposure, and strong student-led communities."
      }
    ],
    stats: {
      nirfRank: 56,
      studentStrength: "8,000+",
      hostelAvailability: true,
      examAccepted: ["JEE Main", "GATE"]
    }
  },
  {
    slug: "vnit-nagpur",
    name: "Visvesvaraya National Institute of Technology",
    location: "Nagpur, Maharashtra",
    fees: 105000,
    rating: 4.3,
    overview:
      "A reliable NIT option for students looking for solid technical education, decent campus placements, and an active academic environment.",
    type: "National Institute of Technology",
    established: 1960,
    campus: "215 acres",
    website: "https://vnit.ac.in/",
    courses: ["B.Tech", "M.Tech", "Ph.D"],
    placements: {
      medianPackage: "₹11.4 LPA",
      highestPackage: "₹44 LPA",
      recruiters: ["TCS", "Infosys", "CRED", "Honeywell"],
      placementRate: 86
    },
    reviews: [
      {
        author: "Rohit",
        program: "B.Tech Mechanical",
        rating: 4.2,
        summary: "Good academics and stable placements, especially for core and analytics roles."
      }
    ],
    stats: {
      nirfRank: 39,
      studentStrength: "7,500+",
      hostelAvailability: true,
      examAccepted: ["JEE Main", "GATE"]
    }
  },
  {
    slug: "manipal-university",
    name: "Manipal Institute of Technology",
    location: "Manipal, Karnataka",
    fees: 385000,
    rating: 4.2,
    overview:
      "Large private campus with broad course offerings, active student life, and good industry exposure for engineering and management programs.",
    type: "Private University",
    established: 1957,
    campus: "600 acres",
    website: "https://manipal.edu/",
    courses: ["B.Tech", "MCA", "MBA", "M.Tech"],
    placements: {
      medianPackage: "₹8.6 LPA",
      highestPackage: "₹52 LPA",
      recruiters: ["PayPal", "Oracle", "Capgemini", "Siemens"],
      placementRate: 88
    },
    reviews: [
      {
        author: "Anika",
        program: "B.Tech",
        rating: 4.1,
        summary: "Campus is vibrant and the opportunities are broad if you stay proactive."
      }
    ],
    stats: {
      nirfRank: 12,
      studentStrength: "25,000+",
      hostelAvailability: true,
      examAccepted: ["MET", "CAT", "GATE"]
    }
  },
  {
    slug: "pes-university",
    name: "PES University",
    location: "Bengaluru, Karnataka",
    fees: 410000,
    rating: 4.5,
    overview:
      "Bengaluru-based university with strong engineering brand, metropolitan exposure, and consistent placements in tech and product companies.",
    type: "Private University",
    established: 1972,
    campus: "65 acres",
    website: "https://pes.edu/",
    courses: ["B.Tech CSE", "B.Tech AI/ML", "MBA", "M.Tech"],
    placements: {
      medianPackage: "₹12.8 LPA",
      highestPackage: "₹65 LPA",
      recruiters: ["Amazon", "Google", "Juspay", "Goldman Sachs"],
      placementRate: 92
    },
    reviews: [
      {
        author: "Ishita",
        program: "B.Tech AI/ML",
        rating: 4.6,
        summary: "Excellent for students aiming at software engineering and product ecosystem roles."
      }
    ],
    stats: {
      nirfRank: 88,
      studentStrength: "18,000+",
      hostelAvailability: true,
      examAccepted: ["PESSAT", "JEE Main", "GATE"]
    }
  },
  {
    slug: "amrita-coimbatore",
    name: "Amrita Vishwa Vidyapeetham",
    location: "Coimbatore, Tamil Nadu",
    fees: 260000,
    rating: 4.3,
    overview:
      "Multi-campus university with a strong emphasis on discipline, placements, and balanced academic development across branches.",
    type: "Deemed University",
    established: 1994,
    campus: "400 acres",
    website: "https://www.amrita.edu/",
    courses: ["B.Tech", "MBA", "M.Tech", "Ph.D"],
    placements: {
      medianPackage: "₹9.8 LPA",
      highestPackage: "₹56 LPA",
      recruiters: ["Deloitte", "Cisco", "Wipro", "Bosch"],
      placementRate: 89
    },
    reviews: [
      {
        author: "Nikhil",
        program: "B.Tech ECE",
        rating: 4.2,
        summary: "Structured environment with decent recruiter diversity and good academic support."
      }
    ],
    stats: {
      nirfRank: 8,
      studentStrength: "20,000+",
      hostelAvailability: true,
      examAccepted: ["AEEE", "JEE Main", "CAT", "GATE"]
    }
  },
  {
    slug: "dtu-delhi",
    name: "Delhi Technological University",
    location: "New Delhi, Delhi",
    fees: 92000,
    rating: 4.6,
    overview:
      "Legacy Delhi engineering campus with strong brand value, high-quality peer cohort, and strong outcomes in software and analytics roles.",
    type: "State University",
    established: 1941,
    campus: "164 acres",
    website: "https://dtu.ac.in/",
    courses: ["B.Tech CSE", "B.Tech SE", "M.Tech", "MBA"],
    placements: {
      medianPackage: "₹18.2 LPA",
      highestPackage: "₹85 LPA",
      recruiters: ["Google", "ZS", "Microsoft", "McKinsey"],
      placementRate: 94
    },
    reviews: [
      {
        author: "Kabir",
        program: "B.Tech CSE",
        rating: 4.7,
        summary: "Strong brand, highly competitive admissions, and excellent placement upside."
      }
    ],
    stats: {
      nirfRank: 29,
      studentStrength: "9,000+",
      hostelAvailability: true,
      examAccepted: ["JEE Main", "CAT", "GATE"]
    }
  }
];
