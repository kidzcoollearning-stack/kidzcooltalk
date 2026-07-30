# KIDZCOOLTALK static HTML landing page

This folder is a portable static website. It contains plain HTML, CSS,
JavaScript, and image files with no build step.

## Vercel

1. Push this folder to a GitHub repository, or upload it with the Vercel CLI.
2. Import the repository in Vercel.
3. Set **Framework Preset** to **Other**.
4. Leave the build command empty and set the output directory to `.`.

## GitHub Pages

1. Put the contents of this folder at the root of a GitHub repository.
2. Open **Settings → Pages**.
3. Choose **Deploy from a branch**, then select `main` and `/ (root)`.

All asset paths are relative, so the site also works under a repository
subdirectory such as `username.github.io/kidzcooltalk/`.

## Supabase form submissions

Supabase is best used as this site's database/backend while Vercel or GitHub
Pages serves the HTML.

1. Create a Supabase project.
2. Open the SQL editor and run `supabase/schema.sql`.
3. Open `config.js`.
4. Paste the project URL into `supabaseUrl`.
5. Paste the public anon key into `supabaseAnonKey`.

Do not place a Supabase service-role key in this website. The anon key is the
only browser-safe key for this setup.

If the Supabase values are blank, the form remains in preview-only mode and
does not send personal information anywhere.
