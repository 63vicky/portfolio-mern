import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import {
  clearAllForgotPasswordErrors,
  resetPassword,
} from '@/store/slices/forgotResetPasswordSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SpecialLoadingButton from './sub-components/SpecialLoadingButton';
import formBack from '../assets/formBack.jpg';
import { getUser } from '@/store/slices/userSlice';

const ResetPassword = ({ className, ...props }) => {
  const { token } = useParams();
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );

  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleResetPassword = () => {
    dispatch(resetPassword(token, password, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotPasswordErrors());
    }
    if (isAuthenticated) {
      navigateTo('/');
    }
    if (message !== null) {
      toast.success(message);
      dispatch(getUser());
    }
  }, [dispatch, isAuthenticated, error, loading]);
  return (
    <>
      <div className="flex min-h-dvh h-full flex-col items-center justify-center bg-muted">
        <div className={cn('flex flex-col gap-6 w-full', className)} {...props}>
          <Card className="overflow-hidden p-0 rounded-none border-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <div className="p-6 md:p-8 max-w-[30rem] mx-auto h-dvh flex flex-col justify-between">
                <div className="flex flex-col gap-6 justify-center h-full">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Reset Password</h1>
                    <p className="text-balance text-muted-foreground">
                      Set a new password
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  {loading ? (
                    <SpecialLoadingButton content={'Resetting...'} />
                  ) : (
                    <Button
                      type="submit"
                      className="w-full cursor-pointer"
                      onClick={handleResetPassword}
                    >
                      Reset Password
                    </Button>
                  )}
                </div>
                <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                  By clicking continue, you agree to our{' '}
                  <a href="#">Terms of Service</a> and{' '}
                  <a href="#">Privacy Policy</a>.
                </div>
              </div>
              <div className="relative hidden bg-muted md:block h-dvh">
                <img
                  src={formBack}
                  alt="Image"
                  className="absolute inset-0 w-full h-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
