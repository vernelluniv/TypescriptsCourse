import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CourseProgressProvider } from './context/CourseProgressContext';
import { HomePage } from './pages/HomePage';
import { CourseDetail } from './pages/CourseDetail';
import { LoginPage } from './components/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { Navbar } from './components/Navbar';
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminRoute } from './components/AdminRoute';
import { CourseCompletion } from './components/CourseCompletion';
import { StudentNotification } from './components/notifications/StudentNotification';
import { useCourseProgress } from './context/CourseProgressContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function AppContent() {
  const { user } = useAuth();
  const { isAllCoursesCompleted, pendingReview } = useCourseProgress();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              {user?.role === 'admin' ? (
                <Navigate to="/dashboard" />
              ) : isAllCoursesCompleted && pendingReview ? (
                <CourseCompletion studentName={user?.profile?.fullName || user?.username || ''} />
              ) : (
                <HomePage />
              )}
            </PrivateRoute>
          }
        />
        <Route
          path="/course/:courseId"
          element={
            <PrivateRoute>
              <CourseDetail />
            </PrivateRoute>
          }
        />
      </Routes>
      {user?.role === 'student' && <StudentNotification />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CourseProgressProvider>
        <Router>
          <AppContent />
        </Router>
      </CourseProgressProvider>
    </AuthProvider>
  );
}