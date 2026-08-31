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

This repository **is** the live site — it's the exact content of
`https://andrealorenzani.github.io/`, tracked in git. There's no separate
build/deploy step: commit to `main` and Pages redeploys automatically.

## Editing the content

Every fact on this site (roles, dates, skills, education, hobbies, contact
links, acronym meanings) lives in `data/*.md`, not in the HTML/CSS/JS. To
change what the site says, edit the relevant file in `data/`. The exact
format is documented in [`docs/website-content-format.md`](docs/website-content-format.md).

**This site's facts are meant to stay in sync with the CV data maintained in
the separate `agentic_cv` project.** Don't hand-edit `data/*.md` here for
anything that should also be true on Andrea's CV/cover letters (a new role,
a new certification, a corrected metric) — make that change in `agentic_cv`
first, then run its `website-sync` skill, which diffs this repo against that
source data and pushes the update here (recording the resulting commit hash
in the skill file). Pure presentation tweaks that are specific to this site
only (tone, layout, which hobbies to list) can be made directly here.

## Previewing locally

The page loads its content via `fetch()`, so it needs to be served over
HTTP (opening `index.html` straight from disk will not work in most
browsers):

```sh
python3 -m http.server 8000
# then open http://localhost:8000/
```

## Why the `.nojekyll` file matters

GitHub Pages runs every published site through **Jekyll** by default, unless
told not to. Every file in `data/` starts with a `---` front-matter block —
which is also Jekyll's own page syntax — so without opting out, GitHub would
try to build those `.md` files into HTML pages instead of leaving them as
plain text for this site's own fetch-and-parse code to read, and the whole
site would break the moment it went live (it works fine in local preview,
which is what makes this easy to miss — a plain Python server never runs
Jekyll at all). The empty `.nojekyll` file at the repo root disables that
build step entirely, so every file is served byte-for-byte as committed.
**Never delete it.**

## Structure

```
index.html          Page structure only — no hardcoded content
css/style.css        All visual design
js/md-parser.js       Tiny parser for the data file format
js/main.js            Loads data/*.md, renders every section, wires up popups
data/*.md             Every fact on the site — see docs/website-content-format.md
img/*.png              The chibi illustrations used per section
docs/                 Format documentation
.nojekyll             Disables Jekyll — see above, never remove
```
