import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import userService from "../../service/userService";

const LoginSignup = () => {
    const [activeTab, setActiveTab] = useState("login");
    const [signUpUser, setSignUpUser] = useState({
        name: "",
        password: "",
        email: "",
        profilePicture: ""
    });
    const [loginUser, setLoginUser] = useState({
        email: "",
        password: ""
    });
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleSignUpChange = (e) => {
        setSignUpUser({ ...signUpUser, [e.target.name]: e.target.value });
    };

    const handleLoginChange = (e) => {
        setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
    };

    const handleSignUpSubmit = async(e) => {
        e.preventDefault();

        console.log("This is signup form data:- ", signUpUser);

        if(!signUpUser.email)   return toast.info("Please enter your email");

        if(!signUpUser.password)    return toast.info("Please enter your password");

        if(!signUpUser.name)   return toast.info("Please enter your name"); 

        if (!emailRegex.test(signUpUser.email)) {
            return toast.error("Please enter a valid email address");
        }

        try{
            const res = await userService.signUp(signUpUser);
            console.log("This is signup res in frontend:- ", res);
            return toast.success("Signup Successfull");
        }
        catch(error){
            if(error.status === 401){
                console.error("User already exists", error);
                return toast.error("User already exisits");
            }
            console.error("Failed to signup user ", error);
            return toast.error("Failed to SignUp user");
        }

    }

    const handleLoginSubmit = async(e) => {
        e.preventDefault();

        console.log("This is login form data:- ", loginUser);

        if(!loginUser.email)   return toast.info("Please enter your email");

        if(!loginUser.password)    return toast.info("Please enter your password");

        if (!emailRegex.test(loginUser.email)) {
            return toast.error("Please enter a valid email address");
        }

        try{
            const res = await userService.logIn(loginUser);
            console.log("This is login res in frontend:- ", res);
            return toast.success("Login Successfull");
        }
        catch(error){
            console.error("Failed to login user ", error);
            return toast.error("Failed to login User");
        }
    }

    return (
        <div className="flex flex-col md:flex-row h-screen bg-black">
            {/* Left Section: Auth Forms */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-zinc-500 p-6">
                <div className="w-full max-w-md p-8 bg-black text-white rounded-lg shadow-lg">
                    <div className="flex mb-6">
                        <button
                            className={`w-1/2 py-3 text-xl font-bold ${activeTab === "login" ? "border-b-2 border-yellow-500" : "text-gray-400"
                                }`}
                            onClick={() => setActiveTab("login")}
                        >
                            Login
                        </button>
                        <button
                            className={`w-1/2 py-3 text-xl font-bold ${activeTab === "signup" ? "border-b-2 border-yellow-500" : "text-gray-400"
                                }`}
                            onClick={() => setActiveTab("signup")}
                        >
                            Signup
                        </button>
                    </div>

                    {activeTab === "login" ? (
                        <form onSubmit={handleLoginSubmit}>
                            <input type="text" placeholder="Email" name="email" className="w-full p-3 border rounded mb-3 bg-zinc-800 text-white" value={loginUser.email} onChange={handleLoginChange} />
                            <input type="password" placeholder="Password" name="password" className="w-full p-3 border rounded mb-3 bg-zinc-800 text-white" value={loginUser.password} onChange={handleLoginChange} />
                            <button type="submit" className="w-full bg-yellow-500 text-black py-3 rounded font-bold" >Login</button>
                        </form>
                    ) : (
                        <form onSubmit={handleSignUpSubmit}>
                            <input type="text" placeholder="Name" name="name" className="w-full p-3 border rounded mb-3 bg-zinc-800 text-white" value={signUpUser.name} onChange={handleSignUpChange} />
                            <input type="text" placeholder="Email" name="email" className="w-full p-3 border rounded mb-3 bg-zinc-800 text-white" value={signUpUser.email} onChange={handleSignUpChange} />
                            <input type="password" placeholder="Password" name="password" className="w-full p-3 border rounded mb-3 bg-zinc-800 text-white" value={signUpUser.password} onChange={handleSignUpChange} />
                            <button type="submit" className="w-full bg-yellow-500 text-black py-3 rounded font-bold" >Signup</button>
                        </form>
                    )}
                </div>
            </div>

            {/* Right Section: Bloggy Info */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-black text-white p-10 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-4xl md:text-5xl font-bold mb-6 text-yellow-500"
                >
                    Welcome to Bloggy!
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="text-lg md:text-xl"
                >
                    The best platform to share your thoughts, read engaging blogs, and connect with writers worldwide.
                </motion.p>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 2 }}
                    className="text-lg md:text-xl mt-3"
                >
                    Discover a seamless writing experience with our modern editor and AI-powered tools.
                </motion.p>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 3 }}
                    className="text-lg md:text-xl mt-3"
                >
                    Engage with a vibrant community and showcase your creativity.
                </motion.p>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 4 }}
                    className="text-lg md:text-xl mt-3"
                >
                    Sign up now and start your blogging journey with Bloggy!
                </motion.p>
            </div>
        </div>
    );
};

export default LoginSignup;
