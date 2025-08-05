'use client'

import React from 'react'
import Link from 'next/link'
import { useState } from 'react';
import { useRouter } from 'next/navigation';


const Register = () => {
      const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address");
      return;
    }
    
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Anonymous', email: form.email, password: form.password }),
      });

      const data = await res.json();

    if (res.ok) {
        alert('Registration successful');
        setForm({ email: '', password: '', confirmPassword: '' }); 
        setRedirecting(true) //redirecting
        setTimeout(() => {
          router.push('/login'); // ✅ smooth redirect
        }, 1500);
    } else {
    if (data.message === 'Email has been registered') {
        alert('Email has been registered');
        setForm({ email: '', password: '', confirmPassword: '' }); 
    } else {
        alert(data.message || 'Registration failed');
    }
}

    } catch (err) {
      console.error(err);
      alert('An error occurred');
    }
  };
  return (
    <>
        <div className="w-full min-h-screen grid bg-orange-300/20">
            <div className="m-auto">
               
                <form onSubmit={handleSubmit} 
                className="border border-white/40 p-16 bg-white/30 rounded-lg shadow-md">
                    <h1 className="text-center font-semibold text-3xl mb-4">Register Here</h1>
                  
                    <div className=" flex flex-col gap-2">
                        <label>Email</label>
                        <input 
                        name='email'
                        type='email'
                        value={form.email}
                        onChange={handleChange}
                        className="text-black border border-black/20 rounded-lg p-1 shadow-md bg-white" />

                    </div>
                     <div className=" flex flex-col gap-2 mt-5">
                        <label>Password</label>
                        <input 
                        name='password'
                        type='password'
                        value={form.password}
                        onChange={handleChange}
                        className="text-black border border-black/20 rounded-lg p-1 shadow-md bg-white" />
                        
                    </div>

                    <div className=" flex flex-col gap-2 mt-5">
                        <label>Confirm Password</label>
                        <input 
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className="text-black border border-black/20 rounded-lg p-1 shadow-md bg-white" />
                        
                    </div>

                    
                    <input type="submit" value="Register" className="w-full cursor-pointer bg-gray-200 rounded-md p-1 hover:shadow-md mt-5 py-2 font-bold text-gray-700" />
                    <div className="mt-5">
                        <span>Already have an account with us?</span><Link href="/login" className="text-orange-300 ml-1 cursor-pointer">Login Here</Link>
                    </div>
                </form>
            </div>
        </div>  
    </>
  )
}

export default Register

