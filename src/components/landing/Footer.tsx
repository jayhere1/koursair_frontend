"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useUIStore } from "@/stores";
import { Facebook, Instagram, Smartphone, Mail } from "lucide-react";


export default function FooterSection() {
  const openLogin = useUIStore((s) => s.openLogin);
  const openSignup = useUIStore((s) => s.openSignup);

  return (
    <>

      <footer className="bg-[#212b3d] text-white">
        <div className="max-w-[1400px] mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-lg font-semibold">KOURSAIR</span>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                At Koursair, we reinvent group travel by combining unbeatable
                value with unforgettable destinations. We curate high-energy,
                stylish trips to the world&apos;s most iconic locations — all
                designed for those who crave connection, adventure, and
                effortless planning.
              </p>

              <div className="pt-4">
                <p className="text-sm font-medium mb-3">FOLLOW US</p>
                <div className="flex space-x-3">
                  <Link
                    href="https://www.facebook.com/profile.php?id=61583460718504"
                    className="social-icon text-gray-400 hover:text-white"
                  >
                    <Facebook size={20} />
                  </Link>
                  <Link
                    href="https://www.instagram.com/koursair/"
                    className="social-icon text-gray-400 hover:text-white"
                  >
                    <Instagram size={20} />
                  </Link>
                  <Link
                    href="https://wa.me/18005214263"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon text-gray-400 hover:text-white"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Useful Links */}
            <div>
              <h3 className="text-base font-semibold mb-4">Useful links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="footer-link text-gray-400 text-sm hover:text-white"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <button
                    onClick={openLogin}
                    className="footer-link text-gray-400 text-sm hover:text-white"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={openSignup}
                    className="footer-link text-gray-400 text-sm hover:text-white"
                  >
                    Register
                  </button>
                </li>
                <li>
                  <Link
                    href="/news-insights"
                    className="footer-link text-gray-400 text-sm hover:text-white"
                  >
                    News & Events
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-base font-semibold mb-4">Contact with Us</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-gray-400">
                  <Smartphone size={18} />
                  <span className="text-sm">1-800-521-4263</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Mail size={18} />
                  <span className="text-sm">info@koursair.com</span>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Language and Payment */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 text-sm">USD</span>
                </div>

                {/* Payment Methods */}
                <div className="flex items-center space-x-3">
                  <div className="bg-white rounded px-2 py-1">
                    <Image
                      width={50}
                      height={300}
                      src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                      alt="PayPal"
                      className="h-4 w-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Footer Links */}
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <a href="/info/terms-and-conditions" className="footer-link hover:text-white">
                  Terms and conditions
                </a>
                <span className="text-gray-600">|</span>
                <a
                  href="/info/privacy-policy"
                  className="footer-link hover:text-white"
                >
                  Privacy Policy
                </a>
                <span className="text-gray-600">|</span>
                <span>© Koursair</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
