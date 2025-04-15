'use client';

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  User,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slices/userSlice';
import { toast } from 'react-toastify';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useEffect } from 'react';
import { getUnreadCount } from '@/store/slices/messagesSlice';

export function NavUser({ setActive, active }) {
  const { isMobile } = useSidebar();
  const { user } = useSelector((state) => state.user);
  const { unreadCount } = useSelector((state) => state.messages);
  const dispatch = useDispatch();

  // Fetch unread count on mount and every 30 seconds
  useEffect(() => {
    dispatch(getUnreadCount());
    const interval = setInterval(() => {
      dispatch(getUnreadCount());
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logout successfully.');
  };

  return (
    <SidebarMenu>
      {/*  */}
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={user && user.avatar && user.avatar.url}
                  alt={user.fullName}
                />
                <AvatarFallback className="rounded-lg">
                  {user.fullName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.fullName}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user && user.avatar && user.avatar.url}
                    alt={user.name}
                  />
                  <AvatarFallback className="rounded-lg">
                    {user.fullName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.fullName}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <TooltipProvider>
                <Link
                  className={`flex !w-full items-center rounded-lg ${
                    active === 'Account'
                      ? 'text-accent-foreground bg-accent'
                      : 'text-muted-foreground'
                  }  transition-colors hover:text-foreground`}
                  onClick={() => setActive('Account')}
                >
                  <DropdownMenuItem className="w-full p-0">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton>
                          <BadgeCheck />
                          <span className="flex items-center gap-2">
                            Account
                          </span>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent side="right">Account</TooltipContent>
                    </Tooltip>
                  </DropdownMenuItem>
                </Link>
              </TooltipProvider>
              <TooltipProvider>
                <Link
                  className={`flex !w-full items-center rounded-lg ${
                    active === 'Messages'
                      ? 'text-accent-foreground bg-accent'
                      : 'text-muted-foreground'
                  }  transition-colors hover:text-foreground`}
                  onClick={() => {
                    setActive('Messages');
                  }}
                >
                  <DropdownMenuItem className="w-full p-0">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton>
                          <Bell />
                          <span className="flex items-center gap-2">
                            Notifications
                            {unreadCount > 0 && (
                              <Badge
                                variant="destructive"
                                className="ml-auto text-[10px] h-5 px-2"
                              >
                                {unreadCount}
                              </Badge>
                            )}
                          </span>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        Notifications {unreadCount > 0 && `(${unreadCount})`}
                      </TooltipContent>
                    </Tooltip>
                  </DropdownMenuItem>
                </Link>
              </TooltipProvider>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className={'p-0'}>
              <Link
                className="flex items-center justify-center rounded-lg transition-colors hover:text-foreground w-full p-2"
                onClick={handleLogout}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="flex items-center gap-2 w-full">
                        <LogOut className="h-5 w-5" />
                        Logout
                      </p>
                    </TooltipTrigger>
                    <TooltipContent side="right">Logout</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
