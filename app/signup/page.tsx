"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import Image from 'next/image';
import api from '@/services';

interface SignupFormData {
  email: string;
  name: string;
  reg_no: string;
}

interface SignupResponse {
  email: string;
  message: string;
  password: string;
  status: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    name: '',
    reg_no: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState<SignupResponse | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return false;
    }
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return false;
    }
    if (!formData.reg_no.trim()) {
      toast.error('Registration number is required');
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    const toastId = toast.loading('Creating account...');

    try {
      const payload = {
        email: formData.email.trim(),
        name: formData.name.trim(),
        reg_no: formData.reg_no.trim(),
        shut_up: "soham-op"
      };

      const response = await api.post('/signup', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 || response.status === 201) {
        toast.success('Account created successfully!', { id: toastId });
        // Store the response data to show user credentials
        setSignupSuccess(response.data);
      }
    } catch (error) {
      console.error('Signup error:', error);
      
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 
                           error.response?.data?.error || 
                           'Failed to create account';
        toast.error(errorMessage, { id: toastId });
      } else {
        toast.error('An unexpected error occurred', { id: toastId });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Show success screen if signup was successful
  if (signupSuccess) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-white/20 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-32 w-40 h-40 border border-white/20 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 border border-white/20 rounded-full animate-pulse delay-700"></div>
        </div>

        {/* Success Content */}
        <div className="flex flex-col items-center space-y-8 z-10 w-full max-w-md px-6">
          {/* Success Icon & Title */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 relative mx-auto">
              <div className="w-16 h-16 bg-[#32ca67] rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white font-['Bruno_Ace']">
              Account Created!
            </h1>
            <p className="text-white/80 text-lg">Your CookOff account is ready</p>
          </div>

          {/* User Credentials */}
          <div className="w-full space-y-4 bg-white/5 border border-white/20 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Your Login Credentials</h2>
            
            {/* Email */}
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">Email Address</label>
              <div className="flex items-center justify-between bg-white/10 border border-white/20 rounded-lg p-3">
                <span className="text-white font-mono">{signupSuccess.email}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(signupSuccess.email)}
                  className="text-[#32ca67] hover:text-[#28a555] transition-colors duration-200 text-sm"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">Password</label>
              <div className="flex items-center justify-between bg-white/10 border border-white/20 rounded-lg p-3">
                <span className="text-white font-mono">{signupSuccess.password}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(signupSuccess.password)}
                  className="text-[#32ca67] hover:text-[#28a555] transition-colors duration-200 text-sm"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Important Note */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mt-4">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <p className="text-yellow-200 text-sm font-medium">Important!</p>
                  <p className="text-yellow-200/80 text-sm mt-1">
                    Please save these credentials securely. You&apos;ll need them to login to your account.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full space-y-3">
            <button
              onClick={() => router.push('/')}
              className="w-full py-3 bg-[#32ca67] hover:bg-[#28a555] text-white font-semibold 
                       rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 
                       focus:ring-[#32ca67] focus:ring-offset-2 focus:ring-offset-black"
            >
              Go to Homepage
            </button>
            <button
              onClick={() => router.push('/login')}
              className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 
                       text-white font-semibold rounded-lg transition-colors duration-200 
                       focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 
                       focus:ring-offset-black"
            >
              Login Now
            </button>
          </div>
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/20"></div>
        <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-white/20"></div>
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-white/20"></div>
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/20"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-white/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 border border-white/20 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 border border-white/20 rounded-full animate-pulse delay-700"></div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center space-y-8 z-10 w-full max-w-md px-6">
        {/* Logo */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 relative mx-auto">
            <Image
              src="/chef-hat.svg"
              alt="CookOff Logo"
              fill
              className="object-contain filter brightness-0 invert"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white font-['Bruno_Ace']">
            Cook<span style={{ color: '#32ca67' }}>Off</span>
          </h1>
          <p className="text-white/80 text-lg">Create your account</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-white text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                       text-white placeholder-white/50 focus:outline-none focus:border-[#32ca67] 
                       focus:ring-1 focus:ring-[#32ca67] disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-white text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                       text-white placeholder-white/50 focus:outline-none focus:border-[#32ca67] 
                       focus:ring-1 focus:ring-[#32ca67] disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Registration Number Field */}
          <div className="space-y-2">
            <label htmlFor="reg_no" className="text-white text-sm font-medium">
              Registration Number
            </label>
            <input
              type="text"
              id="reg_no"
              name="reg_no"
              value={formData.reg_no}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                       text-white placeholder-white/50 focus:outline-none focus:border-[#32ca67] 
                       focus:ring-1 focus:ring-[#32ca67] disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter your registration number"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#32ca67] hover:bg-[#28a555] disabled:bg-[#32ca67]/50 
                     text-white font-semibold rounded-lg transition-colors duration-200 
                     disabled:cursor-not-allowed focus:outline-none focus:ring-2 
                     focus:ring-[#32ca67] focus:ring-offset-2 focus:ring-offset-black"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-white/80">
            Already have an account?{' '}
            <button
              onClick={() => router.push('/login')}
              className="text-[#32ca67] hover:text-[#28a555] font-medium transition-colors duration-200"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/20"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-white/20"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-white/20"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/20"></div>
    </div>
  );
}
