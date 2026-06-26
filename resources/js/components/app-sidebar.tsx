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
import permission from '@/routes/permission';
import type { NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { FileText, Headset, LayoutGrid, MonitorCog, ShieldCheck, UserCheck2, WifiIcon } from 'lucide-react';

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
        href: dashboard(),
        icon: UserCheck2,
        permission: 'role-index',
    },
    {
        title: 'Pelayanan',
        href: dashboard(),
        icon: WifiIcon,
        permission: 'pelayanan-index',
    },
    {
        title: 'Loket',
        href: dashboard(),
        icon: MonitorCog,
        permission: 'loket-index',
    },
];
const NavPelayanan: NavItem[] = [
    {
        title: 'Pemanggilan',
        href: dashboard(),
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
    const { permissions }: any = usePage().props.auth
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
                <NavMain permissions={permissions} title="Statistik" items={NavStatistik} />
                <NavMain permissions={permissions} title="Master" items={NavMaster} />
                <NavMain permissions={permissions} title="Pelayanan" items={NavPelayanan} />
                <NavMain permissions={permissions} title="Laporan" items={NavLaporan} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
