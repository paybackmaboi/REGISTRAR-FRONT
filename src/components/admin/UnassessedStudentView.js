import React, {  } from 'react';
import { useNavigate } from 'react-router-dom';

function UnAssessedStudentView ({assessment, onAssessedStudent}) {

     const navigate = useNavigate();
         const unassessedStudents = assessment.filter(reg => reg.status === 'Registered');
         const userRole = localStorage.getItem('userRole');
         const isAdmin = userRole === 'admin';
         const isAccounting = userRole === 'accounting';

         const handleAssessClick = (student) => {
      if (userRole !== 'admin' && userRole !== 'accounting') {
            return;
        }
       onAssessedStudent(student);
       navigate('/admin/assessment/view-assessment');
     };
     
         return (
             <div className="container-fluid"><h2 className="mb-4">Unassessed Students</h2><div className="card shadow-sm"><div className="card-header bg-white"><h4 className="card-title mb-0">Unassessed Students List</h4></div><div className="card-body">
                 <div className="row mb-3"><div className="col-md-6"><div className="input-group"><input type="text" className="form-control" placeholder="Search..."/><button className="btn btn-outline-secondary" type="button"><i className="fas fa-search"></i></button></div></div><div className="col-md-3 ms-auto"><select className="form-select" disabled ={!isAdmin}><option>2024-2025 Summer</option></select></div></div>
                 <div className="table-responsive" style={{ maxHeight: 'calc(100vh - 320px)', overflowY: 'auto' }}>
                     <table className="table table-hover">
                         <thead className="table-light sticky-top"><tr><th>ID No.</th><th>Name</th><th>Gender</th><th>Course</th><th>Enrollment Date</th>{isAccounting && <th>Actions</th>}</tr></thead>
                         <tbody>{unassessedStudents.length > 0 ? unassessedStudents.map(reg => (<tr key={reg.id}>
                                        {/* ✨ FIX: Use 'idNo' and 'createdAt' for consistency */}
                                        <td>{reg.idNo}</td>
                                        <td>{reg.name}</td>
                                        <td>{reg.gender}</td>
                                        <td>{reg.course}</td>
                                        <td>{reg.createdAt ? reg.createdAt.split('T')[0] : 'N/A'}</td>
                                        {isAccounting && (
                                            <td>
                                                <button className="btn btn-sm btn-success" onClick={() => handleAssessClick(reg)} title="Assess Student">
                                                    <i className="fas fa-check"></i>
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                )) : ( <tr><td colSpan={isAccounting ? 6 : 5} className="text-center text-muted">No students to assess found.</td></tr>)}</tbody>
                     </table>
                 </div>
             </div></div></div>
         );
}

export default UnAssessedStudentView;