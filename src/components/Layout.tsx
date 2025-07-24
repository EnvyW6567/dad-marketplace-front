import {Link} from 'react-router-dom'
import {SearchBar} from './search-bar/SearchBar'
import React from "react";
import {CurrencyTicker} from "./currency-ticker/CurrencyTicker.tsx";

interface LayoutProps {
    children: React.ReactNode
}

export const Layout = ({children}: LayoutProps) => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Fixed Navigation Bar */}
            <nav
                data-testid="navbar"
                className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        className="flex flex-col md:flex-row items-center justify-between h-auto md:h-16 py-4 md:py-0 gap-4 md:gap-0">
                        {/* Logo */}
                        <div className="flex items-center order-1">
                            <Link
                                to="/"
                                className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
                            >
                                Highroller Market
                            </Link>
                        </div>

                        {/* Search Bar - Center */}
                        <div className="flex flex-1 justify-center order-3 md:order-2 w-full md:w-auto">
                            <SearchBar className="w-full md:w-auto"/>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex items-center space-x-6 order-2 md:order-3">
                            <Link
                                to="/"
                                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                            >
                                홈
                            </Link>
                            <Link
                                to="/my-items"
                                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                            >
                                마이페이지
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Fixed Currency Ticker */}
            <div className="fixed top-16 md:top-16 left-0 right-0 z-40">
                <CurrencyTicker/>
            </div>

            {/* Main Content - Padding top to account for fixed header */}
            <main data-testid="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-40 md:pt-36">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <p className="text-gray-400">
                            © 2025 Dad Marketplace. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}