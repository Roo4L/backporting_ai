# write-digest

Write a digest about the articles that you are being asked about.

## File Location and Format

Create a new markdown file in `src/content/digests/` with the filename format: `{slug}.md` (e.g., `monthly-2025-11.md`, `weekly-002.md`)

The file should have YAML frontmatter followed by markdown content:

```markdown
---
id: "YYYY-MM-DD-type-NNN"
slug: "your-slug"
number: N
title: "Digest Title"
date: "YYYY-MM-DD"
summary: "One-sentence summary of the digest"
entries:
  - title: "Paper/OSS/Blog Title"
    url: https://example.com
    summary: Brief description
    tags:
      - tag1
      - tag2
---

Main digest content goes here in markdown...
```

## Content Structure

The digest should provide the following:

1. **Highlight all artifacts** - List all articles, OSS releases, blog posts, etc. being summarized. Deduplicate if needed. Organize under these categories: Research, OSS, Blogs.

2. **Provide summaries** - Write detailed summaries for the most significant artifacts in each category using section headers:

```markdown
## Research

### Descriptive Section Title (e.g., "When AI Meets the Linux Kernel")

Content about the paper...

## OSS

### OSS Release Title

Description of the release...
```

## Quantitative Data is Essential

### Extract and Include Specific Numbers
Digests should be rich with quantitative data. When writing about papers, actively search for and include:

- **Performance metrics**: Success rates, accuracy percentages, precision/recall/F1 scores
- **Dataset sizes**: Number of test cases, benchmark sizes, evaluation corpus details
- **Comparative results**: How it performs vs. baseline tools (with specific numbers)
- **Real-world validation**: Actual deployment results, accepted patches, merged PRs
- **Scale indicators**: Number of devices tested, lines of code analyzed, apps evaluated
- **Technical specifications**: Version numbers, parameter counts, token limits, context windows

### Examples of Good Quantitative Writing
- "achieved an 89.15% success rate on 1,815 cases" ✓ (not just "high success rate")
- "9 out of 18 patches (50%) succeeded, and all 9 were merged" ✓ (specific counts and ratios)
- "outperforming FIXMORPH and TSBPORT" ✓ (named baselines)
- "dataset of 146 complex cases spanning C, C++, and Go" ✓ (size and scope)
- "thousands of methods in large APKs" ✓ (scale context)
- "Linux 6.1 stable branch" ✓ (specific versions)

### When Numbers Aren't Available
If specific metrics aren't readily available from web searches:
- Include what technical details you can find (architectures, approaches, dataset types)
- Focus on the methodology and what makes the approach distinctive
- Mention scale and scope qualitatively ("large-scale evaluation", "diverse benchmarks")
- Don't make up numbers—be concrete where possible, descriptive where necessary

## Tone and Style Guidelines

### Be Warm Yet Concise
- Use a conversational, warm tone with direct address ("If you've ever tried...", "What about when...")
- Cut straight to the point—avoid filler introductions and conclusions
- Every sentence should carry weight; remove word-mumbling and throat-clearing
- Use storytelling, but keep it tight
- Balance warmth with technical depth—readers want both approachability and substance

### What to Avoid
**NO filler paragraphs** like:
- Opening paragraphs that set the scene ("October brought some fascinating developments...")
- Closing sections that summarize what was already said ("The Bigger Picture", "What ties these together...")
- Editorial commentary ("surprisingly", "and it shows", "The big news this month is")
- Transition phrases ("While X works at the source level, Y addresses...", "Rounding out the month...")

**NO rigid structure** within paper discussions:
- No bold section headers like "**What sets it apart:**", "**The catch:**", "**What's next:**", "**The results:**"
- No formulaic "Key advancements" / "How it differs from prior work" sections
- Avoid extensive comparisons to prior work or future work discussions

**Cut verbose phrases:**
- "The big news this month is" → Just start with the paper name
- "Think of it as giving the model a toolkit:" → "The model gets a toolkit:"
- "proposes something clever" → Direct description
- "feel very real" → "are real"
- "It's less about perfect solutions and more about" → "The goal is"
- "The scalability angle matters because" → Direct statement without meta-commentary

### What to Include
- Direct, engaging openings that jump into the content
- Conversational questions to draw readers in
- Concrete descriptions of what the work does and why it matters
- Practical constraints and real-world context
- Clear, punchy statements about impact

### Structure
- Start each section directly with the paper/tool/blog—no preamble
- Use descriptive section headers that tell a story (e.g., "When AI Meets the Linux Kernel" not just "PortGPT")
- Focus on what the work accomplishes, not on meta-analysis
- End when you're done—no wrap-up needed

## Frontmatter Guidelines

### Entries Array
Each entry in the `entries` array should include:
- **title**: Full title of the paper/OSS/blog
- **url**: Direct link to the resource
- **summary**: One-sentence description (what it does, why it matters)
- **tags**: Relevant tags in kebab-case (e.g., `research`, `backporting`, `LLM`, `security-patches`)

### Example Entry
```yaml
- title: "PortGPT: Towards Automated Backporting Using Large Language Models"
  url: https://arxiv.org/abs/2510.22396
  summary: Agentic LLM system for automating Linux kernel patch backports using tool use and compiler feedback loops.
  tags:
    - research
    - backporting
    - security-patches
    - LLM
```

### Metadata Fields
- **id**: Unique identifier in format `YYYY-MM-DD-type-NNN` (e.g., `2025-11-15-monthly-003`)
- **slug**: URL-friendly identifier matching the filename (e.g., `monthly-2025-11`)
- **number**: Sequential digest number (increment from the last digest)
- **title**: Full digest title (e.g., `"Backporting.ai Digest – November 2025"`)
- **date**: Publication date in `YYYY-MM-DD` format
- **summary**: One-sentence overview of what's covered in this digest
