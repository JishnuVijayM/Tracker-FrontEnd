import LoginImage from '../assets/auth/Login.svg'

const Register = () => {
    return (
        <div
            style={{ backgroundImage: `url(${LoginImage})` }}
            className="flex justify-end items-center min-h-screen bg-cover bg-center w-auto"
        >
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
                <form className="space-y-3" action="#">
                    <h5 className="text-center font-serif text-2xl font-bold text-gray-900 text-black">Sign up</h5>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-900 text-black">User name</label>
                        <input type="text" name="name" id="name" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Your name" required />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-900 text-black">Email</label>
                        <input type="email" name="email" id="email" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@company.com" required />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-900 text-black">Phone</label>
                        <input type="text" name="phone" id="phone" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="+91 " />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-900 text-black">Password</label>
                        <input type="password" name="password" id="password" placeholder="" className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                    </div>

                    <button type="submit" className="mt-4 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login to your account</button>
                    <div className="text-sm font-medium text-gray-500 ">
                        Not registered? <a href="#" className="text-blue-700 hover:underline ">Create account</a>
                    </div>
                </form>
            </div>


        </div>
    );
};

export default Register;
