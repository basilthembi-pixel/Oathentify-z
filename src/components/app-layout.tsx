'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  FileText,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  Settings,
  User,
} from 'lucide-react';
import { Logo } from './logo';
import { DUMMY_USER } from '@/lib/data';
import { Separator } from './ui/separator';

function Header({ pageTitle }: { pageTitle: string }) {
  const { toggleSidebar } = useSidebar();
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 text-muted-foreground"
      >
        <LayoutDashboard className="h-6 w-6" />
        <span className="sr-only">Toggle sidebar</span>
      </button>
      <h1 className="flex-1 text-xl font-semibold font-headline tracking-tight">{pageTitle}</h1>
      <UserMenu />
    </header>
  );
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={DUMMY_USER.photoURL} alt={DUMMY_USER.displayName} data-ai-hint="person portrait"/>
            <AvatarFallback>
              {DUMMY_USER.displayName.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{DUMMY_USER.displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {DUMMY_USER.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/new', label: 'New Agreement', icon: PlusCircle },
  { href: '/templates', label: 'Templates', icon: FileText },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Determine page title from nav items
  const pageTitle = navItems.find(item => item.href === pathname)?.label || 'Oathentify';

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <Separator className="my-2" />
          <div className="flex items-center gap-3 p-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={DUMMY_USER.photoURL} alt={DUMMY_USER.displayName} data-ai-hint="person portrait"/>
              <AvatarFallback>
                {DUMMY_USER.displayName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
                <p className="font-semibold truncate">{DUMMY_USER.displayName}</p>
                <p className="text-xs text-muted-foreground truncate">{DUMMY_USER.email}</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex h-full flex-col">
          <Header pageTitle={pageTitle} />
          <main className="flex-1 overflow-y-auto bg-secondary/50">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
