import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, getToken } from '../../utils/api';
import './StudentRegistrationForm.css';

function StudentRegistrationForm({ onComplete }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [courses, setCourses] = useState([]);
    
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [subjectsLoading, setSubjectsLoading] = useState(false);
    const [schoolYears, setSchoolYears] = useState([]);
    const [semesters, setSemesters] = useState([]);
    
    const [formData, setFormData] = useState({
        // I. PERSONAL DATA
        firstName: '',
        lastName: '',
        middleName: '',
        
        gender: '',
        maritalStatus: '',
        dateOfBirth: '',
        placeOfBirth: '',
        email: '',
        contactNumber: '',
        religion: '',
        citizenship: 'Filipino',
        country: 'Philippines',
        acrNumber: '',
        cityAddress: '',
        cityTelNumber: '',
        provincialAddress: '',
        provincialTelNumber: '',
        
        // II. FAMILY BACKGROUND
        // Father's Information
        fatherName: '',
        fatherAddress: '',
        fatherOccupation: '',
        fatherCompany: '',
        fatherContactNumber: '',
        fatherIncome: '',
        
        // Mother's Information
        motherName: '',
        motherAddress: '',
        motherOccupation: '',
        motherCompany: '',
        motherContactNumber: '',
        motherIncome: '',
        
        // Guardian's Information
        guardianName: '',
        guardianAddress: '',
        guardianOccupation: '',
        guardianCompany: '',
        guardianContactNumber: '',
        guardianIncome: '',
        
        // III. CURRENT ACADEMIC BACKGROUND
        courseId: '',
        registrationSchoolYearId: '',
        registrationSemesterId: '', 
        major: '',
        studentType: 'New',
        yearOfEntry: new Date().getFullYear(),
        estimatedYearOfGraduation: '',
        applicationType: 'Freshmen',
        
        // IV. ACADEMIC HISTORY
        // Elementary
        elementarySchool: '',
        elementaryAddress: '',
        elementaryHonor: '',
        elementaryYearGraduated: '',
        
        // Junior High School
        juniorHighSchool: '',
        juniorHighAddress: '',
        juniorHighHonor: '',
        juniorHighYearGraduated: '',
        
        // Senior High School
        seniorHighSchool: '',
        seniorHighAddress: '',
        seniorHighStrand: '',
        seniorHighHonor: '',
        seniorHighYearGraduated: '',
        
        // Additional Academic Information
        ncaeGrade: '',
        specialization: '',
        lastCollegeAttended: '',
        lastCollegeYearTaken: '',
        lastCollegeCourse: '',
        lastCollegeMajor: '',
        password: '',
        confirmPassword: '',
    });
    

    useEffect(() => {
    // This function will fetch all the data needed when the form first loads.
    const fetchInitialData = async () => {
        try {
            // Fetch Courses
            const coursesResponse = await fetch(`${API_BASE_URL}/courses`);
            if (coursesResponse.ok) {
                setCourses(await coursesResponse.json());
            } else {
                console.error('Failed to fetch courses:', coursesResponse.statusText);
                setError('Failed to load initial form data. Please try again.');
            }

            // Fetch School Years
            const schoolYearsResponse = await fetch(`${API_BASE_URL}/school-years`);
            if (schoolYearsResponse.ok) {
                setSchoolYears(await schoolYearsResponse.json());
            } else {
                console.error('Failed to fetch school years');
                // Don't set a general error, as courses might have loaded successfully
            }

            const semestersResponse = await fetch(`${API_BASE_URL}/semesters`);
                if (semestersResponse.ok) {
                    setSemesters(await semestersResponse.json());
                } else {
                    console.error('Failed to fetch semesters');
                }
        } catch (err) {
            console.error('Error fetching initial data:', err);
            setError('A network error occurred while loading form data. Please try again.');
        }
    };

    fetchInitialData();
}, []);
    useEffect(() => {
        const fetchSubjects = async () => {
            // It now uses formData.registrationSemesterId for the semester value.
            if (formData.courseId && selectedYear && formData.registrationSemesterId) {
                setSubjectsLoading(true);
                try {
                    const response = await fetch(`${API_BASE_URL}/subjects/filter?courseId=${formData.courseId}&yearLevel=${selectedYear}&semester=${formData.registrationSemesterId}`);
                    if (response.ok) {
                        setSubjects(await response.json());
                    } else {
                        console.error('Failed to fetch subjects');
                        setSubjects([]);
                    }
                } catch (error) {
                    console.error('Error fetching subjects:', error);
                    setSubjects([]);
                } finally {
                    setSubjectsLoading(false);
                }
            } else {
                setSubjects([]);
            }
        };

        fetchSubjects();
    // The dependency array is updated to watch the correct state.
    }, [formData.courseId, selectedYear, formData.registrationSemesterId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_BASE_URL}/students/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, yearLevel: selectedYear })
            });

            if (response.ok) {
                const result = await response.json();
                alert('Student registration completed successfully!');
                if (onComplete) onComplete(result);
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Registration failed');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const renderStep1 = () => (
        <div className="registration-step">
            <h3>I. PERSONAL DATA</h3>
            <div className="form-row">
                <div className="form-group">
                    <label>First Name *</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Middle Name</label>
                    <input type="text" name="middleName" value={formData.middleName} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Last Name *</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Gender *</label>
                    <select name="gender" value={formData.gender} onChange={handleInputChange} required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Marital Status *</label>
                    <select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} required>
                        <option value="">Select Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Divorced">Divorced</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Birth Date *</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Place of Birth *</label>
                    <input
                        type="text"
                        name="placeOfBirth"
                        value={formData.placeOfBirth}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>E-mail/Gmail Address *</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Contact Number *</label>
                    <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Religion *</label>
                    <input
                        type="text"
                        name="religion"
                        value={formData.religion}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Citizenship *</label>
                    <input
                        type="text"
                        name="citizenship"
                        value={formData.citizenship}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Country *</label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>

            <div className="form-group">
                <label>ACR Number (for foreign students)</label>
                <input
                    type="text"
                    name="acrNumber"
                    value={formData.acrNumber}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-group">
                <label>City Address *</label>
                <textarea
                    name="cityAddress"
                    value={formData.cityAddress}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>City Tel Number</label>
                    <input
                        type="tel"
                        name="cityTelNumber"
                        value={formData.cityTelNumber}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Provincial Address *</label>
                    <textarea
                        name="provincialAddress"
                        value={formData.provincialAddress}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>

            <div className="form-group">
                <label>Provincial Tel Number</label>
                <input
                    type="tel"
                    name="provincialTelNumber"
                    value={formData.provincialTelNumber}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="registration-step">
            <h3>II. FAMILY BACKGROUND</h3>
            
            <h4>Father's Information</h4>
            <div className="form-row">
                <div className="form-group">
                    <label>Father's Name *</label>
                    <input
                        type="text"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Address *</label>
                    <textarea
                        name="fatherAddress"
                        value={formData.fatherAddress}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Occupation *</label>
                    <input
                        type="text"
                        name="fatherOccupation"
                        value={formData.fatherOccupation}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Name & Address of Company</label>
                    <input
                        type="text"
                        name="fatherCompany"
                        value={formData.fatherCompany}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Tel./Cel. Number *</label>
                    <input
                        type="tel"
                        name="fatherContactNumber"
                        value={formData.fatherContactNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Income</label>
                    <input
                        type="text"
                        name="fatherIncome"
                        value={formData.fatherIncome}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <h4>Mother's Information</h4>
            <div className="form-row">
                <div className="form-group">
                    <label>Mother's Name *</label>
                    <input
                        type="text"
                        name="motherName"
                        value={formData.motherName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Address *</label>
                    <textarea
                        name="motherAddress"
                        value={formData.motherAddress}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Occupation *</label>
                    <input
                        type="text"
                        name="motherOccupation"
                        value={formData.motherOccupation}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Name & Address of Company</label>
                    <input
                        type="text"
                        name="motherCompany"
                        value={formData.motherCompany}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Tel./Cel. Number *</label>
                    <input
                        type="tel"
                        name="motherContactNumber"
                        value={formData.motherContactNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Income</label>
                    <input
                        type="text"
                        name="motherIncome"
                        value={formData.motherIncome}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <h4>Guardian's Information</h4>
            <div className="form-row">
                <div className="form-group">
                    <label>Guardian's Name *</label>
                    <input
                        type="text"
                        name="guardianName"
                        value={formData.guardianName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Address *</label>
                    <textarea
                        name="guardianAddress"
                        value={formData.guardianAddress}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Occupation *</label>
                    <input
                        type="text"
                        name="guardianOccupation"
                        value={formData.guardianOccupation}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Name & Address of Company</label>
                    <input
                        type="text"
                        name="guardianCompany"
                        value={formData.guardianCompany}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Tel./Cel. Number *</label>
                    <input
                        type="tel"
                        name="guardianContactNumber"
                        value={formData.guardianContactNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Income</label>
                    <input
                        type="text"
                        name="guardianIncome"
                        value={formData.guardianIncome}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="registration-step">
            <h3>III. CURRENT ACADEMIC BACKGROUND</h3>
            <div className="form-row">
                <div className="form-group">
                    <label>School Year</label>
                    <select 
                        name="registrationSchoolYearId" 
                        value={formData.registrationSchoolYearId} 
                        onChange={handleInputChange} 
                        required
                    >
                        <option value="">Select School Year</option>
                        {schoolYears.map(sy => (
                            <option key={sy.id} value={sy.id}>
                                S.Y. {sy.year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label>Course (Optional)</label>
                    <select name="courseId" value={formData.courseId} onChange={handleInputChange}>
                        <option value="">Select Course (Optional)</option>
                        {courses.map(course => (
                            <option key={course.id} value={course.id}>
                                {course.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Major in</label>
                    <input
                        type="text"
                        name="major"
                        value={formData.major}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Year Level *</label>
                    <select name="yearLevel" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} required>
                        <option value="">Select Year</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                    </select>
                </div>
                 <div className="form-group">
            <label>Semester/Entry *</label>
            <select
                name="registrationSemesterId"
                value={formData.registrationSemesterId}
                onChange={handleInputChange}
                required
            >
                <option value="">Select Semester</option>
                {semesters.map(sem => (
                    <option key={sem.id} value={sem.id}>{sem.name}</option>
                ))}
            </select>
        </div> 
            </div>

            {/* --- NEW SUBJECTS DISPLAY --- */}
            {subjectsLoading && <p>Loading subjects...</p>}
            {subjects.length > 0 && (
                <div className="subjects-display">
                    <h4>Subjects for Selected Semester</h4>
                    <table className="subjects-table">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Description</th>
                                <th>Units</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.map(subject => (
                                <tr key={subject.id}>
                                    <td>{subject.code}</td>
                                    <td>{subject.name}</td>
                                    <td>{subject.units}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="form-row">
                <div className="form-group">
                    <label>Student Type *</label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="studentType"
                                value="New"
                                checked={formData.studentType === 'New'}
                                onChange={handleInputChange}
                            />
                            New
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="studentType"
                                value="Transferee"
                                checked={formData.studentType === 'Transferee'}
                                onChange={handleInputChange}
                            />
                            Transferee
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="studentType"
                                value="Returnee"
                                checked={formData.studentType === 'Returnee'}
                                onChange={handleInputChange}
                            />
                            Returnee
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="studentType"
                                value="Old"
                                checked={formData.studentType === 'Old'}
                                onChange={handleInputChange}
                            />
                            Old
                        </label>
                    </div>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Year of Entry *</label>
                    <input
                        type="number"
                        name="yearOfEntry"
                        value={formData.yearOfEntry}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Estimated Year of Graduation</label>
                    <input
                        type="number"
                        name="estimatedYearOfGraduation"
                        value={formData.estimatedYearOfGraduation}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="registration-step">
            <h3>IV. ACADEMIC HISTORY</h3>
            
            <h4>Elementary</h4>
            <div className="form-row">
                <div className="form-group">
                    <label>Elementary School *</label>
                    <input
                        type="text"
                        name="elementarySchool"
                        value={formData.elementarySchool}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>School Address *</label>
                    <textarea
                        name="elementaryAddress"
                        value={formData.elementaryAddress}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Honor Received</label>
                    <input
                        type="text"
                        name="elementaryHonor"
                        value={formData.elementaryHonor}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Year of Graduation *</label>
                    <input
                        type="number"
                        name="elementaryYearGraduated"
                        value={formData.elementaryYearGraduated}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>

            <h4>Junior High School (JHS)</h4>
            <div className="form-row">
                <div className="form-group">
                    <label>Secondary School (JHS) *</label>
                    <input
                        type="text"
                        name="juniorHighSchool"
                        value={formData.juniorHighSchool}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>School Address *</label>
                    <textarea
                        name="juniorHighAddress"
                        value={formData.juniorHighAddress}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Honor Received</label>
                    <input
                        type="text"
                        name="juniorHighHonor"
                        value={formData.juniorHighHonor}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Year of Graduation *</label>
                    <input
                        type="number"
                        name="juniorHighYearGraduated"
                        value={formData.juniorHighYearGraduated}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>

            <h4>Senior High School (SHS)</h4>
            <div className="form-row">
                <div className="form-group">
                    <label>Secondary School (SHS) *</label>
                    <input
                        type="text"
                        name="seniorHighSchool"
                        value={formData.seniorHighSchool}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>School Address *</label>
                    <textarea
                        name="seniorHighAddress"
                        value={formData.seniorHighAddress}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Strand</label>
                    <input
                        type="text"
                        name="seniorHighStrand"
                        value={formData.seniorHighStrand}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Honor Received</label>
                    <input
                        type="text"
                        name="seniorHighHonor"
                        value={formData.seniorHighHonor}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Year of Graduation *</label>
                    <input
                        type="number"
                        name="seniorHighYearGraduated"
                        value={formData.seniorHighYearGraduated}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>NCAE Grade</label>
                    <input
                        type="text"
                        name="ncaeGrade"
                        value={formData.ncaeGrade}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Specialization</label>
                    <input
                        type="text"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Last College School Attended</label>
                    <input
                        type="text"
                        name="lastCollegeAttended"
                        value={formData.lastCollegeAttended}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Year Taken</label>
                    <input
                        type="number"
                        name="lastCollegeYearTaken"
                        value={formData.lastCollegeYearTaken}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Course</label>
                    <input
                        type="text"
                        name="lastCollegeCourse"
                        value={formData.lastCollegeCourse}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="form-group">
                <label>Major</label>
                <input
                    type="text"
                    name="lastCollegeMajor"
                    value={formData.lastCollegeMajor}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );

    const renderStep5 = () => (
    <div className="registration-step">
        <h3>V. REGISTER YOUR ACCOUNT FOR REQUEST LOGIN</h3>
        
        {/* THIS IS THE CODE YOU'RE LOOKING FOR */}
        <div className="form-row">
            <div className="form-group">
                <label>Student ID Number *</label>
                <input 
                    type="text" 
                    name="idNumber" 
                    value={formData.idNumber} 
                    onChange={handleInputChange} 
                    placeholder="e.g., S001"
                    required 
                />
            </div>
        </div>
        
        <div className="form-row">
            <div className="form-group">
                <label>Password *</label>
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
                <label>Confirm Password *</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required />
            </div>
        </div>
    </div>
);

    const renderStepContent = () => {
        switch (currentStep) {
            case 1: return renderStep1();
            case 2: return renderStep2();
            case 3: return renderStep3();
            case 4: return renderStep4();
            case 5: return renderStep5();
            default: return renderStep1();
        }
    };

    return (
        <div className="student-registration-form">
            <div className="form-header">
                <h2>STUDENT PERMANENT RECORDS (SPR)</h2>
                <h3>BENEDICTO COLLEGE</h3>
                <div className="step-indicator">
                    Step {currentStep} of 5
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                {renderStepContent()}

                {error && <div className="error-message">{error}</div>}

                <div className="form-navigation">
                    {currentStep > 1 && (
                        <button type="button" onClick={prevStep} className="btn btn-secondary">
                            Previous
                        </button>
                    )}
                    
                    {currentStep < 5 ? (
                        <button type="button" onClick={nextStep} className="btn btn-primary">
                            Next
                        </button>
                    ) : (
                        <button type="submit" disabled={loading} className="btn btn-success">
                            {loading ? 'Submitting...' : 'Submit Registration'}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default StudentRegistrationForm;