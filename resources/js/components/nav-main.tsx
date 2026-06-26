import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavItem } from '@/types';
import { Link } from '@inertiajs/react';

export function NavMain({ title, permissions, items = [] }: { title: string, permissions: string[], items: NavItem[] }) {
    const { isCurrentUrl } = useCurrentUrl();
    function hasPermission(item: NavItem, userPermissions: string[]): boolean {
        if (!item?.permission) return true;

        // Gunakan Array.isArray untuk memastikan aplikasi tidak crash jika tipenya bukan array
        if (!Array.isArray(userPermissions)) return false; 

        return userPermissions.includes(item.permission);
    }
    
    return (
        <>
            {items.filter((item) => hasPermission(item, permissions)).length > 0 && (
                <SidebarGroup className="px-2 py-0">
                    <SidebarGroupLabel>{title}</SidebarGroupLabel>
                    <SidebarMenu>
                        {items.filter((item) => hasPermission(item, permissions))
                            .map((item) => {
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isCurrentUrl(item.href)}
                                            tooltip={{ children: item.title }}
                                        >
                                            <Link href={item.href} prefetch>
                                                {item.icon && <item.icon />}
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })
                        }
                    </SidebarMenu>
                </SidebarGroup>
            )}
        </>
    );
}
