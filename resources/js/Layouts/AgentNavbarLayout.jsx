import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function NavbarLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile); // default open for desktop
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!sidebarOpen || !isMobile) return;
    const handleOutsideClick = (e) => {
      if (!e.target.closest('#sidebar') && !e.target.closest('.toggle-btn')) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [sidebarOpen, isMobile]);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const navLinks = [
    { href: '/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
    { href: '/profile', icon: 'bi-person', label: 'Profile' },
    { href: '/settings', icon: 'bi-gear', label: 'Settings' },
    { href: '/agent/property', icon: 'bi-house', label: 'Property' },
  ];

  return (
    <div className="layout-wrapper">
      {/* Sidebar */}
      <nav
        id="sidebar"
        className={`bg-white border-end shadow-sm vh-100 d-flex flex-column
          ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
      >
        <div className="d-flex align-items-center justify-content-start p-3 border-bottom position-relative">
          <Link href="/" className="navbar-brand fw-bold fs-4 text-primary text-truncate" title="Home">
            {sidebarOpen ? 'MyApp' : 'MA'}
          </Link>
          {!isMobile && (
            <button onClick={toggleSidebar} className="toggle-btn" type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="none"
                stroke="#0d6efd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: sidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}
        </div>

        {/* Nav Links */}
        <ul className="nav nav-pills flex-column flex-grow-1 px-2 pt-3 gap-1">
          {navLinks.map(({ href, icon, label }) => (
            <li key={href} className="nav-item">
              <Link
                href={href}
                className="nav-link d-flex align-items-center rounded px-3 py-2"
                onClick={() => { if (isMobile) setSidebarOpen(false); }}
                title={!sidebarOpen ? label : undefined}
              >
                <i className={`bi ${icon} me-3 fs-5`}></i>
                {sidebarOpen && label}
              </Link>
            </li>
          ))}
          <li className="nav-item mt-auto">
            <Link
              href="/logout"
              method="post"
              as="button"
              className="nav-link d-flex align-items-center rounded px-3 py-2 text-danger"
              onClick={() => { if (isMobile) setSidebarOpen(false); }}
              title={!sidebarOpen ? 'Logout' : undefined}
            >
              <i className="bi bi-box-arrow-right me-3 fs-5"></i>
              {sidebarOpen && 'Logout'}
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Hamburger */}
      {isMobile && !sidebarOpen && (
        <button onClick={toggleSidebar} className="toggle-btn mobile-hamburger" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
            fill="none" stroke="#0d6efd" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      )}

      {/* Overlay */}
      {isMobile && sidebarOpen && (
        <div className="position-fixed top-0 start-0 vw-100 vh-100"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 1040 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="main-content">
        <div className="container-fluid py-3">
          {children}
        </div>
      </main>

      {/* Styles */}
      <style>{`
        .layout-wrapper {
          display: flex;
          height: 100vh;
          overflow: hidden;
        }
        #sidebar {
          transition: width 0.3s ease, transform 0.3s ease;
          flex-shrink: 0;
        }
        .sidebar-open {
          width: 240px;
        }
        .sidebar-closed {
          width: 60px;
        }
        @media (max-width: 767px) {
          #sidebar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            width: 240px;
            transform: translateX(-100%);
            z-index: 1050;
          }
          #sidebar.sidebar-open {
            transform: translateX(0);
          }
        }
        .main-content {
          flex-grow: 1;
          overflow-y: auto;
          background-color: #f8f9fa;
        }
        .toggle-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .mobile-hamburger {
          position: fixed;
          top: 12px;
          left: 12px;
          background-color: white;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          z-index: 1100;
        }
        .nav-link:hover {
          background-color: #e7f1ff;
          color: #0d6efd !important;
        }
      `}</style>
    </div>
  );
}
