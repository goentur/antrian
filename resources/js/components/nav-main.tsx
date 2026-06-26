import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';
import { Link } from '@inertiajs/react';

export function NavMain({ title ,items = [], permissions }: { title: string, items: NavItem[], permissions: string[] }) {
    function hasPermission(item: NavItem, permissions: string[]): boolean {
        if (item.permission) {
            return permissions.includes(item.permission);
        }
        return false;
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
