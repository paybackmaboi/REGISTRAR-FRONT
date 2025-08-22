// This file holds the dummy data generators.

export let registrations = [];
const firstNames = ["Juan", "Maria", "Jose", "Anna", "Luis", "Sofia", "Carlos", "Isabella", "Miguel", "Camila"];
const lastNames = ["Dela Cruz", "Garcia", "Reyes", "Santos", "Ramos", "Mendoza", "Gonzales", "Flores", "Villanueva", "Lim"];
const courses = ["BSIT", "BSCS", "BSBA-HRDM", "BSED-EN", "BS-ARCH"];

// This function now initializes the registrations array only if it's empty.
export const createDummyRegistrations = () => {
    if (registrations.length === 0) {
        for (let i = 1; i <= 10; i++) {
            registrations.push({
                id: i, regNo: `2024-P${1000 + i}`, name: `${lastNames[i-1]}, ${firstNames[i-1]} M.`, date: new Date(2024, 5, i).toISOString().split('T')[0], status: 'pending', course: courses[i % 5], gender: i % 2 === 0 ? 'Male' : 'Female'
            });
        }
        for (let i = 1; i <= 20; i++) {
            registrations.push({
                id: 10 + i, regNo: `2024-A${2000 + i}`, name: `${lastNames[i % 10]}, ${firstNames[(i + 1) % 10]} S.`, date: new Date(2024, 4, i).toISOString().split('T')[0], status: 'approved', course: courses[i % 5], gender: i % 2 === 0 ? 'Male' : 'Female'
            });
        }
    }
    return registrations;
};

export const addStudentToDummyData = (newStudent) => {
    // Prevent duplicates
    if (!registrations.find(student => student.id === newStudent.id)) {
        registrations.push(newStudent);
    }
};

// NEW FUNCTION: Provides pre-packaged subjects for enrollment
export const getSubjectsForEnrollment = (course, yearLevel, semester) => {
    // In a real app, yearLevel and semester would be used to fetch the correct subjects.
    // For this mock-up, we'll return a default 1st Year, 1st Semester load for each course.
    const courseSubjects = {
        'BSIT': [
            { code: 'IT101', description: 'Introduction to Computing', units: 3, schedule: '08:00 AM - 09:00 AM', days: 'MWF', room: '301' },
            { code: 'MATH101', description: 'Mathematics in the Modern World', units: 3, schedule: '09:00 AM - 10:00 AM', days: 'MWF', room: '302' },
            { code: 'ENG101', description: 'Purposive Communication', units: 3, schedule: '10:30 AM - 12:00 PM', days: 'TTH', room: '210' },
            { code: 'FIL101', description: 'Kontekstwalisadong Komunikasyon', units: 3, schedule: '01:00 PM - 02:00 PM', days: 'MWF', room: '211' },
            { code: 'PE101', description: 'Physical Education 1', units: 2, schedule: '02:30 PM - 04:00 PM', days: 'TTH', room: 'GYM' },
        ],
        'BSCS': [
            { code: 'CS101', description: 'Fundamentals of Programming', units: 3, schedule: '08:00 AM - 09:00 AM', days: 'MWF', room: '303' },
            { code: 'MATH101', description: 'Mathematics in the Modern World', units: 3, schedule: '09:00 AM - 10:00 AM', days: 'MWF', room: '302' },
            { code: 'ENG101', description: 'Purposive Communication', units: 3, schedule: '10:30 AM - 12:00 PM', days: 'TTH', room: '210' },
            { code: 'GE101', description: 'Understanding the Self', units: 3, schedule: '01:00 PM - 02:30 PM', days: 'TTH', room: '212' },
            { code: 'PE101', description: 'Physical Education 1', units: 2, schedule: '02:30 PM - 04:00 PM', days: 'TTH', room: 'GYM' },
        ],
        'BSBA-HRDM': [
            { code: 'BA101', description: 'Principles of Management', units: 3, schedule: '08:00 AM - 09:00 AM', days: 'MWF', room: '401' },
            { code: 'ECON101', description: 'Basic Economics', units: 3, schedule: '09:00 AM - 10:00 AM', days: 'MWF', room: '402' },
            { code: 'ACCT101', description: 'Fundamentals of Accounting', units: 3, schedule: '01:00 PM - 02:30 PM', days: 'TTH', room: '403' },
            { code: 'PE101', description: 'Physical Education 1', units: 2, schedule: '04:00 PM - 05:30 PM', days: 'TTH', room: 'GYM' },
        ],
        'BSED-EN': [
            { code: 'ED101', description: 'The Child and Adolescent Learners', units: 3, schedule: '08:00 AM - 09:30 AM', days: 'TTH', room: '501' },
            { code: 'EN101', description: 'Introduction to Linguistics', units: 3, schedule: '10:00 AM - 11:30 AM', days: 'TTH', room: '502' },
            { code: 'PE101', description: 'Physical Education 1', units: 2, schedule: '01:00 PM - 02:30 PM', days: 'MW', room: 'GYM' },
        ],
        'BS-ARCH': [
            { code: 'AR101', description: 'Architectural Design 1', units: 5, schedule: '08:00 AM - 12:00 PM', days: 'MWF', room: 'D-LAB1' },
            { code: 'AR102', description: 'History of Architecture 1', units: 3, schedule: '01:00 PM - 02:30 PM', days: 'TTH', room: 'D-LAB2' },
            { code: 'PE101', description: 'Physical Education 1', units: 2, schedule: '02:30 PM - 04:00 PM', days: 'TTH', room: 'GYM' },
        ]
    };

    // Return subjects for the course or an empty array if not found
    return courseSubjects[course] || [];
};



export const dummySubjects = [
    { code: 'IT223', description: 'Information Management', units: 3, schedule: '08:00 AM - 10:30 AM', days: 'MTWTH', room: '314', prereq: 'IT222' },
    { code: 'FILI1', description: 'The Philippine Society in the IT Era', units: 3, schedule: '10:30 AM - 12:00 PM', days: 'TF', room: '210', prereq: null },
    { code: 'IT324', description: 'Social Issues and Professional Practices', units: 3, schedule: '01:00 PM - 02:30 PM', days: 'MW', room: '401', prereq: 'IT223' },
    { code: 'IT325', description: 'Quantitative Methods', units: 3, schedule: '02:30 PM - 04:00 PM', days: 'TF', room: '401', prereq: 'MATH101' },
];

// FIX: Added dummy data generator for subject schedules
export const createDummySubjectSchedules = () => {
  const subjects = [
    { code: 'BC100', description: 'Basic Computing' },
    { code: 'BL', description: 'Business Law' },
    { code: 'CE400', description: 'Civil Engineering Fundamentals' },
    { code: 'EE400', description: 'Electrical Engineering Fundamentals' },
    { code: 'FBS101', description: 'Food & Beverage Service' },
    { code: 'FILIT', description: 'Filipino sa Iba\'t Ibang Disiplina' },
    { code: 'IT223', description: 'Information Management' },
    { code: 'ENG101', description: 'English Composition' },
    { code: 'MATH201', description: 'Advanced Mathematics' },
    { code: 'PHY101', description: 'General Physics' }
  ];

  const days = ['MTWTHF', 'TTH', 'MWF', 'T', 'F'];
  const times = ['10:00AM - 12:00PM', '01:00PM - 03:00PM', '03:00PM - 05:00PM', '09:00AM - 12:00PM', '12:30PM - 02:30PM', '11:30AM - 02:30PM'];
  const rooms = ['308', '307', '312', '309', '314', '401', '402'];
  const teachers = ["Mr. Smith", "Ms. Jones", "Mr. Reyes", "Ms. Garcia", "Mr. Tan"];

  return subjects.map((subject, index) => ({
    id: index + 1,
    subject: subject.code,
    description: subject.description,
    days: days[index % days.length],
    time: times[index % times.length],
    room: rooms[index % rooms.length],
    teacher: teachers[index % teachers.length],
    // --- START: MODIFIED CODE ---
    // Assign a course to each schedule to enable filtering
    course: courses[index % courses.length],
    // --- END: MODIFIED CODE ---
    enrolledStudents: [], // This will be populated by the linking function
  }));
};

// --- START: NEW FUNCTIONAL LOGIC ---

// Helper function to generate a master list of students
const generateMasterStudentList = (count) => {
    const students = [];
    const firstNames = ["Juan", "Maria", "Jose", "Anna", "Luis", "Sofia", "Carlos", "Isabella", "Miguel", "Camila", "John", "Jane", "Peter", "Mary", "James", "Patricia"];
    const lastNames = ["Dela Cruz", "Garcia", "Reyes", "Santos", "Ramos", "Mendoza", "Gonzales", "Flores", "Villanueva", "Lim", "Tan", "Lee", "Kim", "Park"];
    const courses = ["BSIT", "BSCS", "BSBA-MKTG", "BSBA-HRDM", "BSED-EN", "BS-ARCH", "BSHM"];
    const yearLevels = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

    for (let i = 0; i < count; i++) {
        const studentId = `2022-00${100 + i}`;
        students.push({
            id: studentId,
            name: `${lastNames[i % lastNames.length]}, ${firstNames[i % firstNames.length]}`,
            gender: i % 2 === 0 ? 'Male' : 'Female',
            course: courses[i % courses.length],
            year: yearLevels[i % yearLevels.length],
            enrollmentDate: new Date(2025, 4, 27 - i).toLocaleDateString()
        });
    }
    return students;
}

// Caching the generated data so it's consistent across the app
let functionalSchedules = null;

// The main function to be called from the components
export const getFunctionalSchedules = () => {
    // If we've already generated the data, return the cached version
    if (functionalSchedules) {
        return functionalSchedules;
    }

    // 1. Create the base schedules (without students)
    const schedules = createDummySubjectSchedules();

    // 2. Create a master list of all students
    const masterStudentList = generateMasterStudentList(150);

    // 3. Enroll students into schedules
    masterStudentList.forEach(student => {
        const subjectsToEnrollCount = Math.floor(Math.random() * 4) + 2; // Enroll each student in 2-5 subjects
        for (let i = 0; i < subjectsToEnrollCount; i++) {
            const scheduleIndex = Math.floor(Math.random() * schedules.length);
            const selectedSchedule = schedules[scheduleIndex];

            // Add student to the schedule if not already enrolled
            if (!selectedSchedule.enrolledStudents.some(s => s.id === student.id)) {
                selectedSchedule.enrolledStudents.push(student);
            }
        }
    });

    // 4. Cache and return the fully populated schedules
    functionalSchedules = schedules;
    return functionalSchedules;
};

// --- END: NEW FUNCTIONAL LOGIC ---


// FIX: Added function to generate dummy data for school years and semesters
export const createDummySchoolYears = () => {
    return [
        { id: 1, schoolYear: '2024 - 2025', semester: 'Summer', status: 'Current' },
        { id: 2, schoolYear: '2024 - 2025', semester: '2nd Semester', status: 'Open' },
        { id: 3, schoolYear: '2024 - 2025', semester: '1st Semester', status: 'Open' },
        { id: 4, schoolYear: '2023 - 2024', semester: 'Summer', status: 'Closed' },
        { id: 5, schoolYear: '2023 - 2024', semester: '2nd Semester', status: 'Closed' },
        { id: 6, schoolYear: '2023 - 2024', semester: '1st Semester', status: 'Closed' },
        { id: 7, schoolYear: '2022 - 2023', semester: 'Summer', status: 'Closed' },
        { id: 8, schoolYear: '2022 - 2023', semester: '2nd Semester', status: 'Closed' },
    ];
};


// FIX: Added function to generate dummy data for the grading view
export const createDummyGradingData = () => {
    return [
        {
            id: 1,
            name: 'Amoguis, Allan M.',
            subjects: [
                { id: 101, name: 'IM212 (Information Management)', schedule: 'F 08:30 AM - 11:30 AM', students: [
                    { id: '2022-00146', name: 'Cobarde, Trixcy Shian M.', grades: { prelims: '', midterms: '', finalMidterm: '', finals: '', final: '' } },
                    { id: '2022-00068', name: 'Maratas, Yvon B.', grades: { prelims: '', midterms: '', finalMidterm: '', finals: '', final: '' } },
                ]},
                { id: 102, name: 'CS311 (Advanced Programming)', schedule: 'M 01:00 PM - 04:00 PM', students: [
                    { id: '2022-00111', name: 'Reyes, Jose P.', grades: { prelims: '', midterms: '', finalMidterm: '', finals: '', final: '' } },
                ]},
                { id: 103, name: 'GE101 (Understanding the Self)', schedule: 'W 10:00 AM - 12:00 PM', students: [
                     { id: '2022-00146', name: 'Cobarde, Trixcy Shian M.', grades: { prelims: '', midterms: '', finalMidterm: '', finals: '', final: '' } },
                     { id: '2022-00068', name: 'Maratas, Yvon B.', grades: { prelims: '', midterms: '', finalMidterm: '', finals: '', final: '' } },
                     { id: '2022-00111', name: 'Reyes, Jose P.', grades: { prelims: '', midterms: '', finalMidterm: '', finals: '', final: '' } },
                ]},
            ]
        },
        {
            id: 2,
            name: 'Garcia, Maria C.',
            subjects: [
                { id: 201, name: 'ENG202 (Technical Writing)', schedule: 'TTH 09:00 AM - 10:30 AM', students: [
                    { id: '2021-00305', name: 'Mendoza, Sofia L.', grades: { prelims: '', midterms: '', finalMidterm: '', finals: '', final: '' } },
                    { id: '2021-00412', name: 'Lim, Carlos F.', grades: { prelims: '', midterms: '', finalMidterm: '', finals: '', final: '' } },
                ]}
            ]
        }
    ];
};



// FIX: Added function to generate a list of all possible subjects for encoding
export const getLegacySubjects = () => {
    return [
        { id: 1, code: 'ACCED221', description: 'IT Application Tools in Business' },
        { id: 2, code: 'ACCED222', description: 'Auditing & Assurance Principles' },
        { id: 3, code: 'ACCED223', description: 'Management Science' },
        { id: 4, code: 'ACCED224', description: 'Intermediate Accounting 1' },
        { id: 5, code: 'IT101', description: 'Introduction to Computing' },
        { id: 6, code: 'ENG101', description: 'Purposive Communication' },
        { id: 7, code: 'MATH101', description: 'Mathematics in the Modern World' },
        { id: 8, code: 'FIL101', description: 'Kontekstwalisadong Komunikasyon' },
    ];
};

// FIX: Added function to generate a list of legacy students to search from
export const getLegacyStudents = () => {
    return [
        { id: '2010-00123', name: 'Rizal, Jose P.', gender: 'Male', course: 'BSIT' },
        { id: '2011-00456', name: 'Bonifacio, Andres C.', gender: 'Male', course: 'BSCS' },
        { id: '2012-00789', name: 'Silang, Gabriela M.', gender: 'Female', course: 'BSBA-MKTG' },
    ];
};

// ... (keep your other existing dummy data functions)

export const getDummyCurriculum = (courseName) => {
  if (courseName !== 'Bachelor of Science in Information Technology') {
    return { courseName: courseName, years: [] }; // Return empty for other courses
  }

  return {
    courseName: 'Bachelor of Science in Information Technology',
    years: [
      {
        year: 'FIRST YEAR',
        semesters: [
          {
            name: 'FIRST SEMESTER',
            subjects: [
              { code: 'IT 111', title: 'Introduction to Computing', lec: 2, lab: 1, total: 3, prereq: '' },
              { code: 'IT 112', title: 'PC Assembly & Troubleshooting', lec: 2, lab: 1, total: 3, prereq: '' },
              { code: 'GE 1', title: 'Understanding the Self', lec: 3, lab: 0, total: 3, prereq: '' },
              { code: 'PATHFit 1', title: 'Movement Competency Training', lec: 2, lab: 0, total: 2, prereq: '' },
              { code: 'NSTP 1', title: 'National Service Training Prog. 1', lec: 3, lab: 0, total: 3, prereq: '' },
              { code: 'Math 1', title: 'Math in the Modern World', lec: 3, lab: 0, total: 3, prereq: '' },
              { code: 'Fil 1', title: 'Wika at Filipino', lec: 3, lab: 0, total: 3, prereq: '' },
            ],
            totalUnits: { lec: 20, lab: 3, total: 23 }
          },
          {
            name: 'SECOND SEMESTER',
            subjects: [
              { code: 'IT 121', title: 'Computer Programming 1', lec: 2, lab: 1, total: 3, prereq: 'IT 111' },
              { code: 'GE 5', title: 'Purposive Communication', lec: 3, lab: 0, total: 3, prereq: '' },
              { code: 'Fil 2', title: 'Panitikan ng Pilipinas', lec: 3, lab: 0, total: 3, prereq: '' },
              { code: 'PATHFit 2', title: 'Exercise-based Fitness Activities', lec: 2, lab: 0, total: 2, prereq: '' },
              { code: 'NSTP 2', title: 'National Service Training Prog. 2', lec: 3, lab: 0, total: 3, prereq: 'NSTP 1' },
              { code: 'STS', title: 'Science, Technology & Society', lec: 3, lab: 0, total: 3, prereq: '' },
              { code: 'IT 122', title: 'Discrete Mathematics', lec: 3, lab: 0, total: 3, prereq: '' },
            ],
            totalUnits: { lec: 25, lab: 1, total: 26 }
          },
          {
            name: 'SUMMER',
            subjects: [
                { code: 'IT 131', title: 'Information Management', lec: 2, lab: 1, total: 3, prereq: 'IT 121' },
                { code: 'IT 132', title: 'Platform Technologies (Tangible)', lec: 2, lab: 1, total: 3, prereq: 'IT 112, IT 121' },
            ],
            totalUnits: { lec: 8, lab: 1, total: 9 }
          }
        ]
      },
      {
        year: 'SECOND YEAR',
        semesters: [
          {
            name: 'FIRST SEMESTER',
            subjects: [
              { code: 'IT 211', title: 'Data Structures & Algorithms', lec: 2, lab: 1, total: 3, prereq: 'IT 131' },
              { code: 'IT 212', title: 'Web Systems & Technologies 1', lec: 2, lab: 1, total: 3, prereq: 'IT 111' },
              { code: 'IT 213', title: 'Intro. to Human Computer Interaction', lec: 2, lab: 1, total: 3, prereq: 'IT 111' },
              { code: 'Art App', title: 'Art Appreciation', lec: 3, lab: 0, total: 3, prereq: '' },
              { code: 'GE 3', title: 'The Contemporary World', lec: 3, lab: 0, total: 3, prereq: '' },
              { code: 'PATHFit 3', title: 'Sports', lec: 2, lab: 0, total: 2, prereq: 'PATHFit 2' },
              { code: 'STAT', title: 'Statistics', lec: 3, lab: 0, total: 3, prereq: '' },
            ],
            totalUnits: { lec: 19, lab: 4, total: 23 }
          },
          {
            name: 'SECOND SEMESTER',
            subjects: [
              { code: 'IT 221', title: 'Object Oriented Programming', lec: 2, lab: 1, total: 3, prereq: 'IT 121' },
              { code: 'IT 222', title: 'Networking 1', lec: 2, lab: 1, total: 3, prereq: 'IT 211' },
              { code: 'IT 223', title: 'Systems Analysis & Design', lec: 2, lab: 1, total: 3, prereq: 'IT 121 / IT 131' },
              { code: 'IT 224', title: 'Human Computer Interaction 2', lec: 2, lab: 1, total: 3, prereq: 'IT 213' },
              { code: 'Data Mgt', title: 'Fundamentals of Database Systems', lec: 2, lab: 1, total: 3, prereq: 'IT 210' },
              { code: 'PATHFit 4', title: 'Dance', lec: 2, lab: 0, total: 2, prereq: 'PATHFit 3' },
              { code: 'Rizal', title: 'Rizal\'s Life & Works', lec: 3, lab: 0, total: 3, prereq: '' },
            ],
            totalUnits: { lec: 15, lab: 5, total: 20 }
          },
        ]
      },
      {
        year: 'THIRD YEAR',
        semesters: [
          {
            name: 'FIRST SEMESTER',
            subjects: [
              { code: 'IT 311', title: 'Applications Devt. & Emerging Technologies', lec: 2, lab: 1, total: 3, prereq: 'IT 130' },
              { code: 'IT 312', title: 'Networking 2', lec: 2, lab: 1, total: 3, prereq: 'IT 222' },
              { code: 'IT 313', title: 'Integrative Prog. & Tech. 1', lec: 2, lab: 1, total: 3, prereq: 'IT 211 / IT 220' },
              { code: 'IT 314', title: 'Web Systems & Technologies 2', lec: 2, lab: 1, total: 3, prereq: 'IT 212' },
              { code: 'IT 315', title: 'Advance Database Systems', lec: 2, lab: 1, total: 3, prereq: 'IT 224' },
            ],
            totalUnits: { lec: 10, lab: 5, total: 15 }
          },
          {
            name: 'SECOND SEMESTER',
            subjects: [
              { code: 'IT 321', title: 'Information Assurance & Security 1', lec: 2, lab: 1, total: 3, prereq: 'IT 312' },
              { code: 'IT 322', title: 'Integrative Prog. & Tech. 2', lec: 2, lab: 1, total: 3, prereq: 'IT 312 / IT 200' },
              { code: 'IT 323', title: 'Mobile Programming', lec: 2, lab: 1, total: 3, prereq: 'IT 212' },
              { code: 'IT 324', title: 'Event Driven Programming', lec: 2, lab: 1, total: 3, prereq: 'IT 210' },
            ],
            totalUnits: { lec: 10, lab: 5, total: 15 }
          },
           {
            name: 'SUMMER',
            subjects: [
                { code: 'Capstone 1', title: 'Capstone Project 1', lec: 2, lab: 1, total: 3, prereq: 'Going 4th Year' },
                { code: 'Info Assure 2', title: 'Information Assurance & Security 2', lec: 2, lab: 0, total: 2, prereq: 'IT 321' },
            ],
            totalUnits: { lec: 5, lab: 0, total: 5 }
          }
        ]
      },
      {
        year: 'FOURTH YEAR',
        semesters: [
          {
            name: 'FIRST SEMESTER',
            subjects: [
              { code: 'IT 411', title: 'System Administration & Maint.', lec: 2, lab: 1, total: 3, prereq: 'IT 330' },
              { code: 'IT 412', title: 'Social Issues & Professional Practice', lec: 3, lab: 0, total: 3, prereq: '4th Year Standing' },
              { code: 'Capstone 2', title: 'Capstone Project 2', lec: 1, lab: 2, total: 3, prereq: 'Cap 1' },
            ],
            totalUnits: { lec: 6, lab: 4, total: 12 }
          },
          {
            name: 'SECOND SEMESTER',
            subjects: [
              { code: 'IT 421', title: 'Seminars & Tours', lec: 1, lab: 0, total: 1, prereq: '4th Year' },
              { code: 'OJT', title: 'Practicum (600 Hours On-the-Job Training in related field)', lec: 0, lab: 6, total: 6, prereq: '4th Year Standing' },
            ],
            totalUnits: { lec: 3, lab: 6, total: 8 }
          },
        ]
      }
    ]
  };
};