import React, { useState, useEffect } from 'react';
import axios from '../config/axios';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"

export default function EmployeeCreate() {
    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem('employeeFormData');
        return savedData ? JSON.parse(savedData) : {
            name: '',
            email: '',
            mobileNo: '',
            designation: '',
            gender: '',
            course: [], // Ensure course is initialized as an array
        };
    });
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('employeeFormData', JSON.stringify(formData));
    }, [formData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData((prev) => {
                const updatedCourses = prev.course || []; // Ensure prev.course is an array
                if (checked) {
                    updatedCourses.push(value);
                } else {
                    const index = updatedCourses.indexOf(value);
                    if (index > -1) {
                        updatedCourses.splice(index, 1);
                    }
                }
                return { ...prev, course: updatedCourses };
            });
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('mobileNo', formData.mobileNo);
    formDataToSend.append('designation', formData.designation);
    formDataToSend.append('gender', formData.gender);

    // Append course data as a comma-separated string
    formDataToSend.append('course', formData.course.join(','));

    if (image) {
        formDataToSend.append('image', image);
    }

    console.log('Submitting Data:', formDataToSend);

    try {
        const response = await axios.post('/employee/create', formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(response.data);
        toast.success('successfully created')

        setSuccess('Employee created successfully!');
        setError(null);
        navigate('/employeeList');
    } catch (err) {
        console.error(err.response ? err.response.data : err.message);
        setError('Failed to create employee.');
        setSuccess(null);
    }
};

    

    return (
        <div>
            <h2>Create Employee</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Mobile No:
                    <input
                        type="text"
                        name="mobileNo"
                        value={formData.mobileNo}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Designation:
                    <select
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Designation</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                        {/* Add other options as needed */}
                    </select>
                </label>
                <br />
                <label>
                    Gender:
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={formData.gender === 'Male'}
                                onChange={handleChange}
                                required
                            />
                            Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={formData.gender === 'Female'}
                                onChange={handleChange}
                                required
                            />
                            Female
                        </label>
                    </div>
                </label>
                <br />
                <label>
                    Courses:
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="course"
                                value="MCA"
                                checked={formData.course?.includes('MCA') || false} // Safe access
                                onChange={handleChange}
                            />
                            MCA
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="course"
                                value="BCA"
                                checked={formData.course?.includes('BCA') || false} // Safe access
                                onChange={handleChange}
                            />
                            BCA
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="course"
                                value="BSC"
                                checked={formData.course?.includes('BSC') || false} // Safe access
                                onChange={handleChange}
                            />
                            BSC
                        </label>
                    </div>
                </label>
                <br />
                <label>
                    Image:
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                    />
                </label>
                <br />
                <button type="submit">Create Employee</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
}
