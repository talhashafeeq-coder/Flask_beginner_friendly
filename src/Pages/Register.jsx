import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from "react-hot-toast";
import axios from 'axios';
import IndexUrl from '../Hooks/IndexUrl'



export default function register() { // Changed to uppercase
    const [formData, setFormData] = useState({
        email: '',
        // username: '',
        password: ''
    });
    const navigate = useNavigate(); // Keep this only once

    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //     //   window.location.href = '/'
    //     navigate('/')
    //     }
    // },[navigate])
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
    
        // Check for missing form fields
        if (!formData.email || !formData.username || !formData.password) {
            toast.error('Please fill in all fields.');
            return;
        }
    
        try {
            // Make the API request to register the user
            const response = await axios.post('http://localhost:5000/auth/register', formData);
    
            // Display success message if registration is successful
            toast.success('Registered Successfully!');
            console.log(response.data);
            
            // Navigate to login page
            navigate('/login');
        } catch (error) {
            // Display error message if there's an issue with registration
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An error occurred during registration.');
            }
            console.error('Error during registration:', error);
        }
    }

    return (
        <>
        < IndexUrl.Navbar />
        <div className='container' style={{ backgroundColor: "gray", border: '1px solid black', padding: '20px', width: '50%', margin: 'auto', marginTop: '118px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.9)', borderRadius: "10px" }}>
            <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Register Page</h3>
            <p style={{ textAlign: 'center', marginTop: '20px' }}>Please fill out the form below to register.</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email" 
                        className="form-control"
                        id="email"
                        name="email"
                        required
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        required
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <button type="submit" className="btn btn-sm btn-dark">Submit</button><br /><br />
                <button
                    type="button"
                    className="btn btn-sm btn-light"
                    onClick={async () => {
                        toast.success('Welcome to the login page');
                        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before navigating
                        navigate('/login');
                    }}>
                    Login
                </button>
                <p style={{ fontSize: "12px" }}>You already have an account</p>
            </form>
            <Toaster />
        </div >
        </>
    );
}
