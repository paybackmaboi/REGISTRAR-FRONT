import React from 'react';
import { useParams } from 'react-router-dom';
// MODIFIED: Import the new functional data generator
import { getFunctionalSchedules } from '../../data/dummyData';

function SubjectScheduleDetailView() {
    const { id } = useParams();
    // MODIFIED: Use the new function to get schedules with students already linked
    const schedules = getFunctionalSchedules();
    const schedule = schedules.find(s => s.id === parseInt(id));

    if (!schedule) {
        return <div className="detail-view-wrapper"><h2>Schedule not found.</h2></div>;
    }

    // MODIFIED: Get the enrolled students directly from the schedule object
    const enrolledStudents = schedule.enrolledStudents;

    return (
        <div className="detail-view-wrapper">
            
            <p>Schedule Details</p>
            <div className="sticky-header">
                {/* Schedule Info Section */}
                <div className="info-section">
                    <div className="info-column">
                        <p><strong>Subject:</strong> {schedule.subject}</p>
                        <p><strong>Description:</strong> {schedule.description}</p>
                        <p><strong>Schedule:</strong> {schedule.days} {schedule.time}</p>
                    </div>
                    <div className="info-column">
                        <p><strong>Teacher:</strong> {schedule.teacher}</p>
                        {/* MODIFIED: Display the actual number of enrolled students */}
                        <p><strong>Total Students:</strong> {enrolledStudents.length}</p>
                        <p><strong>Room:</strong> {schedule.room}</p>
                    </div>
                </div>

                {/* Controls Section */}
                <div className="controls-section">
                    <select className="custom-select">
                        <option>Student List</option>
                    </select>
                    <select className="custom-select">
                        <option>Enrolled and Assessed</option>
                        <option>Enrolled Only</option>
                    </select>
                    <div className="button-group">
                        <button className="action-button">Export</button>
                        <button className="action-button">Print</button>
                    </div>
                </div>
            </div>


            {/* Students Table Section (This part will now scroll under the sticky header) */}
            <div className="table-container">
                <table className="students-table">
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Course</th>
                            <th>Year Level</th>
                            <th>Enrollment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrolledStudents.length > 0 ? enrolledStudents.map((student, index) => (
                            <tr key={index}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.gender}</td>
                                <td>{student.course}</td>
                                <td>{student.year}</td>
                                <td>{student.enrollmentDate}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center' }}>
                                    No students enrolled in this schedule.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SubjectScheduleDetailView;