import type { FlashGooey } from '@/types/ui';
import { appAlert } from '@/utils/AppAlert';
import { router } from '@inertiajs/react';
import { useEffect } from 'react';

export function useFlashGooey(): void {
    useEffect(() => {
        return router.on('flash', (event) => {
            const flash = (event as CustomEvent).detail?.flash;
            const data = flash?.toast as FlashGooey | undefined;

            if (!data) {
                return;
            }

            appAlert[data.type](data.title, data.description);
        });
    }, []);
}
