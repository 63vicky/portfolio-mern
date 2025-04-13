import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './store/slices/userSlice';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ManageSkills from './pages/ManageSkills';
import ManageTimeline from './pages/ManageTimeline';
import ManageProjects from './pages/ManageProjects';
import ViewProject from './pages/ViewProject';
import UpdateProject from './pages/UpdateProject';
import { getAllMessages } from './store/slices/messagesSlice';
import SpecialLoadingButton from './pages/sub-components/SpecialLoadingButton';
import { getAllTimeline } from './store/slices/timelineSlice';
import { getAllSkills } from './store/slices/skillSlice';
import { getAllApplications } from './store/slices/applicationSlice';
import { getAllProjects } from './store/slices/projectSlice';

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getAllMessages());
    dispatch(getAllTimeline());
    dispatch(getAllSkills());
    dispatch(getAllApplications());
    dispatch(getAllProjects());
  }, [dispatch]);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <SpecialLoadingButton />
      </div>
    );
  }
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage/skills"
            element={
              <ProtectedRoute>
                <ManageSkills />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage/timeline"
            element={
              <ProtectedRoute>
                <ManageTimeline />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage/projects"
            element={
              <ProtectedRoute>
                <ManageProjects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view/project/:id"
            element={
              <ProtectedRoute>
                <ViewProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update/project/:id"
            element={
              <ProtectedRoute>
                <UpdateProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={<Navigate to="/" replace />}
            replace="true"
          />
        </Routes>
        <ToastContainer position="bottom-right" theme="dark" />
      </Router>
    </>
  );
}

export default App;
