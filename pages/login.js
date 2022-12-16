import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useRef, useState } from "react";
import { BiLogIn } from "react-icons/bi";
import { setCookie, hasCookie } from 'cookies-next';
import { useRouter } from "next/router";
import Div from "../components/Div";
// import Div from '../components/Div'

const Login = () => {
  const router = useRouter()
  const loginRef = useRef();
  const signupRef = useRef();
  const loginFormRef = useRef();
  const signupFormRef = useRef();

  const [login, setLogin] = useState({ email: "", password: "" });
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    Cpassword: "",
  });
  const [token, setToken] = useState(false);



  const inputChange = (e) => {
    const { name, value } = e.target
    setLogin({ ...login, [name]: value })
  }

  const signupChange = (e) => {
    const { name, value } = e.target
    setSignup({ ...signup, [name]: value })
  }


  const loginSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/users/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({ email: login.email, password: login.password })
    })
    const json = await res.json()
    if(json === 'You are not user' ) {
      
      toast.error('You are not user', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      return
    } 

    setCookie('token', json.token, { maxAge: 60 * 60 * 24 })
    setToken(hasCookie('token'))

  };

  const signupSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password, Cpassword } = signup

    if(password !== Cpassword ) {
      
      toast.error('Password Not Match', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      return
    } 

    const res = await fetch(`/api/users/createUsers`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({name, email, password })
    })
    const json = await res.json()

    console.log(json);

    if(json === 'User Already Exists' ) {
      
      toast.error(json, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      return
    } 

    setCookie('token', json.token, { maxAge: 60 * 60 * 24 })
    router.push('/')

  };
  const clickLogin = (e) => {
    if (loginRef.current.classList.contains("login")) {
      signupRef.current.classList.remove("bg-green-500");
      loginRef.current.classList.add("bg-green-500");
      loginFormRef.current.classList.remove("hidden");
      signupFormRef.current.classList.add("hidden");
    }
  };

  const clickSignup = () => {
    if (signupRef.current.classList.contains("signup")) {
      loginRef.current.classList.remove("bg-green-500");
      signupRef.current.classList.add("bg-green-500");
      loginFormRef.current.classList.add("hidden");
      signupFormRef.current.classList.remove("hidden");
    }
  };

  useEffect(() => {
    if (loginRef != undefined) {
      loginRef.current.classList.add("bg-green-500");
      signupFormRef.current.classList.add("hidden");
    }


    setTimeout(() => {
      if (token) {
        router.push('/')
      }
    }, 100)

  }, [router, token]);

  return (
    <Div>
      <ToastContainer position="bottom-center" de />
      <div className="flex items-center  w-full">
        <div className="w-full bg-white my-16 rounded shadow-xl shadow-gray-700 p-8 m-4 md:max-w-lg md:mx-auto">
          <div className=" w-full flex flex-1 mb-4">
            <p ref={loginRef} onClick={clickLogin} className="login cursor-pointer w-2/4 text-xl capitalize font-bold  py-3 text-center">
              Login
            </p>
            <p ref={signupRef} onClick={clickSignup} className="signup cursor-pointer w-2/4 text-xl capitalize font-bold  py-3 text-center">
              Sign Up
            </p>
          </div>
          {/* <span className="block w-full text-xl capitalize font-bold mb-4">Admin Login</span> */}
          <div ref={loginFormRef} className="loginFormRef">
            <form className="mb-4" onSubmit={loginSubmit}>
              <div className="mb-4 md:w-full">
                <label htmlFor="email" className="block text-xs mb-1">
                  Username or Email
                </label>
                <input className="w-full border rounded p-2 outline-none focus:shadow-outline" onChange={inputChange} value={login.email} type="email" name="email" id="email" placeholder="Username or Email" />
              </div>
              <div className="mb-6 md:w-full">
                <label htmlFor="password" className="block text-xs mb-1">
                  Password
                </label>
                <input className="w-full border rounded p-2 outline-none focus:shadow-outline" onChange={inputChange} value={login.password} type="password" name="password" id="Lpassword" placeholder="Password" />
              </div>
              <button className=" flex items-center bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">
                <BiLogIn className="inline m-2" />

                <span>Login</span>
              </button>
            </form>
            <Link
              className="text-blue-700 mt-3 text-center text-sm"
              href="/login"
            >
              Forgot password?
            </Link>
          </div>
          {/* Sighup Form */}
          <div ref={signupFormRef} className="signupFormRef">
            <form className="signupFormRef" onSubmit={signupSubmit}>
              <div className="mb-4 md:w-full">
                <label htmlFor="name" className="block text-xs mb-1">
                  Name
                </label>
                <input className="w-full border rounded p-2 outline-none focus:shadow-outline" onChange={signupChange} value={signup.name} type="text" name="name" id="name" placeholder="Enter Your Name" />
              </div>
              <div className="mb-4 md:w-full">
                <label htmlFor="email" className="block text-xs mb-1">
                  Email
                </label>
                <input className="w-full border rounded p-2 outline-none focus:shadow-outline" onChange={signupChange} value={signup.email} type="email" name="email" id="email1" placeholder="Enter Your Email" />
              </div>
              <div className="mb-6 md:w-full">
                <label htmlFor="password" className="block text-xs mb-1">
                  Password
                </label>
                <input className="w-full border rounded p-2 outline-none focus:shadow-outline" onChange={signupChange} value={signup.password} type="password" name="password" id="password" placeholder="Password" />
              </div>
              <div className="mb-6 md:w-full">
                <label htmlFor="Cpassword" className="block text-xs mb-1">
                  Confirm Password
                </label>
                <input className="w-full border rounded p-2 outline-none focus:shadow-outline" onChange={signupChange} value={signup.Cpassword} type="password" name="Cpassword" id="Cpassword" placeholder="Confirm Password" />
              </div>
              <button className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </Div>
  );
};

export default Login;
