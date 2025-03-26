/* eslint-disable no-unused-vars */
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { clearAllUserErrors, login } from '@/store/slices/userSlice';
import { toast } from 'react-toastify';
import SpecialLoadingButton from './sub-components/SpecialLoadingButton';
import formBack from '../assets/formBack.jpg';
import { Eye, EyeClosedIcon, EyeIcon } from 'lucide-react';

const Login = ({ className, ...props }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { loading, isAuthenticated, error, message } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigateTo(from, { replace: true });
    }
  }, [dispatch, error, isAuthenticated, navigateTo, location]);

  return (
    <div className="flex min-h-dvh h-full flex-col items-center justify-center bg-muted">
      <div className={cn('flex flex-col gap-6 w-full', className)} {...props}>
        <Card className="overflow-hidden p-0 rounded-none border-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <div className="p-6 md:p-8 max-w-[30rem] mx-auto h-dvh flex flex-col justify-between">
              <form
                className="flex flex-col gap-6 justify-center h-full"
                onSubmit={handleLogin}
              >
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-balance text-muted-foreground">
                    Login to your Acme Inc account
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to={'/password/forgot'}
                      className="ml-auto text-sm underline-offset-2 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
                    </button>
                  </div>
                </div>
                {loading ? (
                  <SpecialLoadingButton content={'Logging in...'} />
                ) : (
                  <Button type="submit" className="w-full cursor-pointer">
                    Login
                  </Button>
                )}
              </form>
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
  );
};

export default Login;
