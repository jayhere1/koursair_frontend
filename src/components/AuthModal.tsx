"use client";

import React, { useState, useEffect, useCallback, memo } from "react";
import { X, Mail, Key, Eye, EyeOff } from "lucide-react";
import { useAuthStore, useUIStore } from "@/stores";
import { supabase } from "@/lib/supabaseClient";
import Popup from "./Popup";
import KoursairImage from "./Media/Images/KoursairImage";
import { Country, getCountries, getCountryCallingCode, parsePhoneNumber, Value } from "react-phone-number-input";
import PhoneInput from "react-phone-number-input";

type LocalPopup = {
  message: string;
  type: "error" | "info"; // Mainly for errors
};

// --- LoginModal Component ---
const LoginModal = memo(
  ({
    onClose,
    onLogin,
    switchToSignup,
    switchToForgotPassword,
    switchToOTPEmail,
  }: {
    onClose: () => void;
    onLogin: (email: string, password: string) => Promise<void>;
    switchToSignup: () => void;
    switchToForgotPassword: () => void;
    switchToOTPEmail: () => void;
  }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [localPopup, setLocalPopup] = useState<LocalPopup | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = useCallback(async () => {
      if (!email || !password) {
        setLocalPopup({ message: "Please fill in all fields", type: "error" });
        return;
      }
      setLoading(true);
      try {
        await onLogin(email, password);
        setEmail("");
        setPassword("");
      } catch {
      } finally {
        setLoading(false);
      }
    }, [email, password, onLogin]);

    const handleSocialLogin = async (
      provider: "google" | "apple" | "facebook"
    ) => {
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: `${window.location.origin}/api/auth/callback`,
          },
        });

        if (error) {
          //console.error(`${provider} login error:`, error.message);
          setLocalPopup({
            message: `Login with ${provider} failed. Please try again.`,
            type: "error",
          });
        } else {
          //console.log(`✅ Redirecting to ${provider} login...`);
        }
      } catch {
        //console.error('Unexpected login error:', err);
        setLocalPopup({
          message: "Something went wrong during login. Please try again.",
          type: "error",
        });
      }
    };

    return (
      <div
        className="fixed inset-0 backdrop-blur-sm z-[100] flex items-center justify-center"
        onClick={onClose}
      >
        <div
          className="relative bg-white rounded-xl shadow-2xl w-[90%] sm:w-[80%] max-w-[900px] h-auto sm:h-[500px] md:h-[600px] flex overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {localPopup && (
            <Popup
              message={localPopup.message}
              type={localPopup.type}
              onClose={() => setLocalPopup(null)}
            />
          )}
          <button
            onClick={onClose}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 w-8 sm:w-10 h-8 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"
          >
            <X className="w-4 sm:w-5 h-4 sm:h-5 text-red-500" />
          </button>

          {/* Left Side - Features */}
          <div className="hidden md:flex md:w-1/2 bg-cover bg-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30" />

            <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-12 text-white flex flex-col justify-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 md:mb-12">
                Sign up/Login now to
              </h2>
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 sm:w-6 h-5 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">
                      Explore Handpicked Destinations
                    </h3>
                  </div>
                </div>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 sm:w-6 h-5 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">
                      Customize Your Travel Journey
                    </h3>
                  </div>
                </div>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 sm:w-6 h-5 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">
                      Get Insider Deals & Priority Access
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center">
            <div className="max-w-sm mx-auto w-full">
              <h2 className="text-base sm:text-lg font-medium text-gray-700 mb-1 sm:mb-2 text-center">
                Login in to continue your travel journey
              </h2>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center text-black">
                Login
              </h3>
              <div className="flex justify-center space-x-3 sm:space-x-4">
                <button
                  onClick={() => handleSocialLogin("google")}
                  className="w-7 sm:w-8 h-7 sm:h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-110"
                  aria-label="Sign in with Google"
                  title="Sign in with Google"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    width="36"
                    height="42"
                    role="img"
                    aria-hidden="true"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.3 0 6.3 1.1 8.6 3.2l6.4-6.4C34.5 2.4 29.7 0 24 0 14.7 0 6.6 5.7 2.7 14l7.9 6.1C12.3 13.5 17.7 9.5 24 9.5z"
                    />
                    <path
                      fill="#34A853"
                      d="M46.5 24.5c0-1.7-.2-3.3-.5-4.9H24v9.4h12.6c-.6 3.2-2.3 6-4.9 7.9l7.6 5.8C43.7 38.1 46.5 31.9 46.5 24.5z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.5 29.3a14.5 14.5 0 0 1 0-10.6L2.7 12.6A23.7 23.7 0 0 0 0 24a23.7 23.7 0 0 0 2.7 11.4l7.8-6.1z"
                    />
                    <path
                      fill="#4285F4"
                      d="M24 48c6.4 0 11.8-2.1 15.7-5.7l-7.6-5.8c-2.1 1.5-4.8 2.4-8.1 2.4-6.2 0-11.5-4-13.5-9.6l-7.8 6.1C6.6 42.3 14.7 48 24 48z"
                    />
                  </svg>
                </button>
                <button
                  className="w-6 sm:w-7 h-6 sm:h-7 bg-white text-white rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                  onClick={() => handleSocialLogin("apple")}
                >
                  <svg
                    width="36"
                    height="42"
                    viewBox="0 0 36 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M24.2991 6.7051C25.8301 4.9306 26.8622 2.45909 26.5797 1.14441e-05C24.3734 0.0840122 21.7041 1.40943 20.1221 3.18183C18.7014 4.75472 17.4613 7.26796 17.7947 9.67876C20.2559 9.86144 22.768 8.48167 24.2991 6.7051ZM29.8181 22.3127C29.8797 28.6694 35.6366 30.7839 35.7003 30.8112C35.6536 30.9603 34.7808 33.8242 32.6679 36.7852C30.8395 39.343 28.9432 41.8904 25.9554 41.945C23.0207 41.9975 22.0757 40.2777 18.7184 40.2777C15.3633 40.2777 14.3142 41.8902 11.5367 41.9973C8.6529 42.1002 6.45504 39.23 4.61394 36.6806C0.8468 31.4663 -2.03058 21.9454 1.83425 15.5194C3.75392 12.3295 7.18341 10.3065 10.9081 10.2561C13.7388 10.2036 16.4123 12.0813 18.143 12.0813C19.8736 12.0813 23.1226 9.82376 26.5373 10.1556C27.9664 10.2123 31.9799 10.7077 34.5557 14.3218C34.3476 14.4457 29.7672 16.9997 29.8181 22.3127Z"
                      fill="black"
                    />
                  </svg>
                </button>
                {/* <button
                  className="w-7 sm:w-8 h-7 sm:h-8 bg-white rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                  onClick={() => handleSocialLogin("facebook")}
                >
                  <svg
                    width="36"
                    height="42"
                    viewBox="0 0 43 42"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.1824 -1.52588e-05C9.58608 -1.52588e-05 0.0981445 9.46684 0.0981445 21.1265C0.0981445 31.6687 7.815 40.4186 17.8933 42V27.2409H12.5379V21.1265H17.8933V16.4668C17.8933 11.1747 21.0349 8.26503 25.8632 8.26503C28.1614 8.26503 30.565 8.66563 30.565 8.66563V13.8735H27.9083C25.2939 13.8735 24.4716 15.4969 24.4716 17.1627V21.1265H30.333L29.3842 27.2409H24.4716V42C29.4399 41.2152 33.9642 38.6802 37.2274 34.8524C40.4906 31.0247 42.2781 26.1564 42.2668 21.1265C42.2668 9.46684 32.7788 -1.52588e-05 21.1824 -1.52588e-05Z"
                      fill="#1877F2"
                    />
                    <path
                      d="M29.3842 27.2409L30.333 21.1265H24.4716V17.1627C24.4716 15.4969 25.2939 13.8735 27.9083 13.8735H30.565V8.66563C30.565 8.66563 28.1614 8.26503 25.8632 8.26503C21.0349 8.26503 17.8933 11.1747 17.8933 16.4668V21.1265H12.5379V27.2409H17.8933V42C19.6163 42.2838 21.377 42.2838 23.1 42V27.2409H29.3842Z"
                      fill="white"
                    />
                  </svg>
                </button> */}
              </div>

              <div className="relative my-3 sm:my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs sm:text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 mb-2 sm:mb-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm sm:text-base"
                  onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                  disabled={loading}
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm sm:text-base pr-10"
                    onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                    tabIndex={-1}
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "LOADING..." : "CONTINUE"}
                </button>
              </div>

              <div className="text-center mb-2">
                <button
                  onClick={switchToOTPEmail}
                  className="text-xs sm:text-sm text-black font-semibold hover:underline bg-gray-100 hover:bg-gray-200 p-2 rounded-lg w-full transition-colors"
                >
                  Login with OTP
                </button>
              </div>

              <div className="text-center mb-2 sm:mb-4">
                <button
                  onClick={switchToForgotPassword}
                  className="text-xs sm:text-[13px] text-black hover:underline"
                >
                  Forgot Username or Password?
                </button>
                <span className="text-gray-400 mx-1">|</span>
                <button
                  onClick={switchToSignup}
                  className="text-xs sm:text-[13px] text-black hover:underline"
                >
                  Create New Account
                </button>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 text-center mt-6 sm:mt-8">
                By proceeding, you agree to Koursair&apos;s{" "}
                <a
                  href="/info/privacy-policy"
                  className="text-black hover:underline"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
LoginModal.displayName = "LoginModal";

// --- New OTPEmailModal Component (No changes) ---
const OTPEmailModal = memo(
  ({
    onClose,
    requestOtp,
    signInWithOtp,
    switchToLogin,
    switchToSignup,
  }: {
    onClose: () => void;
    requestOtp: (email: string) => Promise<void>;
    signInWithOtp: (email: string, otp: string) => Promise<void>;
    switchToLogin: () => void;
    switchToSignup: () => void;
  }) => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [localPopup, setLocalPopup] = useState<LocalPopup | null>(null);

    const handleSendOtp = useCallback(async () => {
      if (!email) {
        setLocalPopup({
          message: "Please enter your email address",
          type: "error",
        });
        return;
      }
      setLoading(true);
      try {
        await requestOtp(email);
        setOtpSent(true);
      } catch {
        //console.error('Error sending OTP:', error);
      } finally {
        setLoading(false);
      }
    }, [email, requestOtp]);

    const handleVerifyOtp = useCallback(async () => {
      if (!email || !otp) {
        setLocalPopup({
          message: "Please enter both email and OTP",
          type: "error",
        });
        return;
      }
      setLoading(true);
      try {
        await signInWithOtp(email, otp);
        setEmail("");
        setOtp("");
      } catch {
        // Error handled in context
      } finally {
        setLoading(false);
      }
    }, [email, otp, signInWithOtp]);

    return (
      <div
        className="fixed inset-0 backdrop-blur-sm z-[100] flex items-center justify-center"
        onClick={onClose}
      >
        <div
          className="relative bg-white rounded-xl shadow-2xl w-[90%] sm:w-[80%] max-w-[900px] h-auto sm:h-[500px] md:h-[600px] flex overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {localPopup && (
            <Popup
              message={localPopup.message}
              type={localPopup.type}
              onClose={() => setLocalPopup(null)}
            />
          )}
          <button
            onClick={onClose}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 w-8 sm:w-10 h-8 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"
          >
            <X className="w-4 sm:w-5 h-4 sm:h-5 text-red-500" />
          </button>

          {/* Left Side */}
          <div className="hidden md:flex md:w-1/2 bg-cover bg-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30" />
            <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-12 text-white flex flex-col justify-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 md:mb-12">
                Sign up/Login now to
              </h2>
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 sm:w-6 h-5 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">
                      Explore Handpicked Destinations
                    </h3>
                  </div>
                </div>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 sm:w-6 h-5 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">
                      Customize Your Travel Journey
                    </h3>
                  </div>
                </div>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 sm:w-6 h-5 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">
                      Get Insider Deals & Priority Access
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - OTP Form */}
          <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center">
            <div className="max-w-sm mx-auto w-full">
              <h2 className="text-base sm:text-xl font-medium text-gray-700 mb-1 sm:mb-2 text-center">
                Quick and secure access to your account
              </h2>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-center text-black">
                Login with OTP
              </h3>

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm sm:text-base"
                  disabled={loading || otpSent}
                />

                {!otpSent && (
                  <button
                    onClick={handleSendOtp}
                    disabled={loading}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "SENDING OTP..." : "SEND OTP"}
                  </button>
                )}

                {otpSent && (
                  <>
                    <input
                      type="text"
                      placeholder="Enter OTP (Check your email)"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm sm:text-base"
                      onKeyPress={(e) => e.key === "Enter" && handleVerifyOtp()}
                      disabled={loading}
                    />
                    <button
                      onClick={handleVerifyOtp}
                      disabled={loading}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "LOGGING IN..." : "VERIFY & LOGIN"}
                    </button>
                    <p className="text-center text-xs text-gray-500">
                      Didn&apos;t receive it?{" "}
                      <button
                        onClick={handleSendOtp}
                        disabled={loading}
                        className="text-black hover:underline"
                      >
                        Resend OTP
                      </button>
                    </p>
                  </>
                )}
              </div>

              <div className="text-center mb-4 sm:mb-6">
                <button
                  onClick={switchToLogin}
                  className="text-xs sm:text-sm text-black hover:underline"
                >
                  Back to Password Login
                </button>
                <span className="text-gray-400 mx-2">|</span>
                <button
                  onClick={switchToSignup}
                  className="text-xs sm:text-sm text-black hover:underline"
                >
                  Create New Account
                </button>
              </div>

              <p className="text-xs sm:text-sm text-gray-500 text-center mt-6 sm:mt-8">
                By proceeding, you agree to Koursair&apos;s{" "}
                <a
                  href="/info/privacy-policy"
                  className="text-black hover:underline"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
OTPEmailModal.displayName = "OTPEmailModal";

// --- UPDATED: CreateNewPasswordModal Component ---
const CreateNewPasswordModal = memo(
  ({
    onClose,
    onResetPassword,
    switchToLogin,
  }: {
    onClose: () => void;
    // --- UPDATED: Prop types to match context ---
    onResetPassword: (
      email: string,
      newPass: string,
      confirmPass: string
    ) => Promise<void>;
    switchToLogin: () => void;
  }) => {
    // --- UPDATED: Added email state ---
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [localPopup, setLocalPopup] = useState<LocalPopup | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // --- UPDATED: handleSubmit to pass all data ---
    const handleSubmit = useCallback(async () => {
      if (!email || !newPassword || !confirmPassword) {
        setLocalPopup({ message: "Please fill in all fields", type: "error" });
        return;
      }
      if (newPassword !== confirmPassword) {
        setLocalPopup({ message: "Passwords do not match", type: "error" });
        return;
      }
      setLoading(true);
      try {
        await onResetPassword(email, newPassword, confirmPassword);
        setEmail("");
        setNewPassword("");
        setConfirmPassword("");
      } catch {
        // Error handled in context
      } finally {
        setLoading(false);
      }
    }, [email, newPassword, confirmPassword, onResetPassword]); // <-- Add email

    return (
      <div
        className="fixed inset-0 backdrop-blur-sm z-[100] flex items-center justify-center"
        onClick={onClose}
      >
        <div
          className="relative bg-white rounded-xl shadow-2xl w-[90%] sm:w-[80%] max-w-[900px] h-auto sm:h-[500px] md:h-[600px] flex overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {localPopup && (
            <Popup
              message={localPopup.message}
              type={localPopup.type}
              onClose={() => setLocalPopup(null)}
            />
          )}
          <button
            onClick={onClose}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 w-8 sm:w-10 h-8 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"
          >
            <X className="w-4 sm:w-5 h-4 sm:h-5 text-red-500" />
          </button>

          {/* Left Side (can be the same as others) */}
          <div className="hidden md:flex md:w-1/2 bg-cover bg-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30" />
            <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-12 text-white flex flex-col justify-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 md:mb-12">
                Security is a Priority
              </h2>
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <Key className="w-5 sm:w-6 h-5 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">
                      Set a Strong, Unique Password
                    </h3>
                  </div>
                </div>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 sm:w-6 h-5 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">
                      Your Account Remains Secure
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Create New Password Form */}
          <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center">
            <div className="max-w-sm mx-auto w-full">
              <h2 className="text-base sm:text-xl font-medium text-gray-700 mb-1 sm:mb-2 text-center">
                Final step to regaining access
              </h2>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-center text-black">
                Set New Password
              </h3>

              {/* --- UPDATED: Added Email field --- */}
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <input
                  type="email"
                  placeholder="Your Email Address*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm sm:text-base"
                  disabled={loading}
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm sm:text-base pr-10"
                    onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                    tabIndex={-1}
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm sm:text-base pr-10"
                    onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                    tabIndex={-1}
                    onClick={() => setShowConfirmPassword((v) => !v)}
                  >
                    {showConfirmPassword ? (
                      <Eye size={18} />
                    ) : (
                      <EyeOff size={18} />
                    )}
                  </button>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-300 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "SAVING..." : "RESET PASSWORD"}
                </button>
              </div>

              <div className="text-center mb-4 sm:mb-6">
                <button
                  onClick={switchToLogin}
                  className="text-xs sm:text-sm text-black underline hover:cursor-pointer"
                >
                  Back to Sign In
                </button>
              </div>

              <p className="text-xs sm:text-sm text-gray-500 text-center mt-6 sm:mt-8">
                By proceeding, you agree to Koursair&apos;s{" "}
                <a
                  href="/info/privacy-policy"
                  className="text-black hover:underline"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
CreateNewPasswordModal.displayName = "CreateNewPasswordModal";



const SignupModal = memo(
  ({
    onClose,
    onSignup,
    switchToLogin,
  }: {
    onClose: () => void;
    onSignup: (
      name: string,
      email: string,
      country_code: string,
      mobile_number: string,
      password: string,
      confirm_password: string
    ) => Promise<void>;
    switchToLogin: () => void;
  }) => {
    const [signupName, setSignupName] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupConfirmPass, setSignupConfirmPass] = useState("");
    
    // Unified state for the PhoneInput
    const [phoneNumber, setPhoneNumber] = useState<Value | undefined>();
    // State to hold the detected default country (Defaults to IN)
    const [defaultCountry, setDefaultCountry] = useState<Country>("IN");
    
    const [loading, setLoading] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [confirmError, setConfirmError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [fieldsError, setFieldsError] = useState("");
    const [privacyChecked, setPrivacyChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const detectedPhoneCode = useAuthStore((s) => s.detectedPhoneCode);
    const isPhoneCodeLoading = useAuthStore((s) => s.isPhoneCodeLoading);
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated)();
    
    const [localPopup, setLocalPopup] = useState<LocalPopup | null>(null);
    const [nameError, setNameError] = useState("");
    const [mobileError, setMobileError] = useState("");

    // --- Dynamic Country Lookup ---
    useEffect(() => {
      // Only set if user is logged out and we have a detected code
      if (!isAuthenticated && !isPhoneCodeLoading && detectedPhoneCode) {
         // detectedPhoneCode comes in as "+91", "+1", etc.
         // We strip the "+" to compare with the library's calling codes.
         const cleanCode = detectedPhoneCode.replace('+', '');
         
         // Dynamically find the country ISO code that matches this calling code
         const matchedCountry = getCountries().find(
           (country) => getCountryCallingCode(country) === cleanCode
         );

         if (matchedCountry) {
            setDefaultCountry(matchedCountry);
         }
      }
    }, [detectedPhoneCode, isPhoneCodeLoading, isAuthenticated]);
    // ------------------------------

    const validatePassword = (pwd: string) => {
      if (pwd.length < 8) return "Password must be at least 8 characters long";
      if (!/[A-Z]/.test(pwd))
        return "Password must contain at least one uppercase letter";
      return "";
    };

    const validateName = (name: string) => {
      if (!name.trim()) return "Name is required";
      if (!/^[a-zA-Z\s]+$/.test(name)) return "Name must contain only letters";
      if (name.trim().length < 2) return "Name must be at least 2 characters";
      return "";
    };

    const validateMobile = (phone: string | undefined) => {
        if (!phone) return "Mobile number is required";
        const parsed = parsePhoneNumber(phone);
        if (!parsed || !parsed.isValid()) {
            return "Enter a valid mobile number";
        }
        return "";
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSignupEmail(value);
      if (!value) {
        setEmailError("Email is required");
      } else if (!/^\S+@\S+\.\S+$/.test(value)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSignupName(value);
      setNameError(validateName(value));
    };

    const handlePhoneInput = (value: Value | undefined) => {
        setPhoneNumber(value);
        if (value) {
            setMobileError(validateMobile(value));
        } else {
            setMobileError("Mobile number is required");
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSignupPassword(value);
      setPasswordError(validatePassword(value));
      if (signupConfirmPass && value !== signupConfirmPass) {
        setConfirmError("Passwords do not match");
      } else {
        setConfirmError("");
      }
    };

    const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSignupConfirmPass(value);
      if (signupPassword !== value) {
        setConfirmError("Passwords do not match");
      } else {
        setConfirmError("");
      }
    };

    const handleSubmit = useCallback(async () => {
      const nameErr = validateName(signupName);
      const mobileErr = validateMobile(phoneNumber);
      
      setNameError(nameErr);
      setMobileError(mobileErr);

      if (
        !signupName ||
        !signupEmail ||
        !signupPassword ||
        !signupConfirmPass ||
        !phoneNumber 
      ) {
        setFieldsError("Please fill in all fields");
        return;
      } else if (!privacyChecked) {
        setFieldsError("You must agree to the Privacy Policy to sign up.");
        return;
      } else {
        setFieldsError("");
      }
      
      if (nameErr || mobileErr || emailError || passwordError || confirmError) {
        return;
      }

      setLoading(true);
      try {
        const parsed = parsePhoneNumber(phoneNumber);
        const countryCode = parsed ? `+${parsed.countryCallingCode}` : "+91";
        const nationalNumber = parsed ? parsed.nationalNumber : "";

        await onSignup(
          signupName,
          signupEmail,
          countryCode,
          nationalNumber,
          signupPassword,
          signupConfirmPass
        );
        
        setSignupName("");
        setSignupEmail("");
        setSignupPassword("");
        setSignupConfirmPass("");
        setPhoneNumber(undefined);
      } catch {
      } finally {
        setLoading(false);
      }
    }, [
      privacyChecked,
      signupName,
      signupEmail,
      phoneNumber,
      signupPassword,
      signupConfirmPass,
      emailError,
      passwordError,
      confirmError,
      onSignup,
    ]);

    const handleSocialLogin = async (
      provider: "google" | "apple" | "facebook"
    ) => {
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: `${window.location.origin}/api/auth/callback`,
          },
        });

        if (error) {
          setLocalPopup({
            message: `Login with ${provider} failed. Please try again.`,
            type: "error",
          });
        }
      } catch {
        setLocalPopup({
          message: "Something went wrong during login. Please try again.",
          type: "error",
        });
      }
    };

    return (
      <div
        className="fixed inset-0 backdrop-blur-sm z-[100] flex items-center justify-center"
        onClick={onClose}
      >
        <div
          className="relative bg-white rounded-xl shadow-2xl w-[90%] sm:w-[80%] max-w-[900px] h-auto sm:h-[500px] md:h-[600px] flex overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {localPopup && (
            <Popup
              message={localPopup.message}
              type={localPopup.type}
              onClose={() => setLocalPopup(null)}
            />
          )}
          <button
            onClick={onClose}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 w-8 sm:w-10 h-8 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"
          >
            <X className="w-4 sm:w-5 h-4 sm:h-5 text-red-500" />
          </button>

          <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
            <div className="absolute inset-0">
              <KoursairImage
                src="https://koursair-media.s3.us-east-1.amazonaws.com/images/others/hero/signup.jpg"
                alt="Background"
                fill
                className="object-cover object-center"
                loading="eager"
                fetchPriority="high"
                sizes="50vw"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30 pointer-events-none" />

            <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-12 text-white flex flex-col justify-center h-full">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 md:mb-12">
                Begin Your Next Adventure
              </h2>

              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">Exclusive Member Discounts</h3>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">24/7 Travel Support</h3>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">Earn Rewards on Every Trip</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center">
            <div className="max-w-sm mx-auto w-full">
              <p className="text-base sm:text-xl font-medium text-gray-700 mb-1 sm:mb-2 text-center">
                Join Koursair & start your adventures
              </p>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3 text-center text-black">
                Create Account
              </h3>

              <div className="flex justify-center space-x-3 sm:space-x-4">
                <button
                  onClick={() => handleSocialLogin("google")}
                  className="w-7 sm:w-8 h-7 sm:h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-110"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="36" height="42">
                    <path fill="#EA4335" d="M24 9.5c3.3 0 6.3 1.1 8.6 3.2l6.4-6.4C34.5 2.4 29.7 0 24 0 14.7 0 6.6 5.7 2.7 14l7.9 6.1C12.3 13.5 17.7 9.5 24 9.5z" />
                    <path fill="#34A853" d="M46.5 24.5c0-1.7-.2-3.3-.5-4.9H24v9.4h12.6c-.6 3.2-2.3 6-4.9 7.9l7.6 5.8C43.7 38.1 46.5 31.9 46.5 24.5z" />
                    <path fill="#FBBC05" d="M10.5 29.3a14.5 14.5 0 0 1 0-10.6L2.7 12.6A23.7 23.7 0 0 0 0 24a23.7 23.7 0 0 0 2.7 11.4l7.8-6.1z" />
                    <path fill="#4285F4" d="M24 48c6.4 0 11.8-2.1 15.7-5.7l-7.6-5.8c-2.1 1.5-4.8 2.4-8.1 2.4-6.2 0-11.5-4-13.5-9.6l-7.8 6.1C6.6 42.3 14.7 48 24 48z" />
                  </svg>
                </button>

                <button
                  onClick={() => handleSocialLogin("apple")}
                  className="w-6 sm:w-7 h-6 sm:h-7 bg-white text-white rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                >
                  <svg width="36" height="42" viewBox="0 0 36 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M24.2991 6.7051C25.8301 4.9306 26.8622 2.45909 26.5797 1.14441e-05C24.3734 0.0840122 21.7041 1.40943 20.1221 3.18183C18.7014 4.75472 17.4613 7.26796 17.7947 9.67876C20.2559 9.86144 22.768 8.48167 24.2991 6.7051ZM29.8181 22.3127C29.8797 28.6694 35.6366 30.7839 35.7003 30.8112C35.6536 30.9603 34.7808 33.8242 32.6679 36.7852C30.8395 39.343 28.9432 41.8904 25.9554 41.945C23.0207 41.9975 22.0757 40.2777 18.7184 40.2777C15.3633 40.2777 14.3142 41.8902 11.5367 41.9973C8.6529 42.1002 6.45504 39.23 4.61394 36.6806C0.8468 31.4663 -2.03058 21.9454 1.83425 15.5194C3.75392 12.3295 7.18341 10.3065 10.9081 10.2561C13.7388 10.2036 16.4123 12.0813 18.143 12.0813C19.8736 12.0813 23.1226 9.82376 26.5373 10.1556C27.9664 10.2123 31.9799 10.7077 34.5557 14.3218C34.3476 14.4457 29.7672 16.9997 29.8181 22.3127Z" fill="black" />
                  </svg>
                </button>
              </div>

              <div className="relative my-2 sm:my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs sm:text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="space-y-2 sm:space-y-1 mb-2 sm:mb-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={signupName}
                  onChange={handleNameChange}
                  className="w-full px-1 sm:px-2 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm sm:text-base"
                  disabled={loading}
                />
                {nameError && (
                  <div className="text-xs text-red-600 mt-0.5">{nameError}</div>
                )}
                
                <PhoneInput
                  value={phoneNumber}
                  onChange={handlePhoneInput}
                  international
                  defaultCountry={defaultCountry}
                  countryCallingCodeEditable={false}
                  disabled={loading}
                  placeholder="Mobile Number"
                  className={`flex w-full p-2 rounded-lg text-sm outline-none bg-white transition-all ${
                    mobileError
                      ? "border border-red-500 ring-1 ring-red-500"
                      : "border border-gray-400 focus-within:ring-2 focus-within:ring-black"
                  }`}
                  numberInputProps={{
                    className: "border-none outline-none focus:outline-none focus:ring-0 w-full h-full ml-2 bg-transparent",
                  }}
                />

                {mobileError && (
                  <div className="text-xs text-red-600 mt-0.5">
                    {mobileError}
                  </div>
                )}
                <input
                  type="email"
                  placeholder="Email Address"
                  value={signupEmail}
                  onChange={handleEmailChange}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm sm:text-base"
                  disabled={loading}
                />
                {emailError && (
                  <div className="text-xs text-red-600 mt-0.5">{emailError}</div>
                )}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create Password"
                    value={signupPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm sm:text-base pr-10"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                    tabIndex={-1}
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
                {passwordError && (
                  <div className="text-xs text-red-600 mt-0.5">
                    {passwordError}
                  </div>
                )}
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={signupConfirmPass}
                    onChange={handleConfirmChange}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm sm:text-base pr-10"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                    tabIndex={-1}
                    onClick={() => setShowConfirmPassword((v) => !v)}
                  >
                    {showConfirmPassword ? (
                      <Eye size={18} />
                    ) : (
                      <EyeOff size={18} />
                    )}
                  </button>
                </div>
                {confirmError && (
                  <div className="text-xs text-red-600 mt-0.5">
                    {confirmError}
                  </div>
                )}
              </div>
              <div className="flex items-start my-2">
                <input
                  type="checkbox"
                  className="mt-1 text-xl items-center"
                  id="privacyPolicy"
                  checked={!!privacyChecked}
                  onChange={(e) => setPrivacyChecked(e.target.checked)}
                  disabled={loading}
                />
                <p className="text-xs sm:text-sm text-gray-500 text-center ml-2">
                  By proceeding, you agree to Koursair&apos;s{" "}
                  <a
                    href="/info/privacy-policy"
                    className="text-black hover:underline"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
              {!privacyChecked && fieldsError && (
                <div className="text-xs text-red-600 mt-0.5">{fieldsError}</div>
              )}
              {fieldsError && privacyChecked && (
                <div className="text-xs text-red-600 mt-0.5">{fieldsError}</div>
              )}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full px-3 sm:px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-300 text-sm sm:text-base disabled:opacity-50"
              >
                {loading ? "CREATING ACCOUNT..." : "Sign Up"}
              </button>
            </div>

            <div className="text-center mb-2 sm:mb-4">
              <span className="text-xs sm:text-sm text-gray-600">
                Already have an account?{" "}
              </span>
              <button
                onClick={switchToLogin}
                className="text-xs sm:text-sm text-black hover:underline"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

SignupModal.displayName = "SignupModal";

// --- ForgotPasswordModal Component (Updated to simulate email send confirmation) ---
const ForgotPasswordModal = memo(
  ({
    onClose,
    onForgotPassword,
    switchToLogin,
    switchToSignup,
  }: {
    onClose: () => void;
    onForgotPassword: (email: string) => Promise<void>;
    switchToLogin: () => void;
    switchToSignup: () => void;
  }) => {
    const [forgotEmail, setForgotEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false); // New state for confirmation
    const [localPopup, setLocalPopup] = useState<LocalPopup | null>(null);

    const handleSubmit = useCallback(async () => {
      if (!forgotEmail) {
        setLocalPopup({ message: "Please enter your email", type: "error" });
        return;
      }
      setLoading(true);
      try {
        await onForgotPassword(forgotEmail);
        setEmailSent(true);
      } catch {
        // Error handled in context
      } finally {
        setLoading(false);
      }
    }, [forgotEmail, onForgotPassword]);

    return (
      <div
        className="fixed inset-0 backdrop-blur-sm z-[100] flex items-center justify-center"
        onClick={onClose}
      >
        <div
          className="relative bg-white rounded-xl shadow-2xl w-[90%] sm:w-[80%] max-w-[900px] h-auto sm:h-[500px] md:h-[600px] flex overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {localPopup && (
            <Popup
              message={localPopup.message}
              type={localPopup.type}
              onClose={() => setLocalPopup(null)}
            />
          )}
          <button
            onClick={onClose}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 w-8 sm:w-10 h-8 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"
          >
            <X className="w-4 sm:w-5 h-4 sm:h-5 text-red-500" />
          </button>

          {/* Left Side - Features */}
          <div className="hidden md:flex md:w-1/2 bg-cover bg-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30" />
            <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-12 text-white flex flex-col justify-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 md:mb-12">
                Sign up/Login now to
              </h2>

              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 sm:w-6 h-5 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">
                      Explore Handpicked Destinations
                    </h3>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 sm:w-6 h-5 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">
                      Customize Your Travel Journey
                    </h3>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 sm:w-6 h-5 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">
                      Get Insider Deals & Priority Access
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Reset Password Form/Confirmation */}
          <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center">
            <div className="max-w-sm mx-auto w-full">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-center text-black">
                Reset Password
              </h3>

              {!emailSent ? (
                <>
                  <h2 className="text-base sm:text-xl font-medium text-gray-700 mb-1 sm:mb-2 text-center">
                    Enter your email address and we&apos;ll send you a link to
                    reset your password
                  </h2>
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm sm:text-base"
                      onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                      disabled={loading}
                    />
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-300 text-sm sm:text-base disabled:opacity-50"
                    >
                      {loading ? "SENDING..." : "SEND RESET LINK"}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center p-4 sm:p-6  rounded-lg border ">
                  <Mail className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-green-700 mb-2">
                    Email Sent!
                  </h4>
                  <p className="text-sm text-gray-600">
                    We&apos;ve sent a password reset link to **{forgotEmail}**.
                    Please check your inbox and spam folder to continue.
                  </p>
                </div>
              )}

              <div className="text-center mb-4 sm:mb-6 space-y-2 sm:space-y-3 mt-4">
                <div>
                  <span className="text-xs sm:text-sm text-gray-700 font-extralight">
                    Remember your password?{" "}
                  </span>
                  <button
                    onClick={switchToLogin}
                    className="text-xs sm:text-sm text-black underline hover:cursor-pointer"
                  >
                    Back to Sign In
                  </button>
                </div>
                <div>
                  <span className="text-xs sm:text-sm text-gray-700 font-extralight">
                    Don&apos;t have an account?{" "}
                  </span>
                  <button
                    onClick={switchToSignup}
                    className="text-xs sm:text-sm text-black underline hover:cursor-pointer"
                  >
                    Create New Account
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-500 text-center mt-6 sm:mt-8">
                By proceeding, you agree to Koursair&apos;s{" "}
                <a
                  href="/info/privacy-policy"
                  className="text-black hover:underline"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
ForgotPasswordModal.displayName = "ForgotPasswordModal";

export const AuthModals = () => {
  const showLoginModal = useUIStore((s) => s.showLoginModal);
  const showSignupModal = useUIStore((s) => s.showSignupModal);
  const showForgotPasswordModal = useUIStore((s) => s.showForgotPasswordModal);
  const showOTPEmailModal = useUIStore((s) => s.showOTPEmailModal);
  const showCreateNewPasswordModal = useUIStore((s) => s.showCreateNewPasswordModal);
  const closeModals = useUIStore((s) => s.closeModals);
  const switchToLogin = useUIStore((s) => s.switchToLogin);
  const switchToSignup = useUIStore((s) => s.switchToSignup);
  const switchToForgotPassword = useUIStore((s) => s.switchToForgotPassword);
  const switchToOTPEmail = useUIStore((s) => s.switchToOTPEmail);

  const login = useAuthStore((s) => s.login);
  const signup = useAuthStore((s) => s.signup);
  const forgotPassword = useAuthStore((s) => s.forgotPassword);
  const requestOtp = useAuthStore((s) => s.requestOtp);
  const signInWithOtp = useAuthStore((s) => s.signInWithOtp);
  const resetPasswordFromLink = useAuthStore((s) => s.resetPasswordFromLink);

  return (
    <>
      {showLoginModal && (
        <LoginModal
          onClose={closeModals}
          onLogin={login}
          switchToSignup={switchToSignup}
          switchToForgotPassword={switchToForgotPassword}
          switchToOTPEmail={switchToOTPEmail}
        />
      )}
      {showOTPEmailModal && (
        <OTPEmailModal
          onClose={closeModals}
          requestOtp={requestOtp}
          signInWithOtp={signInWithOtp}
          switchToLogin={switchToLogin}
          switchToSignup={switchToSignup}
        />
      )}
      {showSignupModal && (
        <SignupModal
          onClose={closeModals}
          onSignup={signup}
          switchToLogin={switchToLogin}
        />
      )}
      {showForgotPasswordModal && (
        <ForgotPasswordModal
          onClose={closeModals}
          onForgotPassword={forgotPassword}
          switchToLogin={switchToLogin}
          switchToSignup={switchToSignup}
        />
      )}
      {showCreateNewPasswordModal && (
        <CreateNewPasswordModal
          onClose={closeModals}
          onResetPassword={resetPasswordFromLink}
          switchToLogin={switchToLogin}
        />
      )}
    </>
  );
};
