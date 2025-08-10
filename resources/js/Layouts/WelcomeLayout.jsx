import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            {/* 🔵 Navbar */}
            <nav className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Brand */}
                        <Link href="/" className="text-xl font-bold text-gray-800 no-underline">
                            MyApp
                        </Link>

                        {/* Toggle (Mobile) */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="text-gray-800 hover:text-blue-600 focus:outline-none"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {menuOpen ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>

                        {/* Desktop Links */}
                        <div className="hidden lg:flex space-x-4">
                            <Link
                                href="/login"
                                className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition no-underline"
                            >
                                <i className="bi bi-box-arrow-in-right mr-1"></i> Login
                            </Link>
                            <Link
                                href="/register"
                                className="inline-flex items-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md transition no-underline"
                            >
                                <i className="bi bi-person-plus mr-1"></i> Register
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="lg:hidden px-4 pt-2 pb-4 space-y-2">
                        <Link
                            href="/login"
                            className="block text-sm text-gray-700 hover:text-blue-600 no-underline"
                        >
                            <i className="bi bi-box-arrow-in-right mr-1"></i> Login
                        </Link>
                        <Link
                            href="/register"
                            className="block text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md no-underline"
                        >
                            <i className="bi bi-person-plus mr-1"></i> Register
                        </Link>
                    </div>
                )}
            </nav>

            {/* 🔵 Page Content */}
            <main className="py-8">{children}</main>
        </>
    );
}
