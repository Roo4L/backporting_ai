# Patch backporting field updates: December 2025 – February 2026

Compiled on 2026-02-24. Covers research papers, OSS releases, blog posts, infrastructure changes, and industry updates relevant to automated patch backporting and closely adjacent topics (automated program repair, live patching, stable kernel maintenance, security patching tooling).

---

## Research papers

| # | Title | Date | Venue / Source | Link | Short summary |
|---|-------|------|----------------|------|---------------|
| 1 | **PortGPT: Towards Automated Backporting Using Large Language Models** | Oct 2025 (accepted IEEE S&P 2026) | IEEE S&P 2026 | [arXiv:2510.22396](https://arxiv.org/abs/2510.22396) | LLM-agent for end-to-end security patch backporting. Equips the LLM with tools to access code, summarise Git history, and revise patches via compiler feedback. 89.15% success on 1,815 cases, 62.33% on 146 complex cases. 9 patches merged into the Linux kernel. |
| 2 | **MigGPT: Automated Migration of Out-of-Tree Linux Kernel Patches Across Versions** | Apr 2025 (presented NeurIPS Dec 2025) | NeurIPS 2025 | [arXiv:2504.09474](https://arxiv.org/abs/2504.09474) | LLM framework for migrating out-of-tree kernel patches (RT-PREEMPT, AUFS, etc.). Uses code fingerprints and three specialised modules; achieves 74.07% completion rate, +45.92% over vanilla LLMs. Code: [github.com/CherryBlueberry/MigGPT](https://github.com/CherryBlueberry/MigGPT). |
| 3 | **An Insight into the Technical Debt–Fix Trade-off in Software Backporting** | Nov 2025 | 35th IEEE CASCON 2025 | [arXiv:2511.09000](https://arxiv.org/abs/2511.09000) | Empirical study of 105,396 commits across 87 repos (Apache, Eclipse, Python). ~4.3% of backports introduce new technical debt; inexperienced / high-workload developers are more debt-prone. |
| 4 | **TokenRepair: Enhancing APR via Faulty Token Localization and Quality-Aware Patch Refinement** | Nov 2025 | arXiv | [arXiv:2511.18001](https://arxiv.org/abs/2511.18001) | Two-level refinement framework: identifies suspicious tokens via context-aware uncertainty, then applies Chain-of-Thought guided rewriting. Fixes 88 bugs on Defects4J 1.2 (+8.2–34.9%) and 139 on HumanEval-Java (+3.3–16.1%). |
| 5 | **ReinFix: Repair Ingredients Are All You Need** | Jun 2025 (accepted ICSE 2026) | ICSE 2026 | [arXiv:2506.23100](https://arxiv.org/abs/2506.23100) | Agent-based APR that autonomously searches for internal (static-analysis) and external (historical fix) repair ingredients. Fixes 146 bugs on Defects4J V1.2 (+32 over baselines) and 38 more on V2.0. |
| 6 | **INTENTFIX: Automated Logic Vulnerability Repair via LLM-Driven Intent Modeling** | Accepted ICSE 2026 | ICSE 2026 | [conf.researchr.org](https://conf.researchr.org/details/icse-2026/icse-2026-research-track/218/INTENTFIX-Automated-Logic-Vulnerability-Repair-via-LLM-Driven-Intent-Modeling) | Three-stage framework: extracts developer intent, identifies semantic gaps, synthesises patches. 64.5% accuracy on 1,107 CVE cases across 19 languages; 1.97x over CoT baselines. |
| 7 | **Fixing Security Vulnerabilities with Agentic AI in OSS-Fuzz** | Accepted ICSE 2026 (SEIP) | ICSE 2026 | [conf.researchr.org](https://conf.researchr.org/details/icse-2026/icse-2026-software-engineering-in-practice/27/Fixing-Security-Vulnerabilities-with-Agentic-AI-in-OSS-Fuzz) | Adapts AutoCodeRover for automated vulnerability remediation in OSS-Fuzz. 61–72% plausible patch rate; several patches already merged into major open-source projects. |
| 8 | **Thea: Repairing LLM Executions for Secure Automatic Programming** | Accepted ICSE 2026 | ICSE 2026 | [PDF](https://abhikrc.com/pdf/ICSE26-security.pdf) | Uses mechanistic interpretability to intercept vulnerability-inducing representations in LLM code generation. ~15% overall vulnerability reduction, including 43% for buffer overflows and 30% for SQL injections. |
| 9 | **ScanFix: Extracting Fix Ingredients using Language Models** | Mar 2025 | arXiv | [arXiv:2503.04214](https://arxiv.org/abs/2503.04214) | Uses a BERT-like scanner model to extract fix-relevant identifiers from file/project context for APR. Up to 31% relative improvement; outperformed by models with >5k-token context windows. |
| 10 | **Co-PatcheR: Collaborative Software Patching with Component-specific Small Reasoning Models** | Presented NeurIPS Dec 2025 | NeurIPS 2025 | [NeurIPS page](https://neurips.cc/virtual/2025/poster/115030) | Three specialised 14B models (localization, generation, validation) instead of a single large model. 46% resolved on SWE-bench Verified with 3×14B, beating prior 70B baselines at 41%. Code on GitHub/HuggingFace. |
| 11 | **SWE-RL: Advancing LLM Reasoning via Reinforcement Learning on Open Software Evolution** | Feb 2025 (presented NeurIPS Dec 2025) | NeurIPS 2025 | [arXiv:2502.18449](https://arxiv.org/abs/2502.18449) | First RL-at-scale approach for real-world SE tasks. Llama3-SWE-RL-70B achieves 41% on SWE-bench Verified, matching GPT-4o. Generalises to coding, math, and general language tasks. Facebook Research. |
| 12 | **Multi-SWE-bench: A Multilingual Benchmark for Issue Resolving** | Presented NeurIPS Dec 2025 | NeurIPS 2025 | [NeurIPS page](https://neurips.cc/virtual/2025/poster/121692) | Extends SWE-bench to 8 languages (Python, Java, TypeScript, JS, Go, Rust, C, C++) with 2,132 expert-annotated instances. Current LLMs show limited cross-language generalisation. |
| 13 | **PATCHEVAL: A New Benchmark for Evaluating LLMs on Patching Real-World Vulnerabilities** | Nov 2025 | arXiv / ByteDance | [arXiv:2511.11019](https://arxiv.org/abs/2511.11019) | 1,000 CVEs (2015–2025) across Go/JS/Python, 65 CWEs, 230 with sandbox validation. Best agent (OpenHands+GPT-5) achieves 36.1%. Dataset on HuggingFace. |
| 14 | **Revisiting Vulnerability Patch Localization (LLM-Based Two-Stage Framework)** | Sep 2025 | arXiv | [arXiv:2509.15777](https://arxiv.org/pdf/2509.15777) | Version-driven candidate filtering + LLM multi-round dialogue voting to locate vulnerability-fixing commits. Outperforms existing methods on 750 real vulnerabilities. |
| 15 | **Empirical Evaluation of Generalizable APR with LLMs (Cross-Language)** | Jun 2025 | arXiv | [arXiv:2506.03283](https://arxiv.org/abs/2506.03283) | Evaluates 13 LLMs across Java, JS, Python, PHP benchmarks. Finds language-dependent performance, model ensemble value, and major impact of realistic fault localisation assumptions. |
| 16 | **A Survey of LLM-based Automated Program Repair** | Jun 2025 (revised Dec 2025) | arXiv | [arXiv:2506.23749](https://arxiv.org/abs/2506.23749) | Comprehensive survey of 62 LLM-based APR systems organised into four paradigms: fine-tuning, prompting, procedural, and agentic. Consolidates benchmarks and evaluation practices. |
| 17 | **SWE-fficiency: Can Language Models Optimize Real-World Repositories on Real Workloads?** | Nov 2025 (paper) / Feb 2026 (blog) | arXiv / OpenHands | [arXiv:2511.06090](https://arxiv.org/abs/2511.06090), [blog](https://openhands.dev/blog/20260216-swefficiency-benchmark) | 498 performance-optimisation tasks across 9 Python libraries. Top frontier models achieve <0.23x expert speedup. Shifts evaluation from "what to fix" to "how to fix." |

---

## OSS tool releases and updates

| # | Tool / Project | Date | Link | Short summary |
|---|----------------|------|------|---------------|
| 1 | **AUTOSEL rewrite (AI-powered stable backport classifier)** | May 2025 (in active use through 2026) | [sourcehut](https://git.sr.ht/~sashal/autosel) | Sasha Levin rewrote AUTOSEL from scratch using modern LLMs and embeddings, replacing older word-statistics approach. Used to classify kernel commits for stable backporting. Rust-based; supports Claude, OpenAI, NVIDIA, and local LLMs. |
| 2 | **Verhaal (kernel commit tracking tool)** | Dec 2025 | [sourcehut](https://git.sr.ht/~gregkh/verhaal) | Greg Kroah-Hartman's new tool for tracking kernel commits across stable branches. Builds a SQLite database from all stable branches; used by the Linux CVE team to manage backport tracking for 1.86M+ commits across 4,631 releases. |
| 3 | **Backport CLI (npm)** v9.6.6 | Late 2025 | [npm](https://www.npmjs.com/package/backport) | Active maintenance of sorenlouv's backport CLI. Automates cherry-picking commits to target branches and creating PRs. Also available as a GitHub Action (v9.5.1). |
| 4 | **cherry-picker** v2.5.0 | Jan 2025 | [PyPI](https://pypi.org/project/cherry-picker/) | CPython's official backporting tool for cherry-picking changes to maintenance branches. Python 3.9–3.14 support. |
| 5 | **OpenHands Software Agent SDK** | Nov 2025 | [openhands.dev](https://openhands.dev/blog/introducing-the-openhands-software-agent-sdk) | MIT-licensed SDK for building coding agents (including patching agents). Pre-built tools for bash, file editing, task tracking. Agents built with it score near top of SWE-Bench Verified. |
| 6 | **Co-PatcheR models and code** | Dec 2025 | [GitHub](https://github.com/ucsb-mlsec/Co-PatcheR) | Open-source release of three specialised 14B patching models (localization, generation, validation) plus training pipeline. Docker-ready. |
| 7 | **SWE-RL (Llama3-SWE-RL-70B)** | Dec 2025 | [GitHub](https://github.com/facebookresearch/swe-rl) | Facebook Research's RL-trained model for software engineering tasks. Open weights and code. |
| 8 | **MigGPT code and benchmark** | 2025 | [GitHub](https://github.com/CherryBlueberry/MigGPT) | Open-source implementation and benchmark data for out-of-tree kernel patch migration. |
| 9 | **PatchEval benchmark and dataset** | Nov 2025 | [GitHub](https://github.com/bytedance/PatchEval), [HuggingFace](https://huggingface.co/datasets/ByteDance/PatchEval) | ByteDance's open benchmark for vulnerability patching evaluation. 1,000 CVEs, sandbox environments. |

---

## Linux kernel and infrastructure updates

| # | Update | Date | Link | Short summary |
|---|--------|------|------|---------------|
| 1 | **Live Update Orchestrator (LUO) merged into Linux 6.19** | Dec 2025 | [Phoronix](https://www.phoronix.com/news/Linux-6.19-Live-Update-LUO) | New kernel subsystem enabling kexec-based live kernel updates with state preservation (memory, devices, VMs). Built on top of KHO (Kexec Handover, merged in 6.16). Led by Pasha Tatashin (Google). Reduces downtime for security kernel updates in cloud environments. |
| 2 | **Linux 6.19 released** | Feb 8, 2026 | [LWN](https://lwn.net/Articles/1057667/) | Final release in the 6.x series. Next version will be 7.0. Included LUO and various driver/subsystem fixes. |
| 3 | **Linux 7.0 merge window opens** | Feb 2026 | [Phoronix](https://phoronix.com/news/Linux-7.0-Driver-Core) | Major version bump from 6.x. Driver core changes include Rust kernel driver enhancements and close_range syscall improvements. |
| 4 | **Kernel LTS support timeline** | Ongoing | [kernel.org](https://kernel.org/category/releases.html) | Active LTS kernels: 6.18 (EOL Dec 2027), 6.12 (Dec 2026), 6.6 (Dec 2026), 6.1 (Dec 2027), 5.15 (Dec 2026), 5.10 (Dec 2026). All receive ongoing stable backports. |
| 5 | **AOSP trunk-stable development model** | Effective 2026 | [source.android.com](https://source.android.com/docs/core/architecture/kernel/kernel-code) | Google shifts AOSP to publish source in Q2 and Q4 only. Android GKI releases cover android16-6.12, android15-6.6, android14-6.1. Affects kernel patch contribution and backporting workflow. |

---

## Blog posts and articles

| # | Title / Topic | Date | Author / Source | Link | Short summary |
|---|---------------|------|-----------------|------|---------------|
| 1 | **Linux CVEs, more than you ever wanted to know** | Dec 8, 2025 | Greg Kroah-Hartman | [kroah.com](http://www.kroah.com/log/blog/2025/12/08/linux-cves-more-than-you-ever-wanted-to-know/) | Explains how the kernel became a CNA, the rapid growth in CVE issuance (now #1 by volume), and how CVE assignment relates to stable backporting. |
| 2 | **Linux kernel version numbers** | Dec 9, 2025 | Greg Kroah-Hartman | [kroah.com](http://www.kroah.com/log/blog/2025/12/09/linux-kernel-version-numbers/) | Clarifies how kernel versioning works, that all releases are "stable," and the cherry-pick process for stable backports. Part of the CVE blog series. |
| 3 | **Tracking kernel commits across branches** | Dec 15, 2025 | Greg Kroah-Hartman | [kroah.com](http://www.kroah.com/log/blog/2025/12/15/tracking-kernel-commits-across-branches/) | Introduces the Verhaal tool for automating kernel commit tracking across stable branches. Explains the standardised upstream commit ID format used in cherry-picked changelogs. |
| 4 | **Linux kernel security work** | Jan 2, 2026 | Greg Kroah-Hartman | [kroah.com](http://www.kroah.com/log/blog/2026/01/02/linux-kernel-security-work/) | Describes how the kernel security team operates: reactive triage, reporting guidelines, team composition, and alignment with EU CRA law. |
| 5 | **Linux CVE assignment process** | Feb 16, 2026 | Greg Kroah-Hartman | [kroah.com](http://www.kroah.com/log/blog/2026/02/16/linux-cve-assignment-process/) | Details how stable-backported bugfixes are reviewed for CVE assignment. ~30 bug fixes/day are filtered from ~9 changes/hour. Linux is now the top CVE issuer by quantity. |
| 6 | **PortGPT: How researchers taught an AI to backport security patches automatically** | Nov 5, 2025 | Help Net Security | [helpnetsecurity.com](https://www.helpnetsecurity.com/2025/11/05/portgpt-ai-backport-security-patches-automatically/) | Accessible summary of the PortGPT paper aimed at a security-professional audience. |
| 7 | **Rebaselining? (AUTOSEL rewrite discussion)** | May 2025 (discussions continued into late 2025) | LWN.net | [lwn.net](https://lwn.net/Articles/1020244/) | Discussion around AUTOSEL's LLM-based rewrite: accuracy concerns, subjective backport decisions, and proposals to limit submission frequency. |
| 8 | **A new AUTOSEL release** | May 2025 | LWN.net | [lwn.net](https://lwn.net/Articles/1020203/) | Coverage of AUTOSEL's transition from older neural networks to modern LLMs and embeddings for stable backport classification. |
| 9 | **Kexec handover and the live update orchestrator** | Late 2025 | LWN.net | [lwn.net](https://lwn.net/Articles/1033364/) | Technical deep-dive into KHO and LUO: architecture, callback framework, session management, and use cases for live kernel updates. |
| 10 | **SWE-fficiency: Evaluating How to Fix Code, Not Just What to Fix** | Feb 16, 2026 | OpenHands | [openhands.dev](https://openhands.dev/blog/20260216-swefficiency-benchmark) | Blog post announcing the SWE-fficiency benchmark. Shifts evaluation of AI coding agents from functional correctness to performance engineering. |
| 11 | **Live Linux kernel patching with progressive timestamped rollouts** | 2025 | Canonical | [ubuntu.com](https://ubuntu.com/blog/live-linux-kernel-patching-with-progressive-timestamped-rollouts) | Canonical introduces timestamp-based cutoff dates for Livepatch, enabling staged rollout of kernel security patches from dev → staging → production. |
| 12 | **Automating cherry-picks between OSS and private forks** | Jan 2025 | PlanetScale | [planetscale.com](https://planetscale.com/blog/automating-cherry-picks-between-oss-and-private-forks) | PlanetScale documents their evolution from manual weekly cherry-picks to a continuous cherry-pick bot for Vitess backporting across branches. |

---

## Industry and commercial updates

| # | Update | Date | Source | Link | Short summary |
|---|--------|------|--------|------|---------------|
| 1 | **GitHub Copilot: Assign code scanning alerts to Copilot for automated fixes** | Oct 2025 (public preview) → Dec 2025 (GA) | GitHub | [changelog](https://github.blog/changelog/2025-10-28-assign-code-scanning-alerts-to-copilot-for-automated-fixes-in-public-preview/), [GA](https://github.blog/changelog/2025-12-16-code-scanning-alert-assignees-are-now-generally-available/) | Copilot coding agent can now be assigned code scanning alerts (bulk or individual) to automatically create draft PRs with security fixes. GA as of December 2025 with REST API and webhook support. |
| 2 | **GitHub Copilot Autofix expanded** | Feb 2025 | GitHub | [changelog](https://github.blog/changelog/2025-02-20-copilot-autofix-is-available-for-more-code-scanning-alerts) | Copilot Autofix extended to cover additional CodeQL alert types (+29% coverage, +8% overall autofixes). SQL injection fixes 12x faster, XSS 7x faster than manual remediation. |
| 3 | **Endor Labs: backported open-source security patches** | Ongoing (documented 2025) | Endor Labs | [endorlabs.com](https://www.endorlabs.com/learn/how-endor-patches-are-built-and-tested) | Commercial platform providing pre-built backported security patches for open-source dependencies. Hermetic, reproducible builds with full transparency. Three version types for flexibility. |
| 4 | **Canonical Livepatch: progressive timestamped rollouts** | 2025 | Canonical | [ubuntu.com](https://ubuntu.com/blog/live-linux-kernel-patching-with-progressive-timestamped-rollouts) | Ubuntu Pro enterprise feature enabling controlled deployment of kernel livepatches via cutoff-date configuration, without self-hosted infrastructure. |
| 5 | **OpenHands raises $18.8M Series A** | Nov 2025 | OpenHands / Madrona | [openhands.dev](https://openhands.dev/blog) | Funding for the open-source AI coding agent platform. Released Agent SDK, OpenHands Index benchmark, and cloud deployment capabilities for automated code repair workflows. |
| 6 | **Canonical Livepatch Client v10.11.2** | Jun 2025 | Canonical | [ubuntu.com](https://ubuntu.com/blog/update-livepatch-client-for-the-newest-kernel-module-signing-certificate) | New kernel module signing certificate (May 2025) embedded in all subsequent Ubuntu kernels. Client v10.11.2 required for kernels published after Jul 2026. |

---

## Notes

- Items are ordered roughly by relevance within each category, not strictly by date.
- Some papers were submitted before December 2025 but were presented at conferences or revised within the December 2025 – February 2026 window (e.g., NeurIPS Dec 2025, ICSE 2026 acceptances announced).
- The "automated program repair" papers are included because they directly advance the technology used for patch backporting (patch generation, validation, ingredient extraction).
- ICSE 2026 has 321 accepted papers total (20.5% rate); the ones listed are those most relevant to patching and backporting.
