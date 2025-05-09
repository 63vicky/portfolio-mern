import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { clearAllUserErrors, logout } from '@/store/slices/userSlice';
import {
  FolderGit,
  History,
  Home,
  LayoutGrid,
  LogOut,
  MessageSquareMore,
  Package2,
  PanelLeft,
  PencilRuler,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Dashboard from './sub-components/Dashboard';
import Account from './sub-components/Account';
import ThemeToggle from './ThemeToggle';
import Messages from './sub-components/Messages';
import AddProject from './sub-components/AddProject';
import AddSkill from './sub-components/AddSkill';
import AddApplications from './sub-components/AddApplications';
import AddTimeline from './sub-components/AddTimeline';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

const HomePage = () => {
  const [active, setActive] = useState('Dashboard');
  const { isAuthenticated, user, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logout successfully.');
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo('/login');
    }
  }, [isAuthenticated, error, dispatch]);

  return (
    <>
      <div className="bg-muted/40 flex min-h-screen w-full flex-col">
        <SidebarProvider defaultOpen={false}>
          <AppSidebar active={active} setActive={setActive} />

          <SidebarInset>
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 py-4 sm:h-[70px] sm:px-6 max-[900px]:h-[90px]">
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="outline" className="md:hidden">
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                  <nav className="grid gap-6 text-lg font-medium p-4">
                    <Link
                      className={`group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base`}
                    >
                      <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                      <span className="sr-only">Acme Inc</span>
                    </Link>
                    <SheetTrigger asChild>
                      <Link
                        href="#"
                        className={`flex items-center gap-4 px-2.5 ${
                          active === 'Dashboard'
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground '
                        }`}
                        onClick={() => setActive('Dashboard')}
                      >
                        <Home className="h-5 w-5" />
                        Dashboard
                      </Link>
                    </SheetTrigger>
                    <SheetTrigger asChild>
                      <Link
                        className={`flex items-center gap-4 px-2.5 ${
                          active === 'Add Project'
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground '
                        }`}
                        onClick={() => setActive('Add Project')}
                      >
                        <FolderGit className="h-5 w-5" />
                        Add Project
                      </Link>
                    </SheetTrigger>
                    <SheetTrigger asChild>
                      <Link
                        className={`flex items-center gap-4 px-2.5 ${
                          active === 'Add Skill'
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground '
                        }`}
                        onClick={() => setActive('Add Skill')}
                      >
                        <PencilRuler className="h-5 w-5" />
                        Add Skill
                      </Link>
                    </SheetTrigger>
                    <SheetTrigger asChild>
                      <Link
                        className={`flex items-center gap-4 px-2.5 ${
                          active === 'Add Application'
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground '
                        }`}
                        onClick={() => setActive('Add Application')}
                      >
                        <LayoutGrid className="h-5 w-5" />
                        Add Application
                      </Link>
                    </SheetTrigger>
                    <SheetTrigger asChild>
                      <Link
                        className={`flex items-center gap-4 px-2.5 ${
                          active === 'Add Timeline'
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground '
                        }`}
                        onClick={() => setActive('Add Timeline')}
                      >
                        <History className="h-5 w-5" />
                        Add Timeline
                      </Link>
                    </SheetTrigger>

                    <SheetTrigger asChild>
                      <Link
                        className={`flex items-center gap-4 px-2.5 ${
                          active === 'Messages'
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground '
                        }`}
                        onClick={() => setActive('Messages')}
                      >
                        <MessageSquareMore className="h-5 w-5" />
                        Messages
                      </Link>
                    </SheetTrigger>

                    <SheetTrigger asChild>
                      <Link
                        className={`flex items-center gap-4 px-2.5 ${
                          active === 'Account'
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground '
                        }`}
                        onClick={() => setActive('Account')}
                      >
                        <User className="h-5 w-5" />
                        Account
                      </Link>
                    </SheetTrigger>
                    <SheetTrigger asChild>
                      <Link
                        className={
                          'flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                        }
                        onClick={handleLogout}
                      >
                        <LogOut className="h-5 w-5" />
                        Logout
                      </Link>
                    </SheetTrigger>
                  </nav>
                </SheetContent>
              </Sheet>

              <div className="flex items-center gap-4 md:grow-0 w-full">
                <img
                  src={user && user.avatar && user.avatar.url}
                  alt="avatar"
                  className="w-12 h-12 rounded-full max-[900px]:hidden"
                />
                <h1 className="text-3xl max-[900px]:text-2xl">
                  Welcome, {user.fullName}
                </h1>
                <ThemeToggle className="ml-auto" />
              </div>
            </header>
            <div className="bg-sidebar">
              {(() => {
                switch (active) {
                  case 'Dashboard':
                    return <Dashboard />;
                  case 'Add Project':
                    return <AddProject />;
                  case 'Add Skill':
                    return <AddSkill />;
                  case 'Add Application':
                    return <AddApplications />;
                  case 'Add Timeline':
                    return <AddTimeline />;
                  case 'Messages':
                    return <Messages />;
                  case 'Account':
                    return <Account />;
                  default:
                    return <Dashboard />;
                }
              })()}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </>
  );
};

export default HomePage;
