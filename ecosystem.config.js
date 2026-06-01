// ──────────────────────────────────────────────────────────────────────
// PM2 Configuration for GoDaddy VPS Deployment (without Docker)
// ──────────────────────────────────────────────────────────────────────
//
// USAGE:
//   npm install -g pm2              → Install PM2
//   pm2 start ecosystem.config.js   → Start app
//   pm2 save                        → Save process list
//   pm2 startup                     → Auto-start on reboot
//   pm2 logs                        → View logs
//   pm2 restart all                 → Restart
//
// ──────────────────────────────────────────────────────────────────────

module.exports = {
  apps: [
    {
      name: "data-analogy",
      script: ".next/standalone/server.js",
      cwd: "/var/www/data-analogy",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "0.0.0.0",
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      error_file: "./logs/error.log",
      out_file: "./logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
    },
  ],
};
