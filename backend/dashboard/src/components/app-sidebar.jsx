import * as React from 'react';
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Dot,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import { Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';
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

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUnreadCount } from '@/store/slices/messagesSlice';
import { Badge } from './ui/badge';

export function AppSidebar({ active, setActive, ...props }) {
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
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="sticky top-0 p-1 z-30 h-14 border-b bg-background sm:h-[70px] max-[900px]:h-[70px]">
        {/* <TeamSwitcher teams={data.teams} /> */}
        <SidebarTrigger className="w-full h-full p-4 text-4xl" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            <TooltipProvider>
              <Link
                className={`flex h-9 !w-full items-center rounded-lg ${
                  active === 'Dashboard'
                    ? 'text-accent-foreground bg-accent'
                    : 'text-muted-foreground'
                }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                onClick={() => setActive('Dashboard')}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton>
                      <Home className="h-5 w-5" />
                      <span className="flex items-center gap-2">Dashboard</span>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent side="right">Dashboard</TooltipContent>
                </Tooltip>
              </Link>
            </TooltipProvider>

            <TooltipProvider>
              <Link
                className={`flex h-9 !w-full items-center rounded-lg ${
                  active === 'Add Project'
                    ? 'text-accent-foreground bg-accent'
                    : 'text-muted-foreground'
                }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                onClick={() => setActive('Add Project')}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton>
                      <FolderGit className="h-5 w-5" />
                      <span className="flex items-center gap-2">
                        Add Project
                      </span>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent side="right">Add Project</TooltipContent>
                </Tooltip>
              </Link>
            </TooltipProvider>
            <TooltipProvider>
              <Link
                className={`flex h-9 !w-full items-center rounded-lg ${
                  active === 'Add Skill'
                    ? 'text-accent-foreground bg-accent'
                    : 'text-muted-foreground'
                }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                onClick={() => setActive('Add Skill')}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton>
                      <PencilRuler className="h-5 w-5" />
                      <span className="flex items-center gap-2">Add Skill</span>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent side="right">Add Skill</TooltipContent>
                </Tooltip>
              </Link>
            </TooltipProvider>
            <TooltipProvider>
              <Link
                className={`flex h-9 !w-full items-center rounded-lg ${
                  active === 'Add Application'
                    ? 'text-accent-foreground bg-accent'
                    : 'text-muted-foreground'
                }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                onClick={() => setActive('Add Application')}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton>
                      <LayoutGrid className="h-5 w-5" />
                      <span className="flex items-center gap-2">
                        Add Application
                      </span>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent side="right">Add Application</TooltipContent>
                </Tooltip>
              </Link>
            </TooltipProvider>
            <TooltipProvider>
              <Link
                className={`flex h-9 !w-full items-center rounded-lg ${
                  active === 'Add Timeline'
                    ? 'text-accent-foreground bg-accent'
                    : 'text-muted-foreground'
                }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                onClick={() => setActive('Add Timeline')}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton>
                      <History className="h-5 w-5" />
                      <span className="flex items-center gap-2">
                        Add Timeline
                      </span>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent side="right">Add Timeline</TooltipContent>
                </Tooltip>
              </Link>
            </TooltipProvider>
          </SidebarMenu>
        </SidebarGroup>
        {/* <NavMain items={data.navMain} /> */}

        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <div className="relative">
          {unreadCount > 0 && (
            <div className="absolute -top-[0.7rem] -right-2 z-10">
              <Dot className="text-red-600 stroke-[0.4rem]" />
            </div>
          )}
          <NavUser setActive={setActive} active={active} />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
