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
    },
};

export default nextConfig;
