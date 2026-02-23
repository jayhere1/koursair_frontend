"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { User, Menu, ChevronDown, X, LogOut, CalendarCheck } from "lucide-react";
import { useAuth } from "./AuthContext";

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const { isAuthenticated, user, openLogin, logout } = useAuth();

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
    { label: "Destinations", href: "/destinations", 
      submenu: [
        { label: "Kenya", href: "/tour/Kenya" },
        { label: "Dubai", href: "/tour/Dubai" },
        { label: "Thailand", href: "/tour/Thailand" },
        { label: "India", href: "/tour/India" },
        { label: "Bali", href: "/tour/Bali" },
        { label: "Tahiti", href: "/tour/Tahiti" },

      ],
    },
    {
      label: "Trips",
      href: "/trips",
      submenu: [
        { label: "Group", href: "/groups" },
        { label: "Solo", href: "/solo" },
      ],
    },
    //{ label: "Your Bookings", href: "/your_bookings" },
    { label: "Reviews", href: "/reviews" },
    { label: "Talk to Us", href: "/support" },
  ];

  const handleMouseEnter = (index: number) => setActiveDropdown(index);
  const handleMouseLeave = () => setActiveDropdown(null);
  const isCurrentPath = (href: string) => pathname === href;

  return (
    <nav className="sticky top-0 left-0 right-0 z-40 bg-white shadow-md">
      <div className="relative items-center justify-items-center justify-between">
        <div className="max-w-[1350px] h-20 mx-auto px-4">
          <div className="flex items-center justify-between h-full">
            {/* Left Section */}
            <div className="flex items-center h-full">
              {/* Logo */}
              <div className="mr-8 lg:mr-15">
                <Link href="/" className="flex items-center h-full">
                  <Image
                    src="/logo.png"
                    alt="Koursair Logo"
                    width={180}
                    height={100}
                    className="w-40 h-[52px] md:w-52 md:h-[68px] object-cover"
                  />
                </Link>
              </div>

              {/* Desktop Menu */}
              <div className="hidden lg:block h-full mr-8">
                <ul className="flex items-center justify-center m-0 p-0 list-none h-full">
                  {navItems.map((item, index) => (
                    <li
                      key={index}
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {item.label === "Trips" ? (
                        <span className="nav-link flex items-center px-5 py-2 text-lg font-medium transition-colors duration-300 hover:text-[#363636] text-[#1b3658] cursor-pointer">
                          {item.label}
                          {item.submenu && <ChevronDown className="ml-1 w-3 h-3" />}
                        </span>
                      ) : (
                        <Link
                          href={item.href}
                          className={`nav-link flex items-center px-5 py-2 text-lg font-medium transition-colors duration-300 hover:text-[#363636] text-[#1b3658] ${
                            isCurrentPath(item.href) ? "text-gray-800" : ""
                          }`}
                        >
                          {item.label}
                          {item.submenu && <ChevronDown className="ml-1 w-3 h-3" />}
                        </Link>
                      )}

                      {/* Dropdown */}
                      {item.submenu && activeDropdown === index && (
                        <div className="absolute left-0 top-full mt-1 w-60 z-50 bg-white shadow-lg rounded-lg overflow-hidden">
                          <ul className="py-2">
                            {item.submenu.map((subItem, subIndex) => (
                              <li key={subIndex} className="relative">
                                <Link
                                  href={subItem.href}
                                  className={`block px-6 py-2 text-sm transition-colors font-medium duration-300 hover:bg-[#e1e1e1] hover:text-gray-800 text-[#1b3658] ${
                                    subIndex > 0 ? "border-t border-gray-100" : ""
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
                className="lg:hidden text-black text-xl ml-5"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>

            {/* Right Icons */}
            <div className="flex items-center py-0 h-full gap-4">
              
              
              <Link 
                href="https://calendar.app.google/6nuswsY8qfkSYnyXA" target="_blank" rel="noopener noreferrer"
                className="hidden xl:flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#1b3658] rounded-full hover:bg-[#2a456b] transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Free Consultation</span>
              </Link>

              {isAuthenticated ? (
                <div className="relative group">
                  <button className="w-10 h-10 rounded-full bg-black/10 backdrop-blur-sm flex items-center justify-center cursor-pointer text-blue-500 hover:text-white text-xl transition-all duration-300 hover:bg-black/30">
                    <User className="w-6 h-6" />
                  </button>
                  
                  {/* User Dropdown */}
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-3 border-b border-gray-200">
                      <p className="font-semibold text-gray-800 break-words">{user?.name}</p>
                      <p className="text-xs text-gray-500 break-words">{user?.email}</p>
                    </div>
                    <ul className="py-2">
                      <li>
                        <Link href="/your_bookings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Bookings</Link>
                      </li>
                      <li>
                        <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center">
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <button
                  onClick={openLogin}
                  className="w-10 h-10 rounded-full bg-black/10 backdrop-blur-sm flex items-center justify-center text-blue-500 hover:text-white text-xl transition-all cursor-pointer duration-300 hover:bg-black/30"
                >
                  <User className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white/90 backdrop-blur-md shadow-lg z-50 max-h-[90vh] overflow-y-auto">
          <ul className="py-4">
            {navItems.map((item, index) => (
              <li key={index} className="border-b border-gray-100">
                {item.submenu ? (
                  <>
                    <button
                      onClick={() =>
                        setActiveDropdown(activeDropdown === index ? null : index)
                      }
                      className="w-full flex items-center justify-between px-6 py-3 text-base font-medium text-black"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`ml-2 w-4 h-4 transition-transform duration-300 ${
                          activeDropdown === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {activeDropdown === index && (
                      <ul className="bg-white/70">
                        {item.submenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              href={subItem.href}
                              className="block px-8 py-2 text-base text-gray-800 hover:bg-gray-300"
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`block px-6 py-3 text-base font-medium ${
                      isCurrentPath(item.href) ? "text-gray-800" : "text-black"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            
            {/* Mobile Consultation Button */}
            <li className="p-6">
               <Link 
                href="https://calendar.app.google/6nuswsY8qfkSYnyXA" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 text-base font-bold text-white bg-[#1b3658] rounded-full hover:bg-[#2a456b] transition-all duration-300 shadow-md"
              >
                <CalendarCheck className="w-5 h-5" />
                <span>Book Free Consultation</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}