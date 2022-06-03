// /** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/backEnd/:p*',
          destination: `http://localhost:5000/:p*`,
        },]
    },
}


module.exports = nextConfig