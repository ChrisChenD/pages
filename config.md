
修改配置文件, url外部url映射到内部
# https://nextjs.org/docs/api-reference/next.config.js/rewrites

module.exports = {
  async rewrites() {
    return [
      {
        // source: 'http://localhost:3000/backEnd/demo/table',
        source: '/backEnd/demo/table',
        destination: `http://localhost:5000/demo/table`,
        // source: 'http://localhost:5000/demo/table',
        // // destination: `/backEnd/demo/table`,
        // destination: 'http://localhost:3000/backEnd/demo/table',
      },
    ]
  },
}
