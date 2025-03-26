/* eslint-disable react-hooks/exhaustive-deps */
import { forgotPassword } from '@/store/slices/forgotResetPasswordSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SpecialLoadingButton from './sub-components/SpecialLoadingButton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import formBack from '../assets/formBack.jpg';

const ForgotPassword = ({ className, ...props }) => {
  const [email, setEmail] = useState('');
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );

  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error('Please enter your email address.');
      return;
    }
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isAuthenticated) {
      navigateTo('/');
    }
    if (message !== null) {
      toast.success(message);
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
                    <h1 className="text-2xl font-bold">Forgot Password</h1>
                    <p className="text-balance text-muted-foreground">
                      Enter your email to request for reset password
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Link
                        to={'/login'}
                        className="ml-auto text-sm underline-offset-2 hover:underline"
                      >
                        Remember your password?
                      </Link>
                    </div>
                  </div>
                  {loading ? (
                    <SpecialLoadingButton content={'Requesting...'} />
                  ) : (
                    <Button
                      type="submit"
                      className="w-full cursor-pointer"
                      onClick={handleForgotPassword}
                    >
                      Request For Reset Password
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

export default ForgotPassword;
