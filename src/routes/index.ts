export * from './adminRoutes';
export const publicUrls = [
    { url: '/app/health', methods: ['GET'] },
    { url: '/admins/login', methods: ['POST'] },
    { url: '/admins/reset-password', methods: ['PUT'] },
];
