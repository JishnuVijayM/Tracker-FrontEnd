import { useNavigate } from 'react-router-dom';
import RegisterImage from '../assets/auth/Register.svg';
import { register } from '../Services/Auth/auth';
import { useState } from 'react';
import { Alert } from '../utilis/Notification/alert';
import { Success } from '../utilis/Notification/success';
import { Error } from '../utilis/Notification/error';
import { Link } from 'react-router-dom';




const Register = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, email, password } = formData;
        let hasError = false;
        let newErrors = {};

        const usernameRegex = /^[A-Za-z\s]+$/;
        if (!username || !usernameRegex.test(username)) {
            newErrors.username = 'Username can only contain letters and spaces';
            hasError = true;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            newErrors.email = 'Please enter a valid email address';
            hasError = true;
        }

        if (!password || password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
            hasError = true;
        }

        if (hasError) {
            Alert('Fill the required fields')
            setErrors(newErrors);
            return;
        }

        try {
            setLoading(true)
            const response = await register(formData);

            if (response && response.status === 400) {
                Alert('Email already registered')
                setLoading(false)

            } else if (response && response.status === 200) {
                Success("Registration successful")
                console.log("Registration response:", response);
                navigate('/');
                setLoading(false)

            } else {
                Error('Registration failed. Please try again')
                console.log("Unexpected response:", response);
                setLoading(false)
            }

        } catch (error) {
            console.error("Registration error:", error);
            setLoading(false)
        }
    };

    return (
        <div
            style={{ backgroundImage: `url(${RegisterImage})` }}
            className="flex justify-center items-center min-h-screen bg-cover bg-center w-auto"
        >
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
                <form className="space-y-3" action="#">
                    <h5 className="text-center font-serif text-2xl font-bold text-gray-900 text-black">Sign up</h5>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-900 text-black">User name</label>
                        <input
                            value={formData.username}
                            onChange={handleChange}
                            type="text"
                            name="username"
                            id="name"
                            className={`border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${errors.username ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`}
                            placeholder="Your name"
                        />
                        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-900 text-black">Email</label>
                        <input
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            name="email"
                            id="email"
                            className={`border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`}
                            placeholder="name@gmail.com"

                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-900 text-black">Password</label>
                        <input
                            value={formData.password}
                            onChange={handleChange}
                            type="password"
                            name="password"
                            id="password"
                            className={` border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`}
                            placeholder=""

                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1 mb-3">{errors.password}</p>}
                    </div>

                    <button
                        disabled={loading}
                        onClick={handleSubmit}
                        type="submit"
                        className="mt-4 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                                    <path d="M4 12a8 8 0 0 1 8-8" stroke="blue" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                                Loading...
                            </>
                        ) : (
                            'Create your account'
                        )}
                    </button>

                    <div className="text-sm font-medium text-gray-500 ">
                        Already registered?
                        <Link
                            to="/"
                            className="text-blue-700 hover:underline ms-1"
                        >
                            Please login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
