import React, { useEffect, useState, useRef } from 'react';
import { axiosClient } from '../utils/axiosClient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar';

document.title = 'Login';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    if (localStorage.getItem('User')) {
      navigate('/');
    }
  }, [navigate]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      ref.current.staticStart();
      const response = await axiosClient.post('/auth/login', {
        email,
        password,
      });

      if (response.data.statusCode !== 201) {
        toast.error(response.data.message);
        ref.current.complete();
        return;
      }
      toast.success('Successfully Logged In !!');
      localStorage.setItem('User', JSON.stringify(response.data.message));
      ref.current.complete();

      navigate('/');
    } catch (error) {
      console.log(error.message);
      ref.current.complete();
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <LoadingBar color="#4f46e5" ref={ref} />

      {/* Left side - Branding / Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-blue-500 flex-col justify-center items-center p-12 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          Take control of your <br />
          <span className="text-indigo-200">financial future.</span>
        </h1>
        <p className="text-lg text-indigo-100 max-w-md leading-relaxed">
          The most intuitive way to track your expenses and manage your personal budget effectively.
        </p>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back</h2>
            <p className="mt-2 text-sm text-slate-500">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={submitForm} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Sign In
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
              Sign up for free
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;