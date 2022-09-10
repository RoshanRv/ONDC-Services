/** @type {import('next').NextConfig} */
module.exports = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "https://novicers-i-tech-ondc.vercel.app/*",
            },
        ]
    },
}
