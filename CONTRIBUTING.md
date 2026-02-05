# Contributing to Backporting.ai

Thank you for your interest in contributing to Backporting.ai! We welcome contributions of articles, research papers, blog posts, and digest entries related to patch backporting automation.

## How to Contribute

### Adding New Digests

Digests are periodic collections of resources and updates in the patch backporting field. To add a new digest:

1. Create a new markdown file in `src/content/digests/` with the following structure:

```markdown
---
id: 2025-MM-DD-type-NNN
slug: your-slug-here
number: N
title: Your Digest Title
date: YYYY-MM-DD
summary: Brief summary of the digest
entries:
  - title: Resource Title
    url: https://example.com
    summary: Description of the resource
    tags:
      - tag1
      - tag2
---

Your main digest content goes here in markdown format.

## Section Headers

Content can include:
- Lists
- Links
- Formatting
```

2. Submit a pull request with your new digest file

### Adding Articles and Resources

We maintain a curated list of articles, research papers, blog posts, and other resources related to patch backporting. To suggest a new resource:

1. **Via GitHub Issues**: Create an issue describing the resource you'd like to add
2. **Via Pull Request**: Add your resource to the appropriate data file in `src/data/` and submit a PR
3. **Via Email**: Send your suggestion to hello@backporting.ai

### What We're Looking For

- **Research Papers**: Academic papers on automated patch backporting, bug fixing, code analysis
- **Blog Posts**: Technical articles about backporting tools, techniques, and experiences
- **Open Source Projects**: Tools and libraries for automated backporting
- **Company Releases**: Product announcements and updates related to backporting automation
- **Talks and Presentations**: Conference talks, webinars, and video content

### Content Guidelines

- All submissions should be relevant to patch backporting automation
- Include proper attribution and links to original sources
- Provide a clear, concise summary of the resource
- Add appropriate tags to help categorize the content
- Ensure links are working and point to the correct resource

### Digest Submission Guidelines

When creating digests:
- Focus on recent updates and important developments
- Include 3-10 high-quality entries per digest
- Write clear, informative summaries for each entry
- Use consistent formatting and structure
- Tag entries appropriately for easy discovery

## Code of Conduct

Please be respectful and professional in all interactions. We're building a community to advance the field of patch backporting automation.

## Questions?

If you have questions about contributing, please:
- Open an issue on GitHub
- Check the [Development Guide](docs/dev/INDEX.md) for technical setup
- Review existing digests for examples

Thank you for helping make Backporting.ai a valuable resource for the community!

