---
title: Where I've Actually Worked
subtitle: Click any role — the popups are more fun than a normal CV, I promise.
image: experience.png
image_alt: A super-deformed chibi cartoon of Andrea Lorenzani proudly presenting a chart
---

## Technical Lead Finance
company: TEG.tech (Transport Exchange Group)
start: 2025-09
end: present
icon: 🤖

### Achievements
- Built production AI agents and applications from scratch — not demos, actual things running live. 30–50% of incidents now get auto-triaged before a human even opens Slack.
- Built the SRE Rota Intelligence Tool: it reads our on-call schedule from Confluence, reads the support tickets, and quietly warns us when the rota is about to go wrong. 100% AI-generated code, which still makes me a little nervous and a lot proud.
- Got the whole 9-person team writing 100% of new tests with AI assistance, and the last 8 engineering epics were documented entirely by AI. My wrists thank me.
- Authored the GitHub Copilot instructions and AI skill definitions the team now uses daily — someone has to write the rules before the robots can follow them.
- Introduced Snyk, Unleash, OpenTelemetry → NewRelic, and a "Clean as you Code" rule nobody has dared break yet.

### Impact
- Company GTV grew from £400k to £1M+ a month, in under 6 months.
- Cycle time down 60%. Test coverage up from 25% to 85%. Team engagement (OfficeVibe) up from 7.2 to 8.6.

### Technologies
Java, Spring, Kafka, PostgreSQL (EDB), Elasticsearch, AWS, Kubernetes, GitHub Copilot, OpenTelemetry, SonarQube, Snyk, Unleash

### Notes
9 direct reports, 20+ people in the wider cross-functional team, building SmartPay — a B2B invoice payment platform. I still write code, about 30% of my week, give or take.

---

## Principal Engineer
company: Charlotte Tilbury Beauty
start: 2023-09
end: 2025-05
icon: 💄

### Achievements
- iDeal, the main Dutch payment method, had been switched off for a year before I joined — 15–20% of payments were taking people's money with no order created. I turned it back on deliberately to get fresh failure data, found the real number was worse (25–35%), fixed the actual bug with a small, secure redirect-token workaround instead of a much bigger webhook rebuild, and shipped it in about a month. €765K/year recovered for the Netherlands market. Chris was right to be suspicious about security — we ran a full review together, and made the whole payment flow safer for it.
- Turned Black Friday from "200–300 confused phone calls a week" into "the quietest peak ever" — an actual quote from Customer Care. 532 orders self-served through cancel/update, zero warehouse phone calls, thanks to a boring 30-minute delay and then convincing five different teams that our leadership reports needed one sentence rewritten.
- Stopped three promotions from politely destroying our margins by silently stacking on top of each other for years. Rebuilt it to just apply the single best one automatically — no configuration, no Sales spreadsheet of doom. 966K promo decisions corrected, 198K stacking events blocked, and checkout completion went up too.
- When Genshin Impact (yes, the video game) wanted to give our customers in-game rewards, I designed a proper 3-part email architecture, then quietly kept a scrappy fallback plan alive in case we ran out of time. We ran out of time. The fallback shipped the partnership on schedule (~£150K in bundle revenue), and we finished the proper version right after.
- Brought in Riskified to catch fraud before it caught us — $766K ARR generated, one of the four biggest engineering projects of the year.
- Started three engineering guilds (Infrastructure, Backend, E-commerce) and an Architecture Forum, because a colleague — Cyril — showed me that one good diagram saves everyone a week of confusion.

### Impact
- MTTR down 80%. Change Failure Rate from 18% to 2%. Zero manual interventions needed during peak.

### Technologies
ElasticPath, Contentful, Stripe, PayPal, Riskified, Java, AWS, Kubernetes, Handlebars, AWS SES

### Notes
I was Principal Engineer and technical leader across three squads — C3PO, ABS and Horizon — about 11 engineers, inside a "World Class Shopping" community of 18–20 people including Product and Design. Not everyone's line manager, but the person they'd come to when something was on fire, literally or in Jira. I also got direct feedback that I sometimes interrupt in meetings — fair, and I've been consciously leaving more space since.

---

## Development Team Leader
company: MetaPack Group
start: 2019-04
end: 2022-11
icon: 📦

### Achievements
- Led the "Templars" squad (5 engineers) building the pipeline that ingested, normalised and enriched every carrier tracking event for every retailer on the platform — about 190 million events a day, 1.6 million requests.
- Proved, with actual data, that tracking events were arriving too late for our Push Notification SLA, used that to get PTS evolution prioritised, then built the FTP Poller with a deliberately scrappy fail-fast approach to fix it quickly.
- Moved a chunk of the platform to serverless (Fargate, Lambda), cutting processing time 55% and infrastructure/on-call costs 30–40%.
- Introduced a Squad Health Check because getting honest feedback from people who report to you is genuinely hard. Learned the team felt starved of learning time, so I started Friday hackathons — they stuck.
- Learned AWS Athena and data lakes here to build a reconciliation system. Reused that exact skill years later at Charlotte Tilbury, for a completely different problem.

### Technologies
Java, Python, Terraform, Docker, AWS (Fargate, Lambda, Athena), Kafka, Elasticsearch, Kubernetes

### Notes
One teammate never fully took ownership of a component he was responsible for, and I never quite fixed it. When the company was acquired and people left, on-call got painful. Lesson learned the hard way: knowledge silos are a risk, not a personality quirk.

---

## Senior Product Developer — Acting Tech Leader
company: Whitbread (Premier Inn)
start: 2017-11
end: 2019-04
icon: 🛏️

### Achievements
- Acting Tech Leader for Premier Inn's core Booking and Payments APIs, on a feature team of 4, anywhere from 40% to 75% hands-on depending on the week.
- First time formally leading people. Turns out mentoring and release management are their own skill — who knew.

### Technologies
Java, Spring Boot, AWS, Kubernetes, Rancher, Docker, Redis

---

## Software Engineer
company: BBC Media Services
start: 2017-04
end: 2017-11
icon: 📺

### Achievements
- Worked on the plumbing behind iPlayer and iPlayer Radio: 13 million plays a day, 30 million+ app installs, 1,000+ device types, 3–4TB of new content ingested daily. Yes, that includes the Eurovision spike.

### Technologies
Java, Media pipelines, high-availability streaming infrastructure

---

## Senior Software Engineer
company: Ocado Technology
start: 2015-06
end: 2017-01
icon: 🛒

### Achievements
- Built analytics for the Customer Fulfilment Centre, then a real-time alerting system on AWS Kinesis + Elasticsearch so operations knew something broke before customers did.

### Technologies
Scala, Clojure, CoffeeScript, Datomic, Cassandra, AWS Kinesis, Elasticsearch, Kibana

---

## Senior Software Engineer (Consultant)
company: Amadeus IT Group
start: 2010-09
end: 2015-05
icon: ✈️

### Achievements
- 4.5 years as a C++ consultant on airline check-in and PNR systems processing 2 million+ transactions a day.
- Sole owner, end to end, of the SMS Check-In project — design to production, on my own.
- This is also where I learned that "critical infrastructure" and "no pressure" don't really go together.

### Technologies
C++, Boost, STL, Python, Oracle DB, Linux, Jenkins

---

## Various Roles (Italy)
company: Siemens, ElsagDatamat / Selex, Skyperform — via Aizoon / Imago Italia
start: 2007-10
end: 2010-09
icon: 🇮🇹

### Achievements
- Cut my teeth across three companies: a Manufacturing Execution System for Siemens, a Port Management Information System for ElsagDatamat (project leader for the digital signature module), and SOA/BPEL banking workflows for Skyperform, including Banca Intesa.
- Learned early that shipping software for ports and banks means double-checking absolutely everything.

### Technologies
C#, ASP.NET, Java, J2EE, Spring, JSF, Hibernate, Oracle SOA Suite, BPEL, ESB
