import React, { useState, useEffect } from 'react';
import axios from '../config/axios'; // Adjust the import path as needed
import { useNavigate, useParams } from 'react-router-dom';
import {toast} from "react-toastify"

export default function EmployeeEdit() {
    const [employee, setEmployee] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNo: '',
        designation: '',
        gender: '',
        course: [], // Initialize as an empty array
    });
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams(); // Employee ID from the URL

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`/employee/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setEmployee(response.data);
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                    mobileNo: response.data.mobileNo,
                    designation: response.data.designation,
                    gender: response.data.gender,
                    course: response.data.course,
                });
            } catch (err) {
                setError('Failed to fetch employee details');
            }
        };

        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData((prev) => {
                const updatedCourses = prev.course || [];
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
        formDataToSend.append('course', formData.course.join(','));
    
        if (image) {
            formDataToSend.append('image', image);
        }
    
        try {
            const response = await axios.put(`/employee/update/${id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            toast.success("successfully updated")
            setSuccess('Employee updated successfully!');
            setError(null);
            navigate('/employeeList');
        } catch (err) {
            setError('Failed to update employee.');
            setSuccess(null);
        }
    };

    return (
        <div>
            <h2>Edit Employee</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {employee && (
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
                                    checked={formData.course?.includes('MCA') || false}
                                    onChange={handleChange}
                                />
                                MCA
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="course"
                                    value="BCA"
                                    checked={formData.course?.includes('BCA') || false}
                                    onChange={handleChange}
                                />
                                BCA
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="course"
                                    value="BSC"
                                    checked={formData.course?.includes('BSC') || false}
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
                    <button type="submit">Update Employee</button>
                </form>
            )}
        </div>
    );
}
