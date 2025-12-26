import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import BlogHome from './pages/BlogHome';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import MobileDrawer from './components/MobileDrawer';
import ErrorBoundary from './components/ErrorBoundary';
import Analytics from './components/Analytics';
import ConsentBanner from './components/ConsentBanner';
import MotionWrapper from './components/MotionWrapper';

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Topbar onOpenDrawer={() => setDrawerOpen(true)} />
      <div className="flex">
        <Sidebar />
        <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Sidebar onClose={() => setDrawerOpen(false)} />
        </MobileDrawer>

        <main className="flex-1 p-6 max-w-[var(--page-max-width)] mx-auto w-full">
          <Analytics />
          <ConsentBanner />
          <ErrorBoundary>
            <MotionWrapper>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/users" element={<Users />} />
                <Route path="/blog" element={<BlogHome />} />
                <Route path="/blog/create" element={<CreatePost />} />
                <Route path="/blog/:id" element={<PostDetail />} />
              </Routes>
            </MotionWrapper>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
