"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  User,
  Menu,
  ChevronDown,
  X,
} from "lucide-react";

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const pathname = usePathname();

  type NavSubItem = {
    label: string;
    href: string;
    submenu?: NavSubItem[];
  };

  type NavItem = {
    label: string;
    href: string;
    submenu?: NavSubItem[];
  };

  const navItems: NavItem[] = [
    { label: "About Us", href: "/about" },
    { label: "Destinations", href: "/destinations" },
    { label: "Groups", href: "/groups" },
    { label: "Your Bookings", href: "/bookings" },
    { label: "Support", href: "/support" },
  ];

  const handleMouseEnter = (index: number) => setActiveDropdown(index);
  const handleMouseLeave = () => setActiveDropdown(null);
  const isCurrentPath = (href: string) => pathname === href;

  const handleLoginSubmit = () => {
    //console.log("Login:", { email, password });
    // Add login logic here
  };

  const handleSignupSubmit = () => {
    //console.log("Signup:", { signupName, signupEmail, signupPassword });
    // Add signup logic here
  };

  const handleForgotPasswordSubmit = () => {
    //console.log("Forgot Password:", { email });
    // Add forgot password logic here
  };

  const switchToSignup = () => {
    setShowLoginModal(false);
    setShowForgotPasswordModal(false);
    setShowSignupModal(true);
  };

  const switchToLogin = () => {
    setShowSignupModal(false);
    setShowForgotPasswordModal(false);
    setShowLoginModal(true);
  };

  const switchToForgotPassword = () => {
    setShowLoginModal(false);
    setShowForgotPasswordModal(true);
  };

  return (
    <>
      <nav className="sticky top-0 left-0 right-0 z-50 bg-[#aa7755] shadow-md">
        <div className="relative items-center justify-items-center justify-between">
          <div className=" max-w-[1350px] h-20 mx-auto px-4"> 
            <div className="flex items-center justify-between h-full"> 
              {/* Left Section */}
              <div className="flex items-center h-full">
                {/* Logo - Adjusted Image height */}
                <div className="mr-8 lg:mr-15">
                  <Link href="/" className="flex items-center h-full">
                    <Image src="/logo.png" alt="Koursair Logo" width={180} height={100} className="w-51 h-17 object-cover" /> {/* Reduced size here */}
                  </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:block h-full mr-8 ">
                  <ul className="flex items-center justify-center m-0 p-0 list-none h-full">
                    {navItems.map((item, index) => (
                      <li
                        key={index}
                        className="relative" // Removed py-3
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <Link
                          href={item.href}
                          className={`nav-link flex items-center px-5 py-2 text-lg font-normal transition-colors duration-300 hover:text-[#F4EFE7] text-white ${ // Reduced py-3 to py-2
                            isCurrentPath(item.href) ? "text-[#c49c7a]" : ""
                          }`}
                        >
                          {item.label}
                          {item.submenu && (
                            <ChevronDown className="ml-1 w-3 h-3" />
                          )}
                        </Link>

                        {/* Dropdown */}
                        {item.submenu && activeDropdown === index && (
                          <div className="absolute left-0 top-full mt-0 w-60 bg-white shadow-lg rounded-lg overflow-hidden">
                            <ul className="py-2">
                              {item.submenu.map((subItem, subIndex) => (
                                <li key={subIndex} className="relative">
                                  <Link
                                    href={subItem.href}
                                    className={`block px-6 py-2 text-sm transition-colors duration-300 hover:bg-[#faf5ee] hover:text-[#c49c7a] text-[#6b5d52] ${
                                      subIndex > 0
                                        ? "border-t border-gray-100"
                                        : ""
                                    }`}
                                  >
                                    {subItem.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden text-white text-xl ml-5"
                >
                  {mobileMenuOpen ? <X /> : <Menu />}
                </button>
              </div>

              {/* Right Icons */}
              <div className="flex items-center py-0 h-full"> {/* Removed py-6 and added h-full */}
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xl transition-all duration-300 hover:bg-white/30"
                > {/* Reduced button size from w-12/h-12 to w-8/h-8 */}
                  <Search className="w-6 h-6" /> {/* Reduced icon size from w-5/h-5 to w-4/h-4 */}
                </a>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xl ml-2.5 transition-all duration-300 hover:bg-white/30"
                > {/* Reduced button size from w-12/h-12 to w-8/h-8 */}
                  <User className="w-6 h-6" /> {/* Reduced icon size from w-5/h-5 to w-4/h-4 */}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/80 backdrop-blur-md shadow-lg z-50">
            <ul className="py-4">
              {navItems.map((item, index) => (
                <li key={index} className="border-b border-gray-100">
                  <Link
                    href={item.href}
                    className={`block px-6 py-3 text-base font-medium ${
                      isCurrentPath(item.href)
                        ? "text-[#c49c7a]"
                        : "text-[#6b5d52]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Login Modal (omitted for brevity, no changes required) */}
      {showLoginModal && (
        <>
          {/* Modal Overlay */}
          <div
            className="fixed inset-0 backdrop-blur-sm z-[100] flex items-center justify-center"
            onClick={() => setShowLoginModal(false)}
          >
            {/* Modal Content */}
            <div
              className="relative bg-white rounded-xl shadow-2xl w-[90%] sm:w-[80%] max-w-[900px] h-auto sm:h-[500px] md:h-[600px] flex overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 w-8 sm:w-10 h-8 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"
              >
                <X className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600" />
              </button>

              {/* Left Side - Features */}
              <div className="hidden md:flex md:w-1/2 bg-cover bg-center relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021')] bg-cover bg-center"
                />
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
                          Lock Flight Prices & Pay Later
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
                          Book Hotels
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
                          Get 3X refund, if your waitlisted train doesn&apos;t
                          get confirmed
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Login Form */}
              <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                <div className="max-w-sm mx-auto w-full">
                  <h2 className="text-base sm:text-xl font-medium text-gray-700 mb-1 sm:mb-2 text-center">
                    Sign in to continue your travel journey
                  </h2>

                  <h3
                    className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-center text-[#c49c7a]"
                  >
                    Login
                  </h3>

                  {/* Login Form */}
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-400 text-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c49c7a] transition-all text-sm sm:text-base"
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleLoginSubmit()
                      }
                    />

                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-400 text-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c49c7a] transition-all text-sm sm:text-base"
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleLoginSubmit()
                      }
                    />

                    <button
                      onClick={handleLoginSubmit}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#c49c7a] text-white font-semibold rounded-lg hover:bg-[#a0927e] transition-colors duration-300 text-sm sm:text-base"
                    >
                      CONTINUE
                    </button>
                  </div>

                  {/* Links */}
                  <div className="text-center mb-4 sm:mb-6">
                    <button
                      onClick={switchToForgotPassword}
                      className="text-xs sm:text-sm text-[#c49c7a] hover:underline"
                    >
                      Forgot Username or Password?
                    </button>
                    <span className="text-gray-400 mx-2">|</span>
                    <button
                      onClick={switchToSignup}
                      className="text-xs sm:text-sm text-[#c49c7a] hover:underline"
                    >
                      Create New Account
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="relative mb-4 sm:mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-xs sm:text-sm">
                      <span className="px-4 bg-white text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  {/* Social Login */}
                  <div className="flex justify-center space-x-3 sm:space-x-4">
                    <button className="w-6 sm:w-8 h-6 sm:h-8 bg-white text-white rounded-full flex items-center justify-center transition-all transform hover:scale-110">
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

                    <button className="w-6 sm:w-7 h-6 sm:h-7 bg-white text-white rounded-full flex items-center justify-center transition-all transform hover:scale-110">
                      <svg
                        width="43"
                        height="42"
                        viewBox="0 0 43 42"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.1824 -1.52588e-05C9.58608 -1.52588e-05 0.0981445 9.46684 0.0981445 21.1265C0.0981445 31.6687 7.815 40.4186 17.8933 42V27.2409H12.5379V21.1265H17.8933V16.4668C17.8933 11.1747 21.0349 8.26503 25.8632 8.26503C28.1614 8.26503 30.565 8.66563 30.565 8.66563V13.8735H27.9083C25.2939 13.8735 24.4716 15.4969 24.4716 17.1627V21.1265H30.333L29.3842 27.2409H24.4716V42C29.4399 41.2152 33.9642 38.6802 37.2274 34.8524C40.4906 31.0247 42.2781 26.1564 42.2668 21.1265C42.2668 9.46684 32.7788 -1.52588e-05 21.1824 -1.52588e-05Z"
                          fill="black"
                        />
                      </svg>
                    </button>

                    <button className="w-6 sm:w-7 h-6 sm:h-7 bg-white text-white rounded-full flex items-center justify-center transition-all transform hover:scale-110">
                      <svg
                        width="43"
                        height="42"
                        viewBox="0 0 43 42"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M21.0981 32.4545C27.4243 32.4545 32.5526 27.3262 32.5526 21C32.5526 14.6738 27.4243 9.54546 21.0981 9.54546C14.7719 9.54546 9.64355 14.6738 9.64355 21C13.4617 25.2174 16.8807 28.6364 21.0981 28.6364ZM21.0981 28.6364C25.3155 28.6364 28.7345 25.2174 28.7345 21C28.7345 16.7826 25.3155 13.3636 21.0981 13.3636C16.8807 13.3636 13.4617 16.7826 13.4617 21C13.4617 25.2174 16.8807 28.6364 21.0981 28.6364Z"
                          fill="#0F0F0F"
                        />
                        <path
                          d="M32.5525 7.63638C31.4981 7.63638 30.6434 8.49112 30.6434 9.54547C30.6434 10.5998 31.4981 11.4546 32.5525 11.4546C33.6069 11.4546 34.4616 10.5998 34.4616 9.54547C34.4616 8.49112 33.6069 7.63638 32.5525 7.63638Z"
                          fill="#0F0F0F"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.34661 6.25428C0.0981445 8.70454 0.0981445 11.9121 0.0981445 18.3273V23.6727C0.0981445 30.0878 0.0981445 33.2955 1.34661 35.7456C2.4448 37.901 4.19712 39.6533 6.35244 40.7514C8.8027 42 12.0103 42 18.4254 42H23.7709C30.186 42 33.3936 42 35.8438 40.7514C37.9991 39.6533 39.7515 37.901 40.8496 35.7456C42.0981 33.2955 42.0981 30.0878 42.0981 23.6727V18.3273C42.0981 11.9121 42.0981 8.70454 40.8496 6.25428C39.7515 4.09896 37.9991 2.34664 35.8438 1.24845C33.3936 -1.52588e-05 30.186 -1.52588e-05 23.7709 -1.52588e-05H18.4254C12.0103 -1.52588e-05 8.8027 -1.52588e-05 6.35244 1.24845C4.19712 2.34664 2.4448 4.09896 1.34661 6.25428ZM23.7709 3.81817H18.4254C15.1548 3.81817 12.9315 3.82114 11.213 3.96154C9.53906 4.09831 8.68302 4.3462 8.08586 4.65047C6.64898 5.38261 5.48077 6.55082 4.74863 7.9877C4.44436 8.58486 4.19647 9.4409 4.0597 11.1149C3.9193 12.8334 3.91633 15.0567 3.91633 18.3273V23.6727C3.91633 26.9434 3.9193 29.1665 4.0597 30.8851C4.19647 32.5591 4.44436 33.4152 4.74863 34.0123C5.48077 35.4491 6.64898 36.6173 8.08586 37.3494C8.68302 37.6537 9.53906 37.9017 11.213 38.0384C12.9315 38.1787 15.1548 38.1818 18.4254 38.1818H23.7709C27.0415 38.1818 29.2647 38.1787 30.9832 38.0384C32.6573 37.9017 33.5133 37.6537 34.1105 37.3494C35.5473 36.6173 36.7155 35.4491 37.4476 34.0123C37.7519 33.4152 37.9999 32.5591 38.1366 30.8851C38.2769 29.1665 38.28 26.9434 38.28 23.6727V18.3273C38.28 15.0567 38.2769 12.8334 38.1366 11.1149C37.9999 9.4409 37.7519 8.58486 37.4476 7.9877C36.7155 6.55082 35.5473 5.38261 34.1105 4.65047C33.5133 4.3462 32.6573 4.09831 30.9832 3.96154C29.2647 3.82114 27.0415 3.81817 23.7709 3.81817Z"
                          fill="#0F0F0F"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Terms */}
                  <p className="text-xs sm:text-sm text-gray-500 text-center mt-6 sm:mt-8">
                    By proceeding, you agree to Koursair&apos;s{" "}
                    <a
                      href="/info/privacy-policy"
                      className="text-[#c49c7a] hover:underline"
                    >
                      Privacy Policy
                    </a>
                    ,{" "}
                    <a href="#" className="text-[#c49c7a] hover:underline">
                      User Agreement
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[#c49c7a] hover:underline">
                      T&Cs
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Signup Modal (omitted for brevity, no changes required) */}
      {showSignupModal && (
        <>
          {/* Modal Overlay */}
          <div
            className="fixed inset-0 backdrop-blur-sm z-[100] flex items-center justify-center"
            onClick={() => setShowSignupModal(false)}
          >
            {/* Modal Content */}
            <div
              className="relative bg-white rounded-xl shadow-2xl w-[90%] sm:w-[80%] max-w-[900px] h-auto sm:h-[500px] md:h-[600px] flex overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowSignupModal(false)}
                className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 w-8 sm:w-10 h-8 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"
              >
                <X className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600" />
              </button>

              {/* Left Side - Features */}
              <div className="hidden md:flex md:w-1/2 bg-cover bg-center relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2035')] bg-cover bg-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30" />

                <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-12 text-white flex flex-col justify-center">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 md:mb-12">
                    Start Your Journey Today
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
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg">
                          Exclusive Member Discounts
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
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg">
                          24/7 Travel Support
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
                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg">
                          Earn Rewards on Every Trip
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Signup Form */}
              <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                <div className="max-w-sm mx-auto w-full">
                  <p className="text-base sm:text-xl font-medium text-gray-700 mb-1 sm:mb-2 text-center">
                    Join Koursair & start your adventures
                  </p>

                  <h3
                    className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-center text-[#c49c7a]"
                  >
                    Create Account
                  </h3>

                  {/* Signup Form */}
                  <div className="space-y-3 sm:space-y-4 mb-3 sm:mb-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-400 text-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c49c7a] transition-all text-sm sm:text-base"
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSignupSubmit()
                      }
                    />

                    <input
                      type="email"
                      placeholder="Email Address"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-400 text-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c49c7a] transition-all text-sm sm:text-base"
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSignupSubmit()
                      }
                    />

                    <input
                      type="password"
                      placeholder="Create Password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-400 text-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c49c7a] transition-all text-sm sm:text-base"
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSignupSubmit()
                      }
                    />

                    <button
                      onClick={handleSignupSubmit}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#c49c7a] text-white font-semibold rounded-lg hover:bg-[#a0927e] transition-colors duration-300 text-sm sm:text-base"
                    >
                      Sign Up
                    </button>
                  </div>

                  {/* Links */}
                  <div className="text-center mb-3 sm:mb-4">
                    <span className="text-xs sm:text-sm text-gray-600">
                      Already have an account?{" "}
                    </span>
                    <button
                      onClick={switchToLogin}
                      className="text-xs sm:text-sm text-[#c49c7a] hover:underline"
                    >
                      Sign In
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="relative mb-4 sm:mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-xs sm:text-sm">
                      <span className="px-4 bg-white text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  {/* Social Login */}
                  <div className="flex justify-center space-x-3 sm:space-x-4">
                    <button className="w-5 sm:w-6 h-5 sm:h-6 bg-white text-white rounded-full flex items-center justify-center transition-all transform hover:scale-110">
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

                    <button className="w-6 sm:w-7 h-6 sm:h-7 bg-white text-white rounded-full flex items-center justify-center transition-all transform hover:scale-110">
                      <svg
                        width="43"
                        height="42"
                        viewBox="0 0 43 42"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.1824 -1.52588e-05C9.58608 -1.52588e-05 0.0981445 9.46684 0.0981445 21.1265C0.0981445 31.6687 7.815 40.4186 17.8933 42V27.2409H12.5379V21.1265H17.8933V16.4668C17.8933 11.1747 21.0349 8.26503 25.8632 8.26503C28.1614 8.26503 30.565 8.66563 30.565 8.66563V13.8735H27.9083C25.2939 13.8735 24.4716 15.4969 24.4716 17.1627V21.1265H30.333L29.3842 27.2409H24.4716V42C29.4399 41.2152 33.9642 38.6802 37.2274 34.8524C40.4906 31.0247 42.2781 26.1564 42.2668 21.1265C42.2668 9.46684 32.7788 -1.52588e-05 21.1824 -1.52588e-05Z"
                          fill="black"
                        />
                      </svg>
                    </button>

                    <button className="w-6 sm:w-7 h-6 sm:h-7 bg-white text-white rounded-full flex items-center justify-center transition-all transform hover:scale-110">
                      <svg
                        width="43"
                        height="42"
                        viewBox="0 0 43 42"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M21.0981 32.4545C27.4243 32.4545 32.5526 27.3262 32.5526 21C32.5526 14.6738 27.4243 9.54546 21.0981 9.54546C14.7719 9.54546 9.64355 14.6738 9.64355 21C13.4617 25.2174 16.8807 28.6364 21.0981 28.6364ZM21.0981 28.6364C25.3155 28.6364 28.7345 25.2174 28.7345 21C28.7345 16.7826 25.3155 13.3636 21.0981 13.3636C16.8807 13.3636 13.4617 16.7826 13.4617 21C13.4617 25.2174 16.8807 28.6364 21.0981 28.6364Z"
                          fill="#0F0F0F"
                        />
                        <path
                          d="M32.5525 7.63638C31.4981 7.63638 30.6434 8.49112 30.6434 9.54547C30.6434 10.5998 31.4981 11.4546 32.5525 11.4546C33.6069 11.4546 34.4616 10.5998 34.4616 9.54547C34.4616 8.49112 33.6069 7.63638 32.5525 7.63638Z"
                          fill="#0F0F0F"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.34661 6.25428C0.0981445 8.70454 0.0981445 11.9121 0.0981445 18.3273V23.6727C0.0981445 30.0878 0.0981445 33.2955 1.34661 35.7456C2.4448 37.901 4.19712 39.6533 6.35244 40.7514C8.8027 42 12.0103 42 18.4254 42H23.7709C30.186 42 33.3936 42 35.8438 40.7514C37.9991 39.6533 39.7515 37.901 40.8496 35.7456C42.0981 33.2955 42.0981 30.0878 42.0981 23.6727V18.3273C42.0981 11.9121 42.0981 8.70454 40.8496 6.25428C39.7515 4.09896 37.9991 2.34664 35.8438 1.24845C33.3936 -1.52588e-05 30.186 -1.52588e-05 23.7709 -1.52588e-05H18.4254C12.0103 -1.52588e-05 8.8027 -1.52588e-05 6.35244 1.24845C4.19712 2.34664 2.4448 4.09896 1.34661 6.25428ZM23.7709 3.81817H18.4254C15.1548 3.81817 12.9315 3.82114 11.213 3.96154C9.53906 4.09831 8.68302 4.3462 8.08586 4.65047C6.64898 5.38261 5.48077 6.55082 4.74863 7.9877C4.44436 8.58486 4.19647 9.4409 4.0597 11.1149C3.9193 12.8334 3.91633 15.0567 3.91633 18.3273V23.6727C3.91633 26.9434 3.9193 29.1665 4.0597 30.8851C4.19647 32.5591 4.44436 33.4152 4.74863 34.0123C5.48077 35.4491 6.64898 36.6173 8.08586 37.3494C8.68302 37.6537 9.53906 37.9017 11.213 38.0384C12.9315 38.1787 15.1548 38.1818 18.4254 38.1818H23.7709C27.0415 38.1818 29.2647 38.1787 30.9832 38.0384C32.6573 37.9017 33.5133 37.6537 34.1105 37.3494C35.5473 36.6173 36.7155 35.4491 37.4476 34.0123C37.7519 33.4152 37.9999 32.5591 38.1366 30.8851C38.2769 29.1665 38.28 26.9434 38.28 23.6727V18.3273C38.28 15.0567 38.2769 12.8334 38.1366 11.1149C37.9999 9.4409 37.7519 8.58486 37.4476 7.9877C36.7155 6.55082 35.5473 5.38261 34.1105 4.65047C33.5133 4.3462 32.6573 4.09831 30.9832 3.96154C29.2647 3.82114 27.0415 3.81817 23.7709 3.81817Z"
                          fill="#0F0F0F"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Terms */}
                  <p className="text-xs sm:text-sm text-gray-500 text-center mt-6 sm:mt-8">
                    By proceeding, you agree to Koursair&apos;s{" "}
                    <a href="#" className="text-[#c49c7a] hover:underline">
                      Privacy Policy
                    </a>
                    ,{" "}
                    <a href="#" className="text-[#c49c7a] hover:underline">
                      User Agreement
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[#c49c7a] hover:underline">
                      T&Cs
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Forgot Password Modal (omitted for brevity, no changes required) */}
      {showForgotPasswordModal && (
        <>
          {/* Modal Overlay */}
          <div
            className="fixed inset-0 backdrop-blur-sm z-[100] flex items-center justify-center"
            onClick={() => setShowForgotPasswordModal(false)}
          >
            {/* Modal Content */}
            <div
              className="relative bg-white rounded-xl shadow-2xl w-[90%] sm:w-[80%] max-w-[900px] h-auto sm:h-[500px] md:h-[600px] flex overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowForgotPasswordModal(false)}
                className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 w-8 sm:w-10 h-8 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"
              >
                <X className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600" />
              </button>

              {/* Left Side - Features */}
              <div className="hidden md:flex md:w-1/2 bg-cover bg-center relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021')] bg-cover bg-center"
                />
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
                          Lock Flight Prices & Pay Later
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
                          Book Hotels @ ₹0
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
                          Get 3X refund, if your waitlisted train doesn&apos;t
                          get confirmed
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Forgot Password Form */}
              <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                <div className="max-w-sm mx-auto w-full">
                  <h2 className="text-base sm:text-xl font-medium text-gray-700 mb-1 sm:mb-2 text-center">
                    Enter your email address and we&apos;ll send you a link to
                    reset your password
                  </h2>

                  <h3
                    className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-center text-[#c49c7a]"
                  >
                    Reset Password
                  </h3>

                  {/* Forgot Password Form */}
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-400 text-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c49c7a] transition-all text-sm sm:text-base"
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleForgotPasswordSubmit()
                      }
                    />

                    <button
                      onClick={handleForgotPasswordSubmit}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#c49c7a] text-white font-semibold rounded-lg hover:bg-[#a0927e] transition-colors duration-300 text-sm sm:text-base"
                    >
                      SEND RESET LINK
                    </button>
                  </div>

                  {/* Links */}
                  <div className="text-center mb-4 sm:mb-6 space-y-2 sm:space-y-3">
                    <div>
                      <span className="text-xs sm:text-sm text-[#a0927eda] font-extralight">
                        Remember your password?{" "}
                      </span>
                      <button
                        onClick={switchToLogin}
                        className="text-xs sm:text-sm text-[#c49c7a] underline hover:cursor-pointer"
                      >
                        Back to Sign In
                      </button>
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm text-[#a0927eda] font-extralight">
                        Don&apos;t have an account?
                      </span>
                      <button
                        onClick={switchToSignup}
                        className="text-xs sm:text-sm text-[#c49c7a] underline hover:cursor-pointer"
                      >
                        Create New Account
                      </button>
                    </div>
                  </div>

                  {/* Terms */}
                  <p className="text-xs sm:text-sm text-gray-500 text-center mt-6 sm:mt-8">
                    By proceeding, you agree to Koursair&apos;s{" "}
                    <a href="#" className="text-[#c49c7a] hover:underline">
                      Privacy Policy
                    </a>
                    ,{" "}
                    <a href="#" className="text-[#c49c7a] hover:underline">
                      User Agreement
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[#c49c7a] hover:underline">
                      T&Cs
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Styles for nav-link underline */}
      <style jsx>{`
        .nav-link {
          position: relative;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background-color: #c49c7a;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          transform: scaleX(1);
          transform-origin: left;
        }
      `}</style>
    </>
  );
}