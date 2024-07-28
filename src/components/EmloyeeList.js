// import React, { useState, useEffect } from 'react';
// import axios from '../config/axios';
// import { Link } from 'react-router-dom';

// export default function EmployeeList() {
//     const [employees, setEmployees] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchEmployees = async () => {
//             try {
//                 const response = await axios.get('/employees', {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`
//                     }
//                 });
//                 console.log(response.data); // Debug data
//                 setEmployees(response.data);
//             } catch (err) {
//                 setError('Failed to fetch employees');
//             }
//         };

//         fetchEmployees();
//     }, []);

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`/employee/remove/${id}`, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`
//                 }
//             });
//             setEmployees(employees.filter(employee => employee._id !== id));
//         } catch (err) {
//             setError('Failed to delete employee');
//         }
//     };

//     return (
//         <div>
//             <h2>Employee List</h2>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                 <thead>
//                     <tr>
//                         <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
//                         <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
//                         <th style={{ border: '1px solid black', padding: '8px' }}>Mobile No</th>
//                         <th style={{ border: '1px solid black', padding: '8px' }}>Designation</th>
//                         <th style={{ border: '1px solid black', padding: '8px' }}>Gender</th>
//                         <th style={{ border: '1px solid black', padding: '8px' }}>Courses</th>
//                         <th style={{ border: '1px solid black', padding: '8px' }}>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {employees.map(employee => (
//                         <tr key={employee._id}>
//                             <td style={{ border: '1px solid black', padding: '8px' }}>{employee.name}</td>
//                             <td style={{ border: '1px solid black', padding: '8px' }}>{employee.email}</td>
//                             <td style={{ border: '1px solid black', padding: '8px' }}>{employee.mobileNo || 'N/A'}</td>
//                             <td style={{ border: '1px solid black', padding: '8px' }}>{employee.designation}</td>
//                             <td style={{ border: '1px solid black', padding: '8px' }}>{employee.gender}</td>
//                             <td style={{ border: '1px solid black', padding: '8px' }}>{employee.course.join(', ')}</td>
//                             <td style={{ border: '1px solid black', padding: '8px' }}>
//                                 <Link to={`/employees/edit/${employee._id}`}>Edit</Link>
//                                 <button onClick={() => handleDelete(employee._id)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }



import React, { useState, useEffect } from 'react';
import axios from '../config/axios';
import { Link } from 'react-router-dom';

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('/employees', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(response.data); 
                setEmployees(response.data);
                setFilteredEmployees(response.data);
            } catch (err) {
                setError('Failed to fetch employees');
            }
        };

        fetchEmployees();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            setFilteredEmployees(
                employees.filter(employee =>
                    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        } else {
            setFilteredEmployees(employees);
        }
    }, [searchQuery, employees]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/employee/remove/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setEmployees(employees.filter(employee => employee._id !== id));
            setFilteredEmployees(filteredEmployees.filter(employee => employee._id !== id));
        } catch (err) {
            setError('Failed to delete employee');
        }
    };

    return (
        <div>
            <h2>Employee List</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ padding: '8px', width: '200px' }}
                />
            </div>

            
            <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                <strong>Total Employees: {filteredEmployees.length}</strong>
            </div>

           
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Mobile No</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Designation</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Gender</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Courses</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map(employee => (
                        <tr key={employee._id}>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{employee.name}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{employee.email}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{employee.mobileNo || 'N/A'}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{employee.designation}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{employee.gender}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{employee.course.join(', ')}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>
                                <Link to={`/employees/edit/${employee._id}`} style={{ marginRight: '10px' }}>Edit</Link>
                                <button onClick={() => handleDelete(employee._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

