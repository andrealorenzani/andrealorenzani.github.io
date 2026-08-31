# Website Content Format — `andrea-cv-md`

> How the `github.io/` personal site is built, and the exact content format its
> tiny parser understands. Read this before editing anything under
> `github.io/data/`.

---

## 1. Why this exists

The site is deliberately **data/presentation-separated**: every fact on the
page (roles, dates, soft skills, education, hobbies, acronyms, contact links)
lives in a plain-text `.md` file under `github.io/data/`. None of it is
hardcoded in `index.html` or the CSS. To change what the site says, you edit a
data file — you never need to touch HTML, CSS or JavaScript.

A small hand-written parser (`github.io/js/md-parser.js`, ~180 lines, no
dependencies) turns those files into JavaScript objects. `github.io/js/main.js`
then turns those objects into the actual page: the experience list, the soft
skill cards, the education cards, the hobby list, the contact buttons, and the
popups for each of them.

This is **not** full CommonMark/Markdown — it's a small, predictable subset
called `andrea-cv-md` here, designed to be readable as plain text and trivial
to parse without a library. If you paste real Markdown into these files,
some of it (bold, headings, dashes) will still work, but things like tables,
nested lists, or inline links will not be understood.

---

## 2. File-level structure

Every data file may start with a **frontmatter block**: a `---` line, some
`key: value` lines, and a closing `---` line. This carries page-level
metadata — the section's title, subtitle, and which chibi image to show.

```md
---
title: Where I've Actually Worked
subtitle: Click any role — the popups are more fun than a normal CV, I promise.
image: experience.png
image_alt: A super-deformed chibi cartoon of Andrea Lorenzani proudly presenting a chart
---
```

- `key: value` — split on the **first** colon only, so values containing
  colons (like URLs) are safe: `link: https://example.com` parses fine.
- A key with nothing after the colon (`grade:`) is treated as an empty value.
- Frontmatter is optional. If a file doesn't start with `---`, the parser
  just treats the whole file as body content.

After the frontmatter, the rest of the file (the "body") is parsed in one of
three shapes, depending on which file it is. A line that is **only** `---`
anywhere in the body (not the frontmatter fences) is a pure visual divider —
it's ignored by the parser and exists only to make the raw file easier to
read.

---

## 3. Shape A — Entries (`## Title` blocks)

Used by: `experience.md`, `soft-skills.md`, `education.md`, `contacts.md`.

Each item on the page is a `## Title` heading, optionally followed by
`key: value` metadata lines, optionally followed by one or more
`### Subsection Name` blocks.

```md
## Technical Lead Finance
company: TEG.tech (Transport Exchange Group)
start: 2025-09
end: present
icon: 🤖

### Achievements
- Bullet one.
- Bullet two.

### Technologies
Java, Spring, Kafka, PostgreSQL

### Notes
A free-text paragraph. Just write normal sentences on one or more lines —
they get joined into a single paragraph.
```

This parses to:

```js
{
  title: "Technical Lead Finance",
  meta: { company: "TEG.tech (Transport Exchange Group)", start: "2025-09", end: "present", icon: "🤖" },
  sections: {
    Achievements: ["Bullet one.", "Bullet two."],
    Technologies: "Java, Spring, Kafka, PostgreSQL",
    Notes: "A free-text paragraph. …"
  }
}
```

**How a subsection's shape is decided (automatically, no config needed):**

| If every line in the subsection… | It becomes a… |
|---|---|
| starts with `- ` | `string[]` (array of bullets, dash stripped) |
| looks like `key: value` | `{key: value}` object |
| anything else | a single joined paragraph `string` |

This is why `### Technologies` — one line, comma-separated, no bullets, no
colons — comes back as a plain string (which `main.js` then splits on commas
to render as tag chips), while `### Achievements` comes back as an array
(rendered as a bullet list in the popup), and `### Levels` under the
Languages entry in `education.md` (lines like `Italian: Native`) comes back
as an object.

### Recognised `meta` keys by file

These aren't enforced by the parser — it will happily store whatever
`key: value` pairs you write — but `main.js` specifically looks for:

| File | Keys it reads |
|---|---|
| `experience.md` | `company`, `start` (`YYYY-MM`), `end` (`YYYY-MM` or `present`), `icon` |
| `soft-skills.md` | `icon` |
| `education.md` | `institution`, `grade`, `period`, `link`, `kind` (`degree` / `phd` / `certification` / `languages`), `icon` |
| `contacts.md` | `value` (the human-readable label, e.g. an email address), `link` (the actual `href`, e.g. `mailto:…`), `icon` |

An `education.md` entry becomes a clickable card that opens `link` in a new
tab **only if `link` is present** — the `Languages` entry has no `link`, so
it renders as plain (non-clickable) text, per the site's rule that only
degrees and certifications are clickable.

---

## 4. Shape B — Flat bullet list (no headings)

Used by: `hobbies.md`.

```md
- 🥾 **Hiking** — including one 42km day, entirely on purpose.
- 🏋️ **Gym** — periodic, goal-oriented bursts.
```

Format per line: `- <icon> **Title** — description`. Everything before the
first `**` is treated as the icon (this deliberately avoids trying to detect
where an emoji "ends" — some emoji are more than one Unicode code point, so
the parser just takes the literal text before the bold marker). The `—` (or
a plain `-`) between the bold title and the description is optional.

This parses to an array of `{ icon, title, description }`.

---

## 5. Shape C — Flat dictionary (`KEY: meaning`)

Used by: `acronyms.md`.

```md
# Comments start with a hash and are ignored
TEG: Transport Exchange Group
MTTR: Mean Time To Recovery
```

Parses to a plain `{ TEG: "Transport Exchange Group", MTTR: "…" }` object.
Blank lines and lines starting with `#` are ignored.

**This dictionary powers the hover tooltips.** After every section renders,
`main.js` walks its text nodes and wraps any word that exactly matches a key
in this file (case-sensitive, whole-word, and its simple plural — `API` also
matches inside `APIs`) in a small dotted-underline span with a tooltip
showing the meaning. **To make a new acronym show a tooltip anywhere on the
site, just add one line to `acronyms.md` — you never need to touch the
content file where the acronym is used, or any code.**

---

## 6. The two dynamic numbers on the page

Two figures in the hero section are computed live by the browser, every time
the page loads, from `profile.md`'s `work_start` and `lead_start` fields
(`YYYY-MM`) — they are never hardcoded text:

- **Years of experience** — elapsed time from `work_start` to today.
- **Years leading teams** — elapsed time from `lead_start` to today.

Both use ordinary "how much time has passed" arithmetic (like an age
calculator): if today is before the same day-of-month as the start date,
the month/year rolls back by one. This means these two numbers quietly keep
growing correctly for as long as the site exists — nobody needs to remember
to update them.

The wording around those numbers lives in `profile.md`'s `stats_template`
field, using `{{years}}`, `{{leadYears}}`, `{{workStartLabel}}`,
`{{leadStartLabel}}` and `{{study}}` placeholders — edit the sentence there,
not in the JavaScript.

Every **role's tenure** in `experience.md` (e.g. "3 years 8 months") is
computed differently, on purpose: it uses *inclusive* month counting (both
the start month and the end month count as full months worked), which is the
convention that matches how these periods are stated on Andrea's verified
CV data. You never write the duration by hand — just `start` and `end`, and
it's computed and kept internally consistent automatically. A role with
`end: present` keeps counting up to today and is visually highlighted as the
current role.

---

## 7. Adding a whole new section

1. Create `github.io/data/<section>.md` in one of the three shapes above.
2. Add a `<section>` block to `index.html` with the container `id`s your
   render function will target (copy an existing section as a template —
   `section--img-left` puts the portrait image first in the DOM/on the left,
   `section--img-right` puts the copy first/image on the right; on narrow
   screens the image always moves above the text).
3. Add a `render<Section>(meta, items)` function to `main.js` and call it
   from `init()` alongside the others.
4. Add a nav link in the `<header class="topnav">` if it should be reachable
   from the top bar.

No build step, no bundler, no npm install — this is plain static HTML/CSS/JS
on purpose, so it runs unmodified on GitHub Pages.

---

## 8. GitHub Pages, Jekyll, and `.nojekyll`

GitHub Pages is a genuine static HTTP server — it is **not** "serverless" in
a way that would block this site's `fetch('data/experience.md')` calls.
Relative fetches of same-origin files work on GitHub Pages exactly as they
do against `python3 -m http.server` locally. The one real trap is different:

**GitHub Pages runs every site through Jekyll by default.** Jekyll treats
any file that starts with a `---` front-matter block as a page to build —
and every file in `data/` starts with exactly that block, because it's also
our frontmatter syntax (see §2). Left unchecked, Jekyll would try to convert
`data/experience.md` etc. into standalone HTML pages instead of leaving them
as plain text, and this whole fetch-and-parse approach would break the
moment the site went live — while still looking perfectly fine in local
preview, since a plain `python3 -m http.server` never runs Jekyll at all.

The fix is the empty **`github.io/.nojekyll`** file. Its mere presence at
the published root tells GitHub Pages to skip the Jekyll build entirely and
serve every file exactly as committed. It must ship with every deploy —
watch out for zip tools or file managers that silently drop dotfiles when
copying this folder into a Pages repo.

## 9. Running it locally

Because the page `fetch()`s the `.md` files, it needs to be served over
HTTP — opening `index.html` directly as a `file://` URL will fail in most
browsers. From `github.io/`:

```sh
python3 -m http.server 8000
# then open http://localhost:8000/
```

---

*This document describes the format as of the site's initial build. If you
change the parser's behaviour in `md-parser.js`, update this file in the
same change.*
