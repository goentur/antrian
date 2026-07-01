import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import loket from '@/routes/loket';
import pelayanan from '@/routes/pelayanan';
import pemanggilan from '@/routes/pemanggilan';
import permission from '@/routes/permission';
import role from '@/routes/role';
import user from '@/routes/user';
import type { NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { FileText, Headset, LayoutGrid, MonitorCog, ShieldCheck, UserCheck2, UserCheckIcon, WifiIcon } from 'lucide-react';

const NavStatistik: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
        permission: 'dashboard',
    },
];
const NavMaster: NavItem[] = [
    {
        title: 'Permission',
        href: permission.index(),
        icon: ShieldCheck,
        permission: 'permission-index',
    },
    {
        title: 'Role',
        href: role.index(),
        icon: UserCheck2,
        permission: 'role-index',
    },
    {
        title: 'User',
        href: user.index(),
        icon: UserCheckIcon,
        permission: 'user-index',
    },
    {
        title: 'Pelayanan',
        href: pelayanan.index(),
        icon: WifiIcon,
        permission: 'pelayanan-index',
    },
    {
        title: 'Loket',
        href: loket.index(),
        icon: MonitorCog,
        permission: 'loket-index',
    },
];
const NavPelayanan: NavItem[] = [
    {
        title: 'Pemanggilan',
        href: pemanggilan.index(),
        icon: Headset,
        permission: 'pemanggilan',
    },
];
const NavLaporan: NavItem[] = [
    {
        title: 'Laporan',
        href: dashboard(),
        icon: FileText,
        permission: 'laporan',
    },
];

export function AppSidebar() {
    const { permissions }:any = usePage().props.auth
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain title="Statistik" permissions={permissions} items={NavStatistik} />
                <NavMain title="Master" permissions={permissions} items={NavMaster} />
                <NavMain title="Pelayanan" permissions={permissions} items={NavPelayanan} />
                <NavMain title="Laporan" permissions={permissions} items={NavLaporan} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
