/*
 * main.js
 * -------
 * Loads the content from data/*.md (parsed with md-parser.js), renders every
 * section of the page, wires up the popups and the acronym tooltips.
 *
 * All facts live in data/*.md. This file only knows how to turn that data
 * into HTML — see docs/website-content-format.md for the content format.
 */
(function () {
  'use strict';

  const DATA_DIR = 'data/';
  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  // ---------------------------------------------------------------------
  // Date / duration helpers
  // ---------------------------------------------------------------------

  function parseYearMonth(str) {
    const [y, m] = str.split('-').map(Number);
    return { y, m };
  }

  function monthLabel(str) {
    const { y, m } = parseYearMonth(str);
    return `${MONTH_NAMES[m - 1]} ${y}`;
  }

  // Live "time since" counter, e.g. for the header stats. Standard
  // non-inclusive elapsed-time arithmetic (like an age calculator) —
  // recomputed from the real current date every time the page loads.
  function elapsedSince(startStr) {
    const { y: startY, m: startM } = parseYearMonth(startStr);
    const now = new Date();
    let years = now.getFullYear() - startY;
    let months = (now.getMonth() + 1) - startM;
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    return { years, months };
  }

  // Role tenure, e.g. "April 2019 to November 2022 (3 years 8 months)".
  // Uses inclusive month counting (both the start and end month count as
  // full months worked) — the convention that matches how Andrea's own
  // verified CV data states these periods.
  function roleDuration(startStr, endStr) {
    const { y: startY, m: startM } = parseYearMonth(startStr);
    const current = endStr.trim().toLowerCase() === 'present';
    let endY, endM;
    if (current) {
      const now = new Date();
      endY = now.getFullYear();
      endM = now.getMonth() + 1;
    } else {
      ({ y: endY, m: endM } = parseYearMonth(endStr));
    }
    const totalMonths = (endY - startY) * 12 + (endM - startM) + 1;
    return { totalMonths, current };
  }

  function formatDuration(totalMonths) {
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    const parts = [];
    if (years > 0) parts.push(`${years} year${years !== 1 ? 's' : ''}`);
    if (months > 0) parts.push(`${months} month${months !== 1 ? 's' : ''}`);
    return parts.length ? parts.join(' ') : '0 months';
  }

  // ---------------------------------------------------------------------
  // Fetch helpers
  // ---------------------------------------------------------------------

  function fetchText(path) {
    return fetch(path).then((res) => {
      if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
      return res.text();
    });
  }

  // ---------------------------------------------------------------------
  // Acronym tooltips — walk rendered text nodes and wrap known acronyms
  // ---------------------------------------------------------------------

  let acronymRegex = null;
  let acronymDict = {};

  function buildAcronymRegex(dict) {
    const keys = Object.keys(dict).sort((a, b) => b.length - a.length);
    if (keys.length === 0) return null;
    const escaped = keys.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    // Word boundary at the start; at the end, allow the acronym to be
    // immediately followed by a lowercase "s" (plural, e.g. "APIs")
    // without pulling that "s" into the tooltip itself.
    return new RegExp(`\\b(${escaped.join('|')})(?=s\\b|\\b)`, 'g');
  }

  function acronymize(root) {
    if (!root || !acronymRegex) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (parent && (parent.closest('.acro') || parent.closest('script') || parent.closest('style'))) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const targets = [];
    let node;
    while ((node = walker.nextNode())) {
      acronymRegex.lastIndex = 0;
      if (acronymRegex.test(node.nodeValue)) targets.push(node);
    }

    targets.forEach((textNode) => {
      const frag = document.createDocumentFragment();
      const text = textNode.nodeValue;
      let lastIndex = 0;
      acronymRegex.lastIndex = 0;
      let match;
      while ((match = acronymRegex.exec(text))) {
        if (match.index > lastIndex) {
          frag.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
        }
        const span = document.createElement('span');
        span.className = 'acro';
        span.tabIndex = 0;
        span.textContent = match[0];
        const tip = document.createElement('span');
        tip.className = 'acro-tip';
        tip.textContent = acronymDict[match[0]] || '';
        span.appendChild(tip);
        frag.appendChild(span);
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < text.length) {
        frag.appendChild(document.createTextNode(text.slice(lastIndex)));
      }
      textNode.parentNode.replaceChild(frag, textNode);
    });
  }

  // ---------------------------------------------------------------------
  // Modal
  // ---------------------------------------------------------------------

  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  let lastFocused = null;

  function openModal(html) {
    lastFocused = document.activeElement;
    modalBody.innerHTML = html;
    acronymize(modalBody);
    modal.classList.add('open');
    document.body.classList.add('modal-open');
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
    modalBody.innerHTML = '';
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-close')) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  // ---------------------------------------------------------------------
  // Render: hero
  // ---------------------------------------------------------------------

  function renderHero(meta) {
    document.getElementById('hero-image').src = 'img/' + meta.image;
    document.getElementById('hero-image').alt = meta.image_alt || '';
    document.getElementById('hero-name').textContent = meta.name;
    document.getElementById('hero-tagline').textContent = meta.tagline;
    document.getElementById('hero-intro').textContent = meta.intro;

    const exp = elapsedSince(meta.work_start);
    const lead = elapsedSince(meta.lead_start);
    const years = formatDuration(exp.years * 12 + exp.months);
    const leadYears = formatDuration(lead.years * 12 + lead.months);

    const stats = meta.stats_template
      .replace('{{years}}', years)
      .replace('{{leadYears}}', leadYears)
      .replace('{{study}}', meta.study);

    document.getElementById('hero-stats').textContent = stats;
    if (meta.cta) document.getElementById('hero-cta').textContent = meta.cta;
    if (meta.ai_note) document.getElementById('hero-ai-note').textContent = meta.ai_note;

    // The hero <section> is id="top" (that id doubles as the "Home" nav
    // anchor) — .hero is only its CSS class, not an element id.
    acronymize(document.getElementById('top'));
  }

  // ---------------------------------------------------------------------
  // Render: experience
  // ---------------------------------------------------------------------

  function renderExperience(meta, items) {
    document.getElementById('experience-title').textContent = meta.title;
    document.getElementById('experience-subtitle').textContent = meta.subtitle;
    const img = document.getElementById('experience-image');
    img.src = 'img/' + meta.image;
    img.alt = meta.image_alt || '';

    const list = document.getElementById('experience-list');
    list.innerHTML = '';

    items.forEach((entry, index) => {
      const { totalMonths, current } = roleDuration(entry.meta.start, entry.meta.end);
      const durationLabel = formatDuration(totalMonths) + (current ? ' — still going' : '');
      const periodLabel = current
        ? `${monthLabel(entry.meta.start)} to present`
        : `${monthLabel(entry.meta.start)} to ${monthLabel(entry.meta.end)}`;

      const li = document.createElement('li');
      li.className = 'exp-item' + (current ? ' exp-item--current' : '');
      li.tabIndex = 0;
      li.setAttribute('role', 'button');
      li.setAttribute('aria-haspopup', 'dialog');

      li.innerHTML = `
        <span class="exp-icon" aria-hidden="true">${entry.meta.icon || '💼'}</span>
        <span class="exp-text">
          <span class="exp-role">${entry.title}</span>
          <span class="exp-sep"> — </span>
          <span class="exp-company">${entry.meta.company}</span>
          <span class="exp-period">${periodLabel} <em>(${durationLabel})</em></span>
        </span>
        <span class="exp-arrow" aria-hidden="true">→</span>
      `;

      const openThis = () => openModal(buildExperienceModal(entry, periodLabel, durationLabel));
      li.addEventListener('click', openThis);
      li.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openThis(); }
      });

      list.appendChild(li);
    });

    acronymize(document.getElementById('experience'));
  }

  function tagList(techLine) {
    if (!techLine) return '';
    return techLine
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => `<span class="tag">${t}</span>`)
      .join('');
  }

  function bulletHTML(arr) {
    if (!arr || !arr.length) return '';
    return `<ul class="modal-bullets">${arr.map((a) => `<li>${a}</li>`).join('')}</ul>`;
  }

  function buildExperienceModal(entry, periodLabel, durationLabel) {
    const s = entry.sections;
    return `
      <button class="modal-close" aria-label="Close">&times;</button>
      <div class="modal-eyebrow">${entry.meta.icon || '💼'} ${entry.meta.company}</div>
      <h3 class="modal-title">${entry.title}</h3>
      <p class="modal-period">${periodLabel} <strong>(${durationLabel})</strong></p>
      ${s.Achievements ? `<h4>Top achievements</h4>${bulletHTML(s.Achievements)}` : ''}
      ${s.Impact ? `<h4>Impact</h4>${bulletHTML(s.Impact)}` : ''}
      ${s.Technologies ? `<h4>Technologies</h4><div class="tag-list">${tagList(s.Technologies)}</div>` : ''}
      ${s.Notes ? `<h4>Notes</h4><p class="modal-notes">${s.Notes}</p>` : ''}
    `;
  }

  // ---------------------------------------------------------------------
  // Render: soft skills
  // ---------------------------------------------------------------------

  function renderSoftSkills(meta, items) {
    document.getElementById('skills-title').textContent = meta.title;
    document.getElementById('skills-subtitle').textContent = meta.subtitle;
    const img = document.getElementById('skills-image');
    img.src = 'img/' + meta.image;
    img.alt = meta.image_alt || '';

    const grid = document.getElementById('skills-grid');
    grid.innerHTML = '';

    items.forEach((entry) => {
      const card = document.createElement('button');
      card.className = 'skill-card';
      card.type = 'button';
      card.setAttribute('aria-haspopup', 'dialog');
      card.innerHTML = `
        <span class="skill-icon" aria-hidden="true">${entry.meta.icon || '✨'}</span>
        <span class="skill-name">${entry.title}</span>
      `;
      card.addEventListener('click', () => openModal(buildSkillModal(entry)));
      grid.appendChild(card);
    });

    acronymize(document.getElementById('soft-skills'));
  }

  function buildSkillModal(entry) {
    const s = entry.sections;
    return `
      <button class="modal-close" aria-label="Close">&times;</button>
      <div class="modal-eyebrow">${entry.meta.icon || '✨'} Soft skill</div>
      <h3 class="modal-title">${entry.title}</h3>
      ${s.Details ? `<p class="modal-notes">${s.Details}</p>` : ''}
      ${s.Examples ? `<h4>In practice</h4>${bulletHTML(s.Examples)}` : ''}
    `;
  }

  // ---------------------------------------------------------------------
  // Render: education
  // ---------------------------------------------------------------------

  function renderEducation(meta, items) {
    document.getElementById('education-title').textContent = meta.title;
    document.getElementById('education-subtitle').textContent = meta.subtitle;
    const img = document.getElementById('education-image');
    img.src = 'img/' + meta.image;
    img.alt = meta.image_alt || '';

    const list = document.getElementById('education-list');
    list.innerHTML = '';

    items.forEach((entry) => {
      const isLink = !!entry.meta.link;
      const el = document.createElement(isLink ? 'a' : 'div');
      el.className = 'edu-card';
      if (isLink) {
        el.href = entry.meta.link;
        el.target = '_blank';
        el.rel = 'noopener noreferrer';
      }

      const gradeLine = entry.meta.grade ? `<span class="edu-grade">${entry.meta.grade}</span>` : '';
      const periodLine = entry.meta.period ? `<span class="edu-period">${entry.meta.period}</span>` : '';
      const institutionLine = entry.meta.institution ? `<span class="edu-institution">${entry.meta.institution}</span>` : '';

      let extra = '';
      if (entry.meta.kind === 'languages' && entry.sections.Levels) {
        extra = `<div class="lang-grid">${Object.entries(entry.sections.Levels)
          .map(([lang, level]) => `<span class="lang-chip"><strong>${lang}</strong> ${level}</span>`)
          .join('')}</div>`;
      }
      if (entry.sections.Notes && typeof entry.sections.Notes === 'string') {
        extra += `<p class="edu-note">${entry.sections.Notes}</p>`;
      }

      el.innerHTML = `
        <span class="edu-icon" aria-hidden="true">${entry.meta.icon || '🎓'}</span>
        <span class="edu-body">
          <span class="edu-title">${entry.title}</span>
          ${institutionLine}
          <span class="edu-meta">${gradeLine}${periodLine}</span>
          ${extra}
        </span>
        ${isLink ? '<span class="edu-arrow" aria-hidden="true">↗</span>' : ''}
      `;
      list.appendChild(el);
    });

    acronymize(document.getElementById('education'));
  }

  // ---------------------------------------------------------------------
  // Render: hobbies
  // ---------------------------------------------------------------------

  function renderHobbies(meta, items) {
    document.getElementById('hobbies-title').textContent = meta.title;
    document.getElementById('hobbies-subtitle').textContent = meta.subtitle;
    const img = document.getElementById('hobbies-image');
    img.src = 'img/' + meta.image;
    img.alt = meta.image_alt || '';

    const list = document.getElementById('hobbies-list');
    list.innerHTML = '';
    items.forEach((h) => {
      const li = document.createElement('li');
      li.className = 'hobby-item';
      li.innerHTML = `
        <span class="hobby-icon" aria-hidden="true">${h.icon || '🙂'}</span>
        <span><span class="hobby-name">${h.title}</span> — ${h.description}</span>
      `;
      list.appendChild(li);
    });

    acronymize(document.getElementById('hobbies'));
  }

  // ---------------------------------------------------------------------
  // Render: contacts
  // ---------------------------------------------------------------------

  function renderContacts(meta, items) {
    document.getElementById('contacts-title').textContent = meta.title;
    document.getElementById('contacts-subtitle').textContent = meta.subtitle;
    const img = document.getElementById('contacts-image');
    img.src = 'img/' + meta.image;
    img.alt = meta.image_alt || '';

    const list = document.getElementById('contacts-list');
    list.innerHTML = '';

    items.forEach((entry) => {
      const a = document.createElement('a');
      a.className = 'contact-card';
      a.href = entry.meta.link;
      if (!entry.meta.link.startsWith('mailto:')) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      a.innerHTML = `
        <span class="contact-icon" aria-hidden="true">${entry.meta.icon || '🔗'}</span>
        <span class="contact-body">
          <span class="contact-title">${entry.title}</span>
          <span class="contact-value">${entry.meta.value || ''}</span>
        </span>
        <span class="contact-arrow" aria-hidden="true">→</span>
      `;
      list.appendChild(a);
    });

    acronymize(document.getElementById('contacts'));
  }

  // ---------------------------------------------------------------------
  // Init
  // ---------------------------------------------------------------------

  async function init() {
    document.getElementById('year').textContent = new Date().getFullYear();

    const [profileText, expText, skillsText, eduText, hobbiesText, contactsText, acroText] = await Promise.all([
      fetchText(DATA_DIR + 'profile.md'),
      fetchText(DATA_DIR + 'experience.md'),
      fetchText(DATA_DIR + 'soft-skills.md'),
      fetchText(DATA_DIR + 'education.md'),
      fetchText(DATA_DIR + 'hobbies.md'),
      fetchText(DATA_DIR + 'contacts.md'),
      fetchText(DATA_DIR + 'acronyms.md'),
    ]);

    acronymDict = MDParser.dict(acroText);
    acronymRegex = buildAcronymRegex(acronymDict);

    const profile = MDParser.frontmatter(profileText);
    renderHero(profile.meta);

    const exp = MDParser.frontmatter(expText);
    renderExperience(exp.meta, MDParser.entries(exp.body));

    const skills = MDParser.frontmatter(skillsText);
    renderSoftSkills(skills.meta, MDParser.entries(skills.body));

    const edu = MDParser.frontmatter(eduText);
    renderEducation(edu.meta, MDParser.entries(edu.body));

    const hobbies = MDParser.frontmatter(hobbiesText);
    renderHobbies(hobbies.meta, MDParser.bulletList(hobbies.body));

    const contacts = MDParser.frontmatter(contactsText);
    renderContacts(contacts.meta, MDParser.entries(contacts.body));

    document.body.classList.add('is-loaded');
  }

  init().catch((err) => {
    console.error(err);
    const main = document.querySelector('main');
    if (main) {
      main.innerHTML = `<p style="padding:3rem;text-align:center;">
        Something didn't load right (${err.message}). If you're viewing this
        from a local <code>file://</code> path, serve the folder over HTTP
        instead — e.g. <code>python3 -m http.server</code> — then reload.
      </p>`;
    }
    // Loading failed, so is-loaded never gets set the normal way — but the
    // body must still become visible, or the error message above is invisible.
    document.body.classList.add('is-loaded');
  });
})();
