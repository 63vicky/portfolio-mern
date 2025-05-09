import { Link } from 'react-router-dom';
import { useState } from 'react';
import Profile from './Profile';
import UpdateProfile from './UpdateProfile';
import UpdatePassword from './UpdatePassword';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Account = () => {
  const [selectedComponent, setSelectedComponent] = useState('Profile');
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-sidebar p-4 md:gap-8">
        <Card>
          <CardHeader className="flex gap-4 sm:flex-row sm:items-center">
            <CardTitle className="text-3xl md:justify-start flex justify-center font-semibold">
              Settings
            </CardTitle>
            <CardDescription className="w-full flex justify-center md:justify-end">
              <nav className="flex items-end gap-4 text-sm text-muted-foreground">
                <Link
                  href="#"
                  className={
                    selectedComponent === 'Profile'
                      ? 'font-semibold text-primary'
                      : ''
                  }
                  onClick={() => setSelectedComponent('Profile')}
                >
                  Profile
                </Link>
                <Link
                  href="#"
                  className={
                    selectedComponent === 'Update Profile'
                      ? 'font-semibold text-primary'
                      : ''
                  }
                  onClick={() => setSelectedComponent('Update Profile')}
                >
                  Update Profile
                </Link>
                <Link
                  href="#"
                  className={
                    selectedComponent === 'Update Password'
                      ? 'font-semibold text-primary'
                      : ''
                  }
                  onClick={() => setSelectedComponent('Update Password')}
                >
                  Update Password
                </Link>
              </nav>
            </CardDescription>
          </CardHeader>
          <CardContent className="mx-auto w-full max-w-6xl items-center justify-center flex gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
            <div className="grid gap-6">
              {(() => {
                switch (selectedComponent) {
                  case 'Profile':
                    return <Profile />;
                  case 'Update Profile':
                    return <UpdateProfile />;
                  case 'Update Password':
                    return <UpdatePassword />;
                  default:
                    return <Profile />;
                }
              })()}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Account;
