import LoginImage from "../assets/auth/Login.svg";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { login } from '../Services/Auth/auth';
import { useNavigate } from 'react-router-dom';
import { Alert } from '../utilis/Notification/alert';
import { Success } from '../utilis/Notification/success';
import { Error } from '../utilis/Notification/error';
import { encrypt } from "../utilis/encription";


const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    })

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = formData
        let hasError = false;
        let newErrors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            newErrors.email = 'Enter your email address';
            hasError = true;
        }

        if (!password || password.length < 6) {
            newErrors.password = 'Enter your password';
            hasError = true;
        }

        if (hasError) {
            Alert('Fill the required fields')
            setErrors(newErrors);
            return;
        }


        try {
            setLoading(true)
            const response = await login(formData)

            if (response && response.status === 400) {
                setLoading(false)
                Error('User not found')
            } else if (response && response.status === 401) {
                setLoading(false)
                Alert('Invalid Email or Password')
            }
            else if (response && response.status === 200) {
                Success("Login successful")
                navigate('/home');

                encrypt("ENC_USERNAME", response.data.userName)
                localStorage.setItem("TOKEN", response.data.token);
                localStorage.setItem("USER_ID", response.data.userId);

                setLoading(false)

            } else {
                setLoading(false)
                Error('Registration failed. Please try again')
                console.log("Unexpected response:", response);
            }

        } catch (error) {
            setLoading(false)
            Error('Registration failed. Please try again')
            console.log(error.message);
        }
    }

    useEffect(() => {
        localStorage.removeItem("TOKEN")
        localStorage.removeItem("USER_ID")
        localStorage.removeItem("ENC_USERNAME")
    }, [])

    return (
        <div
            style={{ backgroundImage: `url(${LoginImage})` }}
            className="flex justify-center items-center min-h-screen bg-cover bg-center w-auto"
        >
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
                <form className="space-y-6" action="#">
                    <h5 className="text-center font-serif text-2xl font-bold text-gray-900">
                        Sign in
                    </h5>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-900">
                            Email
                        </label>
                        <input
                            onChange={handleChange}
                            value={formData.email}
                            type="email"
                            name="email"
                            id="email"
                            className={`border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`}
                            placeholder="name@company.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}

                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-900">
                            Password
                        </label>
                        <input
                            onChange={handleChange}
                            value={formData.password}
                            type="password"
                            name="password"
                            id="password"
                            placeholder=""
                            className={`border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`}
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}

                    </div>

                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                                <path d="M4 12a8 8 0 0 1 8-8" stroke="blue" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        ) : null}
                        {loading ? 'Loading...' : 'Login to your account'}
                    </button>

                    <div className="text-sm font-medium text-gray-500">
                        Not registered?{" "}
                        <Link
                            to="/register"
                            className="text-blue-700 hover:underline"
                        >
                            Create account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
