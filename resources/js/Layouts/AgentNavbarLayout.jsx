import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function NavbarLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
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

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const navLinks = [
    { href: '/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
    { href: '/profile', icon: 'bi-person', label: 'Profile' },
    { href: '/settings', icon: 'bi-gear', label: 'Settings' },
    { href: '/agent/property', icon: 'bi-house', label: 'Property' },
  ];

  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* Sidebar */}
      <nav
        id="sidebar"
        className={`bg-white border-end shadow-sm position-fixed top-0 start-0 vh-100 d-flex flex-column
          ${sidebarOpen ? 'w-sidebar-open' : 'w-sidebar-closed'}`}
        style={{
          transition: 'transform 0.3s ease, width 0.3s',
          zIndex: 1050,
          // On mobile, hide sidebar by shifting left when closed
          transform: isMobile
            ? sidebarOpen
              ? 'translateX(0)'
              : 'translateX(-100%)'
            : 'translateX(0)',
          width: isMobile ? 240 : sidebarOpen ? 240 : 60,
          minWidth: isMobile ? 240 : sidebarOpen ? 240 : 60,
          maxWidth: isMobile ? 240 : sidebarOpen ? 240 : 60,
        }}
      >
        <div className="d-flex align-items-center justify-content-start p-3 border-bottom position-relative">
          <Link href="/" className="navbar-brand fw-bold fs-4 text-primary text-truncate" title="Home">
            {sidebarOpen ? 'MyApp' : 'MA'}
          </Link>

          {/* Toggle button for desktop only */}
          {!isMobile && (
            <button
              onClick={toggleSidebar}
              aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
              className="toggle-btn"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="#0d6efd"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                style={{
                  transform: sidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s',
                  display: 'block',
                }}
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}
        </div>

        {/* Nav links vertical */}
        <ul className="nav nav-pills flex-column flex-grow-1 px-2 pt-3 gap-1">
          {navLinks.map(({ href, icon, label }) => (
            <li key={href} className="nav-item">
              <Link
                href={href}
                className="nav-link d-flex align-items-center rounded px-3 py-2"
                onClick={() => {
                  if (isMobile) setSidebarOpen(false);
                }}
                title={!sidebarOpen ? label : undefined}
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  transition: 'background-color 0.15s',
                }}
              >
                <i className={`bi ${icon} me-3 fs-5 flex-shrink-0`}></i>
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
              onClick={() => {
                if (isMobile) setSidebarOpen(false);
              }}
              title={!sidebarOpen ? 'Logout' : undefined}
            >
              <i className="bi bi-box-arrow-right me-3 fs-5 flex-shrink-0"></i>
              {sidebarOpen && 'Logout'}
            </Link>
          </li>
        </ul>
      </nav>

      {/* Hamburger button for mobile/tablet (only visible when sidebar is closed) */}
      {isMobile && !sidebarOpen && (
        <button
          onClick={toggleSidebar}
          aria-label="Open sidebar"
          className="toggle-btn mobile-hamburger"
          type="button"
        >
          {/* Hamburger icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="none"
            stroke="#0d6efd"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      )}

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && sidebarOpen && (
        <div
          className="position-fixed top-0 start-0 vw-100 vh-100"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 1040 }}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <main
        className="container-fluid"
        style={{
          marginLeft: isMobile ? 0 : sidebarOpen ? 240 : 60,
          transition: 'margin-left 0.3s',
          paddingTop: '1rem',
          paddingBottom: '1rem',
          overflowX: 'hidden',
        }}
      >
        {children}
      </main>

      {/* Styles */}
      <style>{`
        .w-sidebar-open {
          width: 240px !important;
          min-width: 240px;
          max-width: 240px;
        }
        .w-sidebar-closed {
          width: 60px !important;
          min-width: 60px;
          max-width: 60px;
        }
        /* Hover effect for nav links */
        .nav-link:hover {
          background-color: #e7f1ff;
          color: #0d6efd !important;
        }
        /* Tooltip styling for collapsed sidebar */
        nav#sidebar [title]:hover::after {
          content: attr(title);
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          background-color: #0d6efd;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          white-space: nowrap;
          font-size: 0.875rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          margin-left: 8px;
          pointer-events: none;
          z-index: 1060;
        }
        /* Toggle button styles */
        .toggle-btn {
          position: absolute;
          top: 12px;
          left: 100%;
          margin-left: 8px;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
          transition: left 0.3s;
          z-index: 1100;
        }
        /* Desktop toggle button */
        @media (min-width: 768px) {
          .toggle-btn {
            position: absolute;
            top: 12px;
            left: 100%;
            margin-left: 8px;
            background: none;
            border-radius: 50%;
            box-shadow: 0 0 5px rgb(0 0 0 / 0.1);
            padding: 4px;
          }
        }
        /* Mobile hamburger button (fixed position) */
        .mobile-hamburger {
          position: fixed !important;
          top: 12px;
          left: 12px;
          margin-left: 0;
          background-color: white;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgb(0 0 0 / 0.15);
          padding: 4px;
        }
        .toggle-btn:hover svg {
          stroke: #084298; /* Darker blue on hover */
        }
      `}</style>
    </div>
  );
}
