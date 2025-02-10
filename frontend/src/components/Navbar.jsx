import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    return (
        <>
            <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                                <span className="text-lg font-bold text-white">Q</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900">QHN</span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center space-x-6">
                            {!isLoggedIn && (
                                <>
                                    <Link to="/login">
                                        <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link to="/signup">
                                        <Button className="bg-green-600 hover:bg-green-700">Get Started</Button>
                                    </Link>
                                </>
                            )}
                        </div>

                        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden py-4 border-t animate-in slide-in-from-top">
                            <div className="space-y-2">
                                {!isLoggedIn && (
                                    <>
                                        <Link to="/login" className="block">
                                            <Button variant="ghost" className="w-full justify-start">Sign In</Button>
                                        </Link>
                                        <Link to="/signup" className="block">
                                            <Button className="w-full bg-green-600 hover:bg-green-700">Get Started</Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
