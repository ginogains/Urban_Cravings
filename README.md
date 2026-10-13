# Urban Cravings — React final assignment

## Run locally
1. Install Node.js LTS if it is not already installed.
2. Open this folder in VS Code.
3. Run `npm install`
4. Run `npm run dev`
5. Open the local URL shown in the terminal.

## Build before deployment
Run `npm run build`. Vite creates the production site in `dist/`.

## Deploy to Netlify
- Push the project to a GitHub repository, then import that repository in Netlify.
- Build command: `npm run build`
- Publish directory: `dist`
- `netlify.toml` already includes the SPA redirect needed for React Router.

This is a frontend training demo. Cart, reservations and admin CRUD are stored in browser state/localStorage; there is no secure backend or real payment processing.
