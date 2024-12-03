/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ],
    },


    async redirects() {
        return [
            {
                source: '/',
                destination: '/innovations/',
                permanent: true,
            },
            {
                source: '/admin/dashboard',
                destination: '/innovations/admin/dashboard',
                permanent: true,
            },
            {
                source: '/login',
                destination: '/innovations/login',
                permanent: true,
            },

            {
                source: '/profile',
                destination: '/innovations/profile',
                permanent: true,
            },
            {
                source: '/admin',
                destination: '/innovations/admin',
                permanent: true,
            },
            {
                source: '/register',
                destination: '/innovations/register',
                permanent: true,
            },
            {
                source: '/about',
                destination: '/innovations/about',
                permanent: true,
            },
            {
                source: '/profile',
                destination: '/innovations/profile',
                permanent: true,
            },
            {
                source: '/serverpage',
                destination: '/innovations/serverpage',
                permanent: true,
            },

        ];
    },
};

export default nextConfig;
