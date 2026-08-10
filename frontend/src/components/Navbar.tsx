import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Sun, Moon, Building2, GitCompare, BookOpen, Newspaper, Menu, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FCFBF7]/90 dark:bg-[#161616]/90 backdrop-blur-md border-b border-[#E5E2DC] dark:border-[#333333] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0"
          onClick={() => setMobileMenuOpen(false)}
          >
            <img
            src="/logos/venturelens-logo.svg"
            alt="VentureLens"
            className="w-9 h-9 object-contain"
            />
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-wider uppercase text-[#222222] dark:text-[#F7F7F5] font-roboto">
                VENTURE<span className="text-[#E98B50]">LENS</span>
              </span>
              <span className="text-[10px] text-[#666666] dark:text-[#B7B7B7] tracking-widest font-medium">
                Company Intelligence Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'bg-[#FEF2A0] text-[#222222] font-semibold dark:bg-[#E98B50] dark:text-[#161616]'
                  : 'text-[#666666] hover:text-[#222222] hover:bg-[#F5F3ED] dark:text-[#B7B7B7] dark:hover:text-[#F7F7F5] dark:hover:bg-[#262626]'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Companies
            </Link>
            <Link
              to="/compare"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                isActive('/compare')
                  ? 'bg-[#FEF2A0] text-[#222222] font-semibold dark:bg-[#E98B50] dark:text-[#161616]'
                  : 'text-[#666666] hover:text-[#222222] hover:bg-[#F5F3ED] dark:text-[#B7B7B7] dark:hover:text-[#F7F7F5] dark:hover:bg-[#262626]'
              }`}
            >
              <GitCompare className="w-4 h-4" />
              Compare
            </Link>
            <Link
              to="/news"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                isActive('/news')
                  ? 'bg-[#FEF2A0] text-[#222222] font-semibold dark:bg-[#E98B50] dark:text-[#161616]'
                  : 'text-[#666666] hover:text-[#222222] hover:bg-[#F5F3ED] dark:text-[#B7B7B7] dark:hover:text-[#F7F7F5] dark:hover:bg-[#262626]'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              Latest News
            </Link>
            <Link
              to="/methodology"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                isActive('/methodology')
                  ? 'bg-[#FEF2A0] text-[#222222] font-semibold dark:bg-[#E98B50] dark:text-[#161616]'
                  : 'text-[#666666] hover:text-[#222222] hover:bg-[#F5F3ED] dark:text-[#B7B7B7] dark:hover:text-[#F7F7F5] dark:hover:bg-[#262626]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Methodology
            </Link>
          </nav>

          {/* Right Controls: Search + Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search companies, founders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-56 pl-8 pr-3 py-1.5 text-xs rounded-md bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] text-[#222222] dark:text-[#F7F7F5] placeholder-[#666666] dark:placeholder-[#B7B7B7] focus:outline-none focus:border-[#E98B50] dark:focus:border-[#E98B50] transition-colors"
              />
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#666666] dark:text-[#B7B7B7]" />
            </form>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-md bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] text-[#222222] dark:text-[#F7F7F5] hover:border-[#E98B50] transition-colors"
              aria-label="Toggle light and dark mode"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-[#222222]" />
              ) : (
                <Sun className="w-4 h-4 text-[#FEF2A0]" />
              )}
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-md bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] text-[#222222] dark:text-[#F7F7F5]"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-[#FEF2A0]" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-md bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] text-[#222222] dark:text-[#F7F7F5]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E5E2DC] dark:border-[#333333] bg-[#FCFBF7] dark:bg-[#161616] px-4 pt-2 pb-4 space-y-2">
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              placeholder="Search companies, founders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs rounded-md bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] text-[#222222] dark:text-[#F7F7F5]"
            />
            <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-[#666666]" />
          </form>

          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-[#222222] dark:text-[#F7F7F5] hover:bg-[#F5F3ED] dark:hover:bg-[#262626]"
          >
            <Building2 className="w-4 h-4" /> Companies
          </Link>
          <Link
            to="/compare"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-[#222222] dark:text-[#F7F7F5] hover:bg-[#F5F3ED] dark:hover:bg-[#262626]"
          >
            <GitCompare className="w-4 h-4" /> Compare
          </Link>
          <Link
            to="/news"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-[#222222] dark:text-[#F7F7F5] hover:bg-[#F5F3ED] dark:hover:bg-[#262626]"
          >
            <Newspaper className="w-4 h-4" /> Latest News
          </Link>
          <Link
            to="/methodology"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-[#222222] dark:text-[#F7F7F5] hover:bg-[#F5F3ED] dark:hover:bg-[#262626]"
          >
            <BookOpen className="w-4 h-4" /> Methodology
          </Link>
        </div>
      )}
    </header>
  );
};
