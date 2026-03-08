import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import ScholarshipsPage from './pages/ScholarshipsPage.jsx';
import JobsPage from './pages/JobsPage.jsx';
import HowToApplyPage from './pages/HowToApplyPage.jsx';
import ResourcesPage from './pages/ResourcesPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import { Toaster } from './components/ui/toaster.jsx';
import { LocaleProvider } from './contexts/LocaleContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import AdminLayout from './admin/AdminLayout.jsx';
import Login from './admin/Login.jsx';
import ProtectedRoute from './admin/ProtectedRoute.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';
import AddScholarship from './admin/AddScholarship.jsx';
import AddJob from './admin/AddJob.jsx';
import ManagePosts from './admin/ManagePosts.jsx';
import ResourcesAdmin from './admin/ResourcesAdmin.jsx';
import ServicesAdmin from './admin/ServicesAdmin.jsx';
import MessagesAdmin from './admin/MessagesAdmin.jsx';
import ContactSettings from './admin/ContactSettings.jsx';
import ContactMessages from './admin/ContactMessages.jsx';
import PortfolioAdmin from './admin/PortfolioAdmin.jsx';
import ReviewsAdmin from './admin/ReviewsAdmin.jsx';
import { logoutUser } from './admin/utils.js';
import ResetPassword from './admin/ResetPassword.jsx';

function App() {
  const handleLogout = () => {
    logoutUser();
    window.location.href = '/admin/login';
  };
  return (
    <Router>
      <ThemeProvider>
        <LocaleProvider>
          <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
            <ScrollToTop />
            <Header />
            <main className="flex-grow">
          <Routes>
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout onLogout={handleLogout}>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/add-scholarship" element={
              <ProtectedRoute>
                <AdminLayout onLogout={handleLogout}>
                  <AddScholarship />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/add-job" element={
              <ProtectedRoute>
                <AdminLayout onLogout={handleLogout}>
                  <AddJob />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/manage-posts" element={
              <ProtectedRoute>
                <AdminLayout onLogout={handleLogout}>
                  <ManagePosts />
                </AdminLayout>
              </ProtectedRoute>
            } />
              <Route path="/admin/reset-password" element={<ResetPassword />} />
            <Route path="/admin/resources" element={
              <ProtectedRoute>
                <AdminLayout onLogout={handleLogout}>
                  <ResourcesAdmin />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/services" element={
              <ProtectedRoute>
                <AdminLayout onLogout={handleLogout}>
                  <ServicesAdmin />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/portfolio" element={
              <ProtectedRoute>
                <AdminLayout onLogout={handleLogout}>
                  <PortfolioAdmin />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/reviews" element={
              <ProtectedRoute>
                <AdminLayout onLogout={handleLogout}>
                  <ReviewsAdmin />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/contact-settings" element={
              <ProtectedRoute>
                <AdminLayout onLogout={handleLogout}>
                  <ContactSettings />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/contact-messages" element={
              <ProtectedRoute>
                <AdminLayout onLogout={handleLogout}>
                  <ContactMessages />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/messages" element={
              <ProtectedRoute>
                <AdminLayout onLogout={handleLogout}>
                  <MessagesAdmin />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/scholarships" element={<ScholarshipsPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/how-to-apply" element={<HowToApplyPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
        </LocaleProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;