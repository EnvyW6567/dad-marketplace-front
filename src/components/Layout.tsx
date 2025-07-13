import React from 'react'
import {Link} from 'react-router-dom'
import {useAuthStore} from '../store/auth.store'

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    const {isAuthenticated, user, login, logout} = useAuthStore()


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link to="/" className="text-xl font-bold text-gray-900">
                                Highroller Market
                            </Link>
                        </div>

                        {/* Navigation */}
                        <nav className="hidden md:flex space-x-8">
                            <Link
                                to="/"
                                className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                            >
                                홈
                            </Link>
                            <Link
                                to="/register"
                                className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                            >
                                아이템 등록
                            </Link>
                            <Link
                                to="/my-items"
                                className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                            >
                                마이 페이지
                            </Link>
                        </nav>

                        {/* User Menu */}
                        <div className="flex items-center space-x-4">
                            {isAuthenticated && user ? (
                                <div className="flex items-center space-x-3">
                                    {/* User Avatar */}
                                    <img
                                        src={user.avatarUrl}
                                        alt="User Avatar"
                                        className="h-8 w-8 rounded-full"
                                    />
                                    {/* User Name */}
                                    <span className="text-sm font-medium text-gray-700">
                    {user.displayName || user.username}
                  </span>
                                    {/* Logout Button */}
                                    <button
                                        onClick={logout}
                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium"
                                    >
                                        로그아웃
                                    </button>
                                </div>
                            ) : (
                                /* Login Button */
                                <button
                                    onClick={login}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
                                >
                                    디스코드 로그인
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    )
}

export default Layout