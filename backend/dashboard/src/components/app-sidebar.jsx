import * as React from 'react';
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
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

export function AppSidebar({ active, setActive, ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <SidebarTrigger className="w-full h-9 text-4xl" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
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
            <TooltipProvider>
              <Link
                className={`flex h-9 !w-full items-center rounded-lg ${
                  active === 'Messages'
                    ? 'text-accent-foreground bg-accent'
                    : 'text-muted-foreground'
                }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                onClick={() => setActive('Messages')}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton>
                      <MessageSquareMore className="h-5 w-5" />
                      <span className="flex items-center gap-2">Messages</span>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent side="right">Messages</TooltipContent>
                </Tooltip>
              </Link>
            </TooltipProvider>
            <TooltipProvider>
              <Link
                className={`flex h-9 !w-full items-center rounded-lg ${
                  active === 'Account'
                    ? 'text-accent-foreground bg-accent'
                    : 'text-muted-foreground'
                }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                onClick={() => setActive('Account')}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton>
                      <User className="h-5 w-5" />
                      <span className="flex items-center gap-2">Account</span>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent side="right">Account</TooltipContent>
                </Tooltip>
              </Link>
            </TooltipProvider>
          </SidebarMenu>
        </SidebarGroup>
        {/* <NavMain items={data.navMain} /> */}

        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
