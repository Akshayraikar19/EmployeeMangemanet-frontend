import axios from "../config/axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {toast} from "react-toastify"

const loginValidationSchema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters").max(64, "Password must not exceed 64 characters"),
});


export default function Login() {
    const { handleLogin } = useAuth();
    const navigate = useNavigate();
    const [serverErrors, setServerErrors] = useState('');

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validateOnChange: false,
        validationSchema: loginValidationSchema,
        onSubmit: async (values) => {
            console.log("Form submitted with values:", values); 
            try {
                const response = await axios.post("/user/login", values);
                console.log("Response data:", response.data); 
                localStorage.setItem("token", response.data.token);
                handleLogin();
                toast.success('login successfull')
                navigate("/");
            } catch (error) {
                console.error("Error response:", error); 
                // Handle error based on structure
                if (error.response) {
                    setServerErrors(error.response.data.errors || 'An error occurred. Please try again.');
                } else {
                    setServerErrors('An unexpected error occurred. Please try again.');
                }
            }
        }
    });

    return (
        <div>
            <h1>Login Here</h1>
            {serverErrors && <div style={{ color: 'red' }}><b>{serverErrors}</b></div>}

            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="username">Enter Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <div style={{ color: 'red' }}>{formik.errors.username}</div>
                    ) : null}
                </div>

                <div>
                    <label htmlFor="password">Enter Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div style={{ color: 'red' }}>{formik.errors.password}</div>
                    ) : null}
                </div>

                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}
