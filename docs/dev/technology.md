# 1) Start with a static core, keep a path to "dynamic"

**Why static first?** It's fast, cheap, secure, SEO-friendly, and perfect for a curated directory + digests. You can still add dynamic pieces (comments, forms, search) via lightweight services or a small backend later.

**Recommendation (Phase 1):**

* **Site framework:** **Astro** (content-first; great MD/MDX support; can embed React when needed). Alternatives: Hugo (very fast, less JS flexibility), Eleventy (simple), or Next.js Static Export (more JS).
* **Content format:** Markdown/MDX for digests; JSON/YAML for link collections and authors (e.g., `data/resources.json`, `data/authors.yaml`).
* **Hosting/CDN:** **Cloudflare Pages** or **Vercel** (both free/cheap, fast CI/CD).
* **Styling/UI:** Tailwind + a minimal component library (e.g., Radix UI via headless components or shadcn if you add React islands).
* **Search (client-side):** **Lunr/elasticlunr** or **Pagefind** for static full-text search.

This gets you: a content hub, index pages, tags, RSS/Atom/JSONFeed, sitemaps, and client-side search—without a database.

---

# 2) Data storage: pick Git now, add Postgres later

You'll have two kinds of data:

**A. Editorial/curated content (slow-changing):**
Keep it **in Git** alongside the site. Benefits: versioning, PR review, easy contributions.

* `content/digests/*.mdx`
* `data/resources.json` (title, link, source type, tags, publication date, author IDs, summary)
* `data/authors.yaml` (name, org, contact, links, topics)
* `data/orgs.yaml` (optional)

**B. Event-/people-centric, query-heavy data (future):**
When you need richer queries (e.g., "per-author metrics," deduping, trending), add **Postgres**. I'd use:

* **Supabase** or **Neon** (managed Postgres)
* Keep a small **FastAPI** or **Next.js API routes** service to expose read APIs to the static site at build time (or use **Astro content collections + server endpoints**).

**Suggested initial schema (when you add DB):**

* `authors(id, name, org, email, homepage, github, twitter, topics[], created_at)`
* `resources(id, url, title, type, pub_date, authors[], tags[], source_host, added_by, created_at)`
* `digests(id, slug, title, published_at, html/markdown, links[])`
* `submissions(id, url, title, submitter_email, status, created_at, reviewed_by)`
* (optional) `metrics(resource_id, stars, citations, social_shares, fetched_at)`

You can keep the site static while **pulling** this data during build (or ship JSON snapshots).

---

# 3) Email subscription + digests

* **Simplest, developer-friendly:** **Buttondown** (clean API, Markdown in, good deliverability).
* **More marketing features:** **Mailchimp**, **Brevo (Sendinblue)**, **ConvertKit**, **MailerLite**.
* **Self-host (power + low cost, more ops):** **Listmonk** + **AWS SES**.

**Workflow:** Write digest in MDX → publish → push to newsletter via API → auto-generate RSS/Atom/JSONFeed. You can also schedule "weekly highlights" via a cron (GitHub Actions).

---

# 4) Submissions (new entries)

Pick one (or both) to match your community vibe:

* **GitHub Issues as submissions**: Offer a repo template ("Submit a paper/project"). Pros: transparent, reviewable PRs, great for researchers/devs.
* **Form → webhook**: **Tally/Typeform/Google Form** → GitHub Action or a tiny webhook that creates an Issue/PR or a DB row.
* **Anti-spam:** reCAPTCHA/hCaptcha on public forms; email confirmation if needed.

Moderation flow: submissions land as Issues → triage → convert to PR that edits `data/resources.json` (or inserts into DB).

---

# 5) Comments & discussion

Three good paths, ranked by "ops cost":

1. **Giscus** (GitHub Discussions as comments). Lightweight, no PII stored by you, great moderation.
2. **Hyvor Talk** (hosted, privacy-friendly), or **Disqus** (ubiquitous but ad/trackers—often avoided).
3. **Self-host**: **Remark42** (Go), or a minimal in-house comments table (auth required; more ops).

If you want a Hacker-News-style voting board later, consider a small **Postgres** app with **Supabase Auth** (GitHub OAuth) + a simple "stories/comments/votes" schema.

---

# 6) Author extraction & metrics

Start simple:

* Maintain `authors.yaml` by hand at first; add new authors as you curate.
* Use a scheduled job (GitHub Actions cron) to:

  * Fetch metadata (OpenGraph/HTML) for submitted URLs,
  * Parse authors (best effort),
  * Normalize/merge into canonical authors (string match + heuristics),
  * Enrich metrics (GitHub stars, arXiv categories, PyPI downloads, etc.),
  * Emit a JSON snapshot that the site consumes at build time.

When this grows, move the pipeline to a small **FastAPI** worker on Fly.io/Render/Cloud Run with Postgres.

---

# 7) Authentication (for comments or contributor portal)

* **No auth** for static browsing.
* **GitHub OAuth** if you rely on Giscus/GitHub Issues.
* If you store users: **Supabase Auth** or **Clerk** (good DX, social logins, RBAC).

---

# 8) Search

* **Phase 1:** **Pagefind** or **Lunr** for instant static search across title/summary/tags.
* **Phase 2:** Hosted **Algolia** (excellent UX), or self-host **Typesense** (simple, fast) if you want control.

---

# 9) Hosting & ops

* **Cloudflare Pages** (fast, global, great caching) or **Vercel**.
* Custom domain: `backporting.ai`, HTTPS via host.
* CI: GitHub Actions (build on push; nightly cron jobs).
* **Analytics:** **Plausible** or **Umami** (privacy-friendly) over GA4.
* **Error monitoring for any server parts:** Sentry.

---

# 10) Content structure & taxonomy

* **Types:** research papers, blog posts, OSS repos, company releases, talks, datasets, benchmarks.
* **Tags:** technique (RAG, AST, IR, synthesis, verification), language (C, C++, Rust, Python), domain (kernel, libraries), tooling (Gerrit, Git, LLVM), evaluation (CodeBLEU, unit tests), etc.
* **Feeds:** Offer **RSS/Atom/JSONFeed** for "All" and per-tag/tag+type.

---

# 11) Legal & policy basics (easy to forget)

* Attribution & fair use: always link to originals; host only excerpts/screens.
* DMCA/Removal policy page.
* Privacy policy (especially if collecting emails/comments).
* Contributor license note for submitted text (let submitters affirm they have rights).

---

# 12) A phased roadmap (you can ship v1 in a weekend)

**MVP (Week 1):**

* Astro + Tailwind; deploy to Cloudflare Pages.
* Content: home, "All resources", "Digests", "Submit" page.
* Data: `resources.json`, `authors.yaml`.
* Search: Pagefind.
* Email: Buttondown (subscribe widget).
* Comments: Giscus on digests.

**v1.1 (Weeks 2–3):**

* GitHub Issues template for submissions + CI that validates/pretty-prints JSON and builds previews.
* Nightly job to fetch metadata and enrich tags.
* RSS/Atom/JSONFeed for resources & digests.

**v2 (Month 2+):**

* Postgres (Supabase/Neon) for authors/resources/metrics.
* Small API (FastAPI or Astro/Next endpoints) to generate snapshots for static builds.
* Admin dashboard for triage; per-author pages with metrics.

**v3 (Later):**

* HN-style discussions for "artifacts" (self-host or custom).
* Collaboration features: "review requests," "reading lists," "topic watchlists," personal profiles.

---

## Concrete stack pick (tl;dr)

* **Framework:** Astro (content collections + MDX)
* **UI:** Tailwind (+ React islands when needed)
* **Hosting:** Cloudflare Pages
* **Data (now):** Git (MDX/JSON/YAML)
* **Data (later):** Supabase (Postgres)
* **Submissions:** GitHub Issues + Tally form
* **Comments:** Giscus
* **Email:** Buttondown (or Listmonk+SES if you want self-host later)
* **Search:** Pagefind → Algolia/Typesense later
* **Automation:** GitHub Actions (cron to enrich/validate/build)
* **Analytics:** Plausible

If you want, I can spin up a minimal repo structure (folders, sample JSON/YAML schemas, Actions workflow, and an Astro starter with a resource index + filters), plus a sample digest layout and a validation script for `resources.json`.
