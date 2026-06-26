import { gooeyToast } from 'goey-toast';

export const appAlert = {
    default: (message: string, description?: string) => {
        gooeyToast(message, {
            description: description,
        });
    },

    info: (message: string, description?: string) => {
        gooeyToast.info(message, {
            description: description,
        });
    },

    success: (message: string, description?: string) => {
        gooeyToast.success(message, {
            description: description,
        });
    },

    error: (message: string, description?: string) => {
        gooeyToast.error(message, {
            description: description,
        });
    },

    warning: (message: string, description?: string) => {
        gooeyToast.warning(message, {
            description: description,
        });
    },
};