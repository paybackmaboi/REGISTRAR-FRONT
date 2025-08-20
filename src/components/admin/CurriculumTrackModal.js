import React from 'react';
import './CurriculumTrackModal.css'; // We will create this CSS file next

function CurriculumTrackModal({ studentName, curriculum, takenSubjects, onClose }) {
    
    const isSubjectTaken = (subjectCode) => {
        // This is for future use, to highlight subjects the student has passed
        return takenSubjects.includes(subjectCode);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content curriculum-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">Curriculum Track</h4>
                    <button type="button" className="btn-close" onClick={onClose}></button>
                </div>
                <div className="modal-body">
                    <div className="curriculum-header">
                        <h5>{studentName}</h5>
                        <p>{curriculum.courseName}</p>
                    </div>

                    <div className="curriculum-grid">
                        {curriculum.years.map((yearData, yearIndex) => (
                            <div key={yearIndex} className="curriculum-year">
                                <h6>{yearData.year}</h6>
                                {yearData.semesters.map((semData, semIndex) => (
                                    <div key={semIndex} className="curriculum-semester">
                                        <strong>{semData.name}</strong>
                                        <table className="table table-sm table-bordered curriculum-table">
                                            <thead>
                                                <tr>
                                                    <th>Code</th>
                                                    <th>Description</th>
                                                    <th>Lec</th>
                                                    <th>Lab</th>
                                                    <th>Total</th>
                                                    <th>Prereq.</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {semData.subjects.map((subject, subIndex) => (
                                                    <tr key={subIndex} className={isSubjectTaken(subject.code) ? 'subject-taken' : ''}>
                                                        <td>{subject.code}</td>
                                                        <td>{subject.title}</td>
                                                        <td>{subject.lec}</td>
                                                        <td>{subject.lab}</td>
                                                        <td>{subject.total}</td>
                                                        <td>{subject.prereq}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colSpan="2" className="text-end"><strong>Total Units</strong></td>
                                                    <td><strong>{semData.totalUnits.lec}</strong></td>
                                                    <td><strong>{semData.totalUnits.lab}</strong></td>
                                                    <td><strong>{semData.totalUnits.total}</strong></td>
                                                    <td></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CurriculumTrackModal;