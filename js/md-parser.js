/*
 * md-parser.js
 * ------------
 * A tiny, dependency-free parser for the custom "andrea-cv-md" content
 * format used by this site. It is NOT a full Markdown parser — it only
 * understands the small, predictable subset described in
 * docs/website-content-format.md at the root of this repo.
 *
 * Exposes a single global: window.MDParser
 */
(function () {
  'use strict';

  // Strip a leading `---\n ... \n---` frontmatter block and return
  // { meta: {k:v, ...}, body: 'rest of the file' }.
  function frontmatter(text) {
    const lines = text.replace(/\r\n/g, '\n').split('\n');
    if (lines[0] !== undefined && lines[0].trim() === '---') {
      let end = -1;
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '---') { end = i; break; }
      }
      if (end !== -1) {
        const meta = {};
        for (let i = 1; i < end; i++) {
          const kv = splitKV(lines[i]);
          if (kv) meta[kv.key] = kv.value;
        }
        return { meta, body: lines.slice(end + 1).join('\n') };
      }
    }
    return { meta: {}, body: text };
  }

  function splitKV(line) {
    const idx = line.indexOf(':');
    if (idx === -1) return null;
    const key = line.slice(0, idx).trim();
    if (!key) return null;
    const value = line.slice(idx + 1).trim();
    return { key, value };
  }

  // A line that is just three dashes is a plain visual divider in our
  // data files (readability only) — drop it before structural parsing.
  function stripDividers(body) {
    return body
      .split('\n')
      .filter((l) => l.trim() !== '---')
      .join('\n');
  }

  // Decide what shape a subsection body should parse into:
  //  - all bullet lines ("- ...")   -> string[]
  //  - all "key: value" lines       -> {key: value}
  //  - anything else                -> a single trimmed paragraph string
  function parseSubsectionBody(rawLines) {
    const lines = rawLines.filter((l) => l.trim() !== '');
    if (lines.length === 0) return '';

    if (lines.every((l) => /^- /.test(l.trim()))) {
      return lines.map((l) => l.trim().replace(/^- /, '').trim());
    }

    if (lines.every((l) => /^[^:\n]{1,60}:\s?.*$/.test(l.trim()))) {
      const obj = {};
      lines.forEach((l) => {
        const kv = splitKV(l.trim());
        if (kv) obj[kv.key] = kv.value;
      });
      return obj;
    }

    return lines.join(' ').trim();
  }

  // Parse a body made of `## Title` entries, each optionally followed by
  // `key: value` metadata lines and then `### Subsection` blocks.
  // Returns an array of { title, meta: {}, sections: {} }.
  function entries(body) {
    const clean = stripDividers(body);
    const lines = clean.split('\n');
    const blocks = [];
    let current = null;

    lines.forEach((line) => {
      if (/^##\s+/.test(line)) {
        if (current) blocks.push(current);
        current = { title: line.replace(/^##\s+/, '').trim(), lines: [] };
      } else if (current) {
        current.lines.push(line);
      }
    });
    if (current) blocks.push(current);

    return blocks.map((block) => {
      const meta = {};
      const sections = {};
      let i = 0;

      // Leading key: value lines (before the first ### or a blank-then-text)
      while (i < block.lines.length && !/^###\s+/.test(block.lines[i])) {
        const trimmed = block.lines[i].trim();
        if (trimmed !== '') {
          const kv = splitKV(trimmed);
          if (kv) meta[kv.key] = kv.value;
        }
        i++;
      }

      // Named ### subsections
      let sectionName = null;
      let sectionLines = [];
      const flush = () => {
        if (sectionName) sections[sectionName] = parseSubsectionBody(sectionLines);
        sectionName = null;
        sectionLines = [];
      };
      for (; i < block.lines.length; i++) {
        const line = block.lines[i];
        if (/^###\s+/.test(line)) {
          flush();
          sectionName = line.replace(/^###\s+/, '').trim();
        } else if (sectionName) {
          sectionLines.push(line);
        }
      }
      flush();

      return { title: block.title, meta, sections };
    });
  }

  // Parse a flat top-level bullet list (no ## headings) shaped like:
  //   - 🥾 **Title** — description text
  // Returns an array of { icon, title, description }.
  function bulletList(body) {
    const clean = stripDividers(body);
    return clean
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => /^- /.test(l))
      .map((l) => {
        // Format: "- <icon, any text/emoji> **Title** — description"
        // We don't try to detect exactly where the emoji grapheme ends
        // (variation selectors like the U+FE0F in some emoji make that
        // fragile) — instead everything before the first "**" is the icon.
        const withoutDash = l.replace(/^- /, '');
        const boldStart = withoutDash.indexOf('**');
        if (boldStart === -1) {
          return { icon: '', title: withoutDash.trim(), description: '' };
        }
        const icon = withoutDash.slice(0, boldStart).trim();
        const rest = withoutDash.slice(boldStart);
        const titleMatch = rest.match(/^\*\*(.+?)\*\*\s*(?:—|-)?\s*(.*)$/);
        if (titleMatch) {
          return { icon, title: titleMatch[1].trim(), description: titleMatch[2].trim() };
        }
        return { icon, title: rest.trim(), description: '' };
      });
  }

  // Parse a flat "KEY: meaning" dictionary file. Blank lines and lines
  // starting with # are ignored.
  function dict(text) {
    const out = {};
    text
      .replace(/\r\n/g, '\n')
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l !== '' && !l.startsWith('#'))
      .forEach((l) => {
        const kv = splitKV(l);
        if (kv && kv.key) out[kv.key] = kv.value;
      });
    return out;
  }

  window.MDParser = { frontmatter, entries, bulletList, dict };
})();
