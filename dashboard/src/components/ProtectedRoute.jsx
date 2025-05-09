import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUser, clearAllUserErrors } from '../store/slices/userSlice';
import SpecialLoadingButton from '../pages/sub-components/SpecialLoadingButton';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      dispatch(getUser());
    }
  }, [dispatch, isAuthenticated, loading]);

  useEffect(() => {
    if (error) {
      dispatch(clearAllUserErrors());
    }
  }, [dispatch, error]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <SpecialLoadingButton />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
