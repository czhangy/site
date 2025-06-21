import type { NextConfig } from 'next';

const path = require('path');
const nextConfig: NextConfig = {
    devIndicators: false,
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        prependData: `@import "@/styles/mixins"; @import "@/styles/variables";`,
        silenceDeprecations: ['import', 'legacy-js-api'],
    },
    images: {
        domains: ['pbs.twimg.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.scdn.co',
                port: '',
                pathname: '/image/**',
            },
            {
                protocol: 'https',
                hostname: 'mosaic.scdn.co',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'wrapped-images.spotifycdn.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'seed-mix-image.spotifycdn.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'lineup-images.scdn.co',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'daily-mix.scdn.co',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'mixed-media-images.spotifycdn.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'image-cdn-ak.spotifycdn.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'image-cdn-fa.spotifycdn.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'thisis-images.scdn.co',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
