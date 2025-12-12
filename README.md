# Grandin Consulting – Marketing Site

Grandin Consulting’s public web experience is built with **React, Vite, and React Router**, and deployed primarily on Netlify. The site ships as static assets, so it can also run behind any standard web server or CDN.

## Tech Stack

- React 18 with JSX modules
- Vite for bundling, HMR, and environment-variable handling
- React Router DOM for routing and layout shell
- Single global stylesheet (`styles.css`) using CSS custom properties
- Netlify build pipeline (but output is static)

## Getting Started

```bash
npm install

# Local dev with HMR
npm run dev

# Optional linting
npm run lint

# Production build + preview
npm run build
npm run preview
```

The development server defaults to `http://localhost:5173`.

## Environment Variables

All browser-exposed variables must use the `VITE_` prefix.

| Variable | Description |
| --- | --- |
| `VITE_IPINFO_TOKEN` | Token for the ipinfo.io lite endpoint, used by the homepage IP details card. |

Create a `.env.local` (gitignored) with:

```
VITE_IPINFO_TOKEN=your_token_here
```

Add the same key/value to Netlify (Site settings → Environment variables) or to any other hosting provider before building.

## Project Structure Highlights

- `src/components/Layout.jsx` wraps all routes with the TopBar, Header, and Footer components.
- `src/pages/Home.jsx` holds the hero, service pillars, testimonials strip, industries grid, and CTA band.
- `src/pages/Testimonials.jsx` renders the long-form testimonials page, reusing data from `src/data/testimonials.js`.
- `src/components/IPInfoCard.jsx` fetches visitor IP data from ipinfo.io using `fetch` and React hooks.
- `src/styles.css` contains all design tokens, layout utilities, and component styles.
- Routes are defined in `src/main.jsx` via `createBrowserRouter`.

## Development Notes

- Anchor navigation (`/#services`, etc.) relies on hash scrolling implemented inside `Layout`. Ensure each section targeted from navigation has a matching `id`.
- Keep CSS class names descriptive—there is no CSS-in-JS, and most styling is centralized in `styles.css`.
- When creating new sections or cards, follow the existing spacing tokens (`--space-*`) and color variables defined in `:root`.
- For new configurable values (URLs, phone numbers, etc.), prefer adding them to `src/config/siteMeta.js`.
- Netlify automatically runs `npm run build`; keep custom scripts idempotent so they can run in CI.

## Deployment Options

### Netlify (current workflow)

1. Push changes to the main branch.
2. Netlify installs dependencies and runs `npm run build`.
3. The generated `dist/` directory is published to Netlify’s CDN.

### Manual Linux Deployment (NGINX)

The site is an SPA and can be hosted anywhere that serves static files. This repo also includes a small RSS proxy (`/api/rss`) required for the news ticker in production (browsers cannot fetch most RSS feeds directly due to CORS).

Prereqs:
- Node.js 18+ on the server (for the RSS proxy)
- NGINX serving `dist/`

1. **Build artifacts**
   ```bash
   npm ci
   npm run build
   ```
   The optimized bundle is written to `dist/`.

2. **Copy to the server**
   - Create `/var/www/grandin-consulting`.
   - Copy the entire `dist/` contents (including `assets/`) into that directory.

3. **Install NGINX (if needed)**
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

4. **Run the RSS proxy service**

   The proxy listens on `127.0.0.1:8787` and allowlists the feed hosts used by the ticker.

   - Start it manually (quick test):
     ```bash
     npm ci
     npm run rss-proxy
     ```

   - Recommended: run it with systemd. Example unit file at `/etc/systemd/system/grandin-rss-proxy.service`:
     ```
     [Unit]
     Description=Grandin Consulting RSS proxy
     After=network.target

     [Service]
     WorkingDirectory=/var/www/grandin-consulting-app
     ExecStart=/usr/bin/npm run rss-proxy
     Restart=always
     RestartSec=2
     Environment=NODE_ENV=production
     Environment=RSS_PROXY_HOST=127.0.0.1
     Environment=RSS_PROXY_PORT=8787

     [Install]
     WantedBy=multi-user.target
     ```
     Notes:
     - `WorkingDirectory` should point to where you deploy the repo (where `package.json` lives), not the static `dist/` folder.
     - If your server uses a different `npm` path, adjust `ExecStart`.

     Enable and start:
     ```bash
     sudo systemctl daemon-reload
     sudo systemctl enable grandin-rss-proxy
     sudo systemctl start grandin-rss-proxy
     sudo systemctl status grandin-rss-proxy --no-pager
     ```

5. **Configure a server block** at `/etc/nginx/sites-available/grandin-consulting`:
   ```
   server {
     listen 80;
     server_name your_domain.com;

     root /var/www/grandin-consulting;
     index index.html;

     location / {
       try_files $uri $uri/ /index.html;
     }

     # RSS proxy for the news ticker (same-origin endpoint consumed by the browser)
     location /api/rss {
       proxy_pass http://127.0.0.1:8787;
       proxy_http_version 1.1;
       proxy_set_header Host $host;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header X-Forwarded-Proto $scheme;
     }
   }
   ```

   The `try_files` directive ensures client-side routes like `/testimonials` work on refresh.

6. **Enable + reload**
   ```bash
   sudo ln -s /etc/nginx/sites-available/grandin-consulting /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

7. **HTTPS (recommended)**
   Use `certbot --nginx` or another ACME client to obtain certificates and add a `server` block listening on port 443.

### Updating a Linux Deployment

1. Pull the latest code and run `npm run build`.
2. Sync the `dist/` folder to `/var/www/grandin-consulting` (rsync/scp/etc.).
3. Reload NGINX if configuration changes were made (static files usually require no reload).

---

Questions, environment quirks, or future automation steps should be documented here so new contributors can ramp up quickly.
