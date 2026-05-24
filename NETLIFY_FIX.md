# Fix Netlify build error

## Error you saw
```
Your publish directory cannot be the same as the base directory of your site
publish: /opt/build/repo
publishOrigin: ui
```

## Fix (2 minutes)

1. Open [Netlify Dashboard](https://app.netlify.com/) → your site **samohikhanumanchalisa**
2. Go to **Site configuration** → **Build & deploy** → **Build settings**
3. Click **Edit settings**
4. **Publish directory** → set to `.next`  
   (Or leave empty — `netlify.toml` in the repo also sets `publish = ".next"`)
5. **Build command** → `npm run build`
6. Save
7. **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

Do **not** set publish to `.`, `/`, `.next`, or `out` — the Next.js plugin sets this automatically.

## Environment variables (required)

Set under **Site configuration** → **Environment variables**:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_PASSWORD`
- `NEXT_PUBLIC_BASE_PARTICIPATION_COUNT` (optional)

## Success check

Deploy log should end with **Published** and no plugin error.  
Then open: https://samohikhanumanchalisa.netlify.app/
