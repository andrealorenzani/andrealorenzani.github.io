# andrealorenzani.github.io

Andrea Lorenzani's personal CV site: a friendly, slightly funnier version of
the usual CV, in his own voice — experience, soft skills, education, hobbies
and contacts, each with popups or hover tooltips.

Plain HTML/CSS/JS. No build step, no framework, no dependencies beyond two
Google Fonts. GitHub Pages itself *is* a real static HTTP server — this site
just fetches its own `data/*.md` files with relative paths at runtime, the
same way it would fetch a JSON file. See the **`.nojekyll`** note below
though: don't remove that file, or GitHub will try to build this as a Jekyll
site and break it.

## Editing the content

Every fact on this site (roles, dates, skills, education, hobbies, contact
links, acronym meanings) lives in `data/*.md`, not in the HTML/CSS/JS. To
change what the site says, edit the relevant file in `data/`. The exact
format is documented in [`../docs/website-content-format.md`](../docs/website-content-format.md).

## Previewing locally

The page loads its content via `fetch()`, so it needs to be served over
HTTP (opening `index.html` straight from disk will not work in most
browsers):

```sh
python3 -m http.server 8000
# then open http://localhost:8000/
```

## Publishing on GitHub Pages

This folder is meant to become the **root** of the repository GitHub Pages
serves. Two common ways to do that:

**Option A — dedicated user site repo (recommended)**
1. Create a repository named exactly `<your-github-username>.github.io`.
2. Copy everything inside this `github.io/` folder (not the folder itself)
   to the root of that new repository, and push it to the `main` branch.
3. In that repo's Settings → Pages, set the source to `main` / `/ (root)`.
4. The site is live at `https://<your-github-username>.github.io/`.

**Option B — Pages from this repository**
1. In *this* repository's Settings → Pages, set the source to a GitHub
   Actions workflow (or, if using the branch-based source, note that GitHub
   Pages only serves from the repo root or a `/docs` folder — not an
   arbitrary folder name like `github.io/` — so a small deploy workflow that
   copies this folder's contents to the `gh-pages` branch, or to `/docs`, is
   needed).

Option A is simpler and is what the [GitHub Pages "creating a site" guide](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
describes for a personal site.

### Why the `.nojekyll` file matters

GitHub Pages runs every published site through **Jekyll** by default, unless
told not to. Every file in `data/` starts with a `---` front-matter block —
which is also Jekyll's own page syntax — so without opting out, GitHub would
try to build those `.md` files into HTML pages instead of leaving them as
plain text for this site's own fetch-and-parse code to read, and the whole
site would break the moment it went live (it works fine when you preview it
locally, which is what makes this easy to miss).

The empty `.nojekyll` file at the root of this folder disables that build
step entirely, so every file — including everything in `data/` — is served
byte-for-byte as committed. **Make sure `.nojekyll` is included when you
copy this folder's contents into the Pages repo** — it's easy to miss
because it's a dotfile and some file managers/zip tools hide or skip it by
default. If the live site ever shows a blank page while the local preview
works fine, this is the first thing to check.

## Structure

```
github.io/
  index.html          Page structure only — no hardcoded content
  css/style.css        All visual design
  js/md-parser.js       Tiny parser for the data file format
  js/main.js            Loads data/*.md, renders every section, wires up popups
  data/*.md             Every fact on the site — see docs/website-content-format.md
  img/*.png              The chibi illustrations used per section
```
