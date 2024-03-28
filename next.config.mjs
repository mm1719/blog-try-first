/** @type {import('next').NextConfig} */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const webpack = require('webpack');

const nextConfig = {
    env: {
        GITHUB_ID: process.env.GITHUB_ID,
        GITHUB_SECRET: process.env.GITHUB_SECRET,
    },
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'avatars.githubusercontent.com',
            },
        ],
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        if (!isServer) {
            config.resolve.fallback = { 
              ...config.resolve.fallback, // This will ensure existing fallbacks are not overwritten
              "buffer": require.resolve("buffer/") 
            };
        }
    
        // Add ProvidePlugin to define Buffer globally
        config.plugins.push(
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'], // Add this line to define Buffer globally
            })
        );
    
        return config;
    },
}

export default nextConfig;
