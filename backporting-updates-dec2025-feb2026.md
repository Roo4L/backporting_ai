# Patch Backporting Field Updates: December 2025 – February 2026

Comprehensive list of research papers, OSS releases, blog posts, and industry updates related to automated patch backporting and closely adjacent fields (automated program repair, vulnerability patching, code migration, merge conflict resolution, binary patching, patch benchmarking).

---

## Research Papers

### Directly about patch backporting

| # | Title | Date | Source | Summary |
|---|-------|------|--------|---------|
| 1 | [BackportBench: A Multilingual Benchmark for Automated Backporting](https://arxiv.org/abs/2512.01396) | Dec 2025 | arXiv | First comprehensive multilingual benchmark for evaluating automated patch backporting. Contains 202 problems from PyPI, Maven, and npm with executable Docker environments. Reveals that agentic methods outperform traditional patch porting, especially for cases requiring logical/structural changes. By CUHK-Shenzhen. |
| 2 | [MigGPT: Automated Migration of Out-of-Tree Linux Kernel Patches](https://arxiv.org/abs/2504.09474) | Dec 2025 (NeurIPS 2025 poster) | NeurIPS 2025 | LLM framework for migrating out-of-tree Linux kernel patches (RT-PREEMPT, AUFS, etc.) across versions. Uses novel code fingerprint structure and three specialized modules. Achieves 74.07% completion rate—45.92% improvement over vanilla LLMs. Code at github.com/CherryBlueberry/MigGPT. |
| 3 | [Every Maintenance Has Its Exemplar: The Future of Software Maintenance through Migration](https://arxiv.org/abs/2602.14046) | Feb 2026 | arXiv | First systematic research agenda on migration-based software maintenance. Characterizes a four-stage lifecycle (identify, select, match/adapt, validate) covering patch migration, API evolution adaptation, and testing. Argues that learning from maintenance done on other systems is key to scaling automation. |
| 4 | [PatchScope: LLM-Enhanced Fine-Grained Stable Patch Classification for Linux Kernel](https://dl.acm.org/doi/10.1145/3728944) | 2025 (ISSTA 2025) | ACM | Goes beyond identifying stable patches to predicting *which* LTS versions a patch should be merged into. Uses LLM-generated patch descriptions + pre-trained language model with two-stage classifier. Evaluated on Linux 5.10 and 6.6. By Central South Univ / Tsinghua / Alibaba. |

### Automated program repair and bug fixing

| # | Title | Date | Source | Summary |
|---|-------|------|--------|---------|
| 5 | [DynaFix: Iterative APR Driven by Execution-Level Dynamic Information](https://arxiv.org/abs/2512.24635) | Dec 31, 2025 | arXiv | Captures variable states, control-flow paths, and call stacks during each repair iteration to guide LLMs. Repairs 186 single-function bugs on Defects4J (10% over baselines), including 38 previously unrepaired. Reduces patch search space by 70%. |
| 6 | [Co-PatcheR: Collaborative Software Patching with Component-Specific Small Reasoning Models](https://neurips.cc/virtual/2025/poster/115030) | Dec 2025 (NeurIPS 2025 poster) | NeurIPS 2025 | Uses three specialized 14B models working collaboratively instead of one large model: one for localization+generation, two for validation. Achieves 46% on SWE-bench Verified, beating the prior 41% SOTA with a 70B model. Models and code on HuggingFace/GitHub. |
| 7 | [Autonomous Issue Resolver (AIR): Towards Zero-Touch Code Maintenance](https://arxiv.org/abs/2512.08492) | Dec 2025 | arXiv | Introduces Data Transformation Graphs (DTG), shifting from control-flow to data-lineage for defect tracing. Multi-agent Plan-Navigate-Execute loop achieves 87.1% resolution rate on SWE-Verified benchmark. |
| 8 | [TokenRepair: Enhancing APR via Faulty Token Localization and Quality-Aware Patch Refinement](https://arxiv.org/abs/2511.18001) | Nov 2025 | arXiv | Two-level refinement: internal reflection for token-level uncertainty analysis + external quality-aware feedback. Fixes 88 bugs on Defects4J 1.2 with 8.2–34.9% improvements across models. Chain-of-Thought guided rewriting of only the faulty tokens. |
| 9 | [PatchIsland: Orchestration of LLM Agents for Continuous Vulnerability Repair](https://arxiv.org/abs/2601.17471) | Jan 2026 | arXiv | Integrates with continuous fuzzing pipelines (like OSS-Fuzz). Employs an ensemble of diverse LLM agents with two-phase patch deduplication. Repaired 84/92 vulnerabilities internally; 72.1% repair rate (31/43) in AIxCC competition under full autonomy. |
| 10 | [LSGEN: Learner-Tailored Program Repair with Iterative Edit-Driven Retrieval Enhancement](https://arxiv.org/abs/2601.08545) | Jan 2026 | arXiv | Addresses "Learner-tailored Program Repair" (LRP): fixes student code while generating bug explanations. Uses edit-driven code retrieval to find repair examples, iteratively optimizes retrieval direction using evaluation results. |
| 11 | [ReinFix: Static Analysis-Guided Repair Ingredient Retrieval](https://arxiv.org/abs/2506.23100) | Accepted ICSE 2026 | arXiv | Integrates static analysis in both reasoning and solution phases: retrieves internal ingredients (variable definitions) for root cause analysis, then external ingredients from similar historical fixes. Fixes 146 bugs on Defects4J V1.2 (32 more than baselines). |
| 12 | [PatchPilot: A Cost-Efficient Software Engineering Agent](https://arxiv.org/abs/2502.02747) | Feb 2025 / ICML 2025 | arXiv | Rule-based five-component workflow (reproduction → localization → generation → validation → refinement). Keeps cost below $1/instance on SWE-bench while matching agent-based performance. Code at github.com/ucsb-mlsec/PatchPilot. |
| 13 | [LangGraph-Based Agents for Automated Bug Fixing](https://arxiv.org/abs/2502.18465) | Feb 2025 | arXiv | Integrates LangGraph, GLM4 Flash, and ChromaDB in a four-step iterative workflow. ChromaDB enables semantic search for context-aware fixes based on historical bug data. |
| 14 | [PATCH: Programmer-Intent Guidance and Collaborative-Behavior Simulation for Bug Fixing](https://arxiv.org/abs/2501.16149) | Jan 2025 / FSE 2025 Journal First | arXiv | Decomposes bug fixing into four collaborative stages (reporting, diagnosis, generation, verification) simulating real programmer workflows. Augments buggy code with dependence context and intent information. |

### Vulnerability patching and security

| # | Title | Date | Source | Summary |
|---|-------|------|--------|---------|
| 15 | [Improving LLM-Assisted Secure Code Generation through RAG and Multi-Tool Feedback](https://arxiv.org/abs/2601.00509) | Jan 2026 | arXiv | Iterative refinement using compiler diagnostics, CodeQL, and KLEE symbolic execution. RAG retrieves previously successful repairs. Reduces DeepSeek-Coder vulnerabilities by 96%; CodeLlama critical defects from 58.55% to 22.19%. |
| 16 | [Persistent Human Feedback, LLMs, and Static Analyzers for Secure Code Generation](https://arxiv.org/abs/2602.05868) | Feb 2026 | arXiv | Evaluates 1,080 LLM-generated code samples and finds CodeQL/Semgrep match ground truth only 61–65% of the time. Proposes persistent human feedback stored in a dynamic RAG pipeline for more reliable secure code generation and vulnerability detection. |
| 17 | [APPATCH: Automated Adaptive Prompting LLMs for Real-World Software Vulnerability Patching](https://arxiv.org/abs/2408.13597) | USENIX Security 2025 | USENIX | Uses vulnerability semantics reasoning and adaptive prompting—no test inputs, exploits, or fine-tuning needed. Up to 28.33% F1 and 182.26% recall improvement over baselines. Evaluated on 97 zero-day + 20 existing vulnerabilities. Artifact available. |
| 18 | [LLM4CVE: Iterative Automated Vulnerability Repair with Large Language Models](https://arxiv.org/abs/2501.03446) | Jan 2025 | arXiv | Iterative pipeline using GPT-4o and Llama 3 70B to fix vulnerable functions from CVEs. Human-verified quality score of 8.51/10. 20% increase in ground-truth code similarity with Llama 3 70B. Published testing apparatus and fine-tuned weights. |

### Benchmarks and evaluation

| # | Title | Date | Source | Summary |
|---|-------|------|--------|---------|
| 19 | [A Survey of LLM-based Automated Program Repair: Taxonomies, Design Paradigms, and Applications](https://arxiv.org/abs/2506.23749) | Updated Dec 2025 | arXiv | Comprehensive survey covering 62 LLM-based APR systems. Classifies into four paradigms: fine-tuning, prompting, procedural, agentic. Discusses RAG and Analysis-Augmented Generation as cross-cutting strategies. Clarifies trade-offs in cost, controllability, and multi-hunk repair ability. |
| 20 | [VADER: A Human-Evaluated Benchmark for Vulnerability Assessment, Detection, Explanation, and Remediation](https://arxiv.org/abs/2505.19395) | 2025 | arXiv | 174 real-world vulnerabilities from GitHub, 15+ languages, human expert annotations. Evaluates 6 frontier LLMs. Best model (o3) achieves only 54.7% accuracy. Remediation quality weighted at 50%. Strong correlation between classification accuracy and fix quality. Public dataset. |
| 21 | [CVE-Bench: Benchmarking LLM SE Agents on Real-World CVE Vulnerabilities](https://aclanthology.org/2025.naacl-long.212/) | NAACL 2025 | ACL Anthology | 509 CVEs across 4 languages, 120 repos. Provides test environment with black/white-box testing and static analysis tool access. SWE-agent achieves only 21% repair rate, revealing limitations in agents' ability to use analysis tools effectively. |
| 22 | [SWE-bench Pro: Long-Horizon Software Engineering Tasks](https://arxiv.org/abs/2509.16941) | 2025 | arXiv / Scale AI | 1,865 enterprise-level problems from 41 repos requiring hours-to-days for professionals. Includes public, held-out, and commercial repository sets. Current best (GPT-5) achieves 23.3%. Public leaderboard at scale.com. |
| 23 | [SetUpAgent → SWEE-Bench & SWA-Bench: Automated Benchmark Generation](https://arxiv.org/abs/2503.07701) | 2025 | arXiv | Automated dependency setup and test execution for GitHub repos. Creates SWEE-Bench (885 instances, 366 repos) and SWA-Bench (535 instances, 44 app repos). Reveals 40–60% lower agent success rates than original SWE-bench, suggesting real-world diversity is much harder. |
| 24 | [ConGra: Benchmarking Automatic Merge Conflict Resolution](https://arxiv.org/abs/2409.14121) | Submitted ICLR 2025 | arXiv | 44,948 real-world conflicts from 34 projects (incl. TensorFlow, Linux kernel). Grades conflicts by complexity. Counterintuitive finding: massive context windows don't guarantee better resolution; general LLMs sometimes outperform specialized code models. |
| 25 | [An Insight into the Technical Debt–Fix Trade-off in Software Backporting](https://arxiv.org/abs/2511.09000) | Nov 2025 | arXiv (IEEE CASCON) | Study of 105,396 commits across 87 repos (Apache, Eclipse, Python). ~4.3% of backports introduce new technical debt. Python and Eclipse show 3x higher debt-to-commit ratios than Apache. Inexperienced devs and high workloads are risk factors. |

### Code migration and version adaptation

| # | Title | Date | Source | Summary |
|---|-------|------|--------|---------|
| 26 | [AIMigrate: What a Diff Makes — Automating Code Migration with LLMs](https://arxiv.org/abs/2511.00160) | Nov 2025 | arXiv | Shows that including diffs in LLM prompts significantly improves code migration for dependency updates. 65% accuracy in single run, 80% with multiple runs, 47% perfect changes. Open-source Python package at github.com/starsimhub/aimigrate. |
| 27 | [ContextBranch: Version Control for LLM Conversations](https://arxiv.org/abs/2512.13914) | Dec 2025 | arXiv | Applies Git-like semantics (checkpoint, branch, switch, inject) to LLM conversations for exploratory programming. Reduces context by 58.1%, improves response quality in branched conversations. Relevant to multi-path patch exploration workflows. |
| 28 | [ScanFix: Extracting Fix Ingredients using Language Models](https://arxiv.org/abs/2503.04214) | 2025 | arXiv | Uses a BERT-like scanner model to extract identifiers (variable names, method names) from file and project context as "fix ingredients" for program repair. Up to 31% relative improvement. Notes that larger context windows may reduce the need for this approach. |

### Binary/firmware patching and embedded systems

| # | Title | Date | Source | Summary |
|---|-------|------|--------|---------|
| 29 | [StackPatch: Hot Patching for RTOS via Stack Frame Reconstruction](https://arxiv.org/abs/2509.10213) | 2025 | arXiv | Hot patching framework for ARM, RISC-V, and Xtensa RTOS. Fixed 102 disclosed vulnerabilities on medical devices, PLCs, and network services. Under 260 MCU clock cycles overhead. No idle memory or dynamic linking required. |
| 30 | [AutoPatch: Automated Generation of Hotpatches for Real-Time Embedded Devices](https://arxiv.org/abs/2408.15372) | ACM CCS 2024 | ACM CCS | Automatically generates hotpatches via LLVM static analysis of official patches. Fixes 90%+ of CVEs on 4 embedded devices with <12.7μs delay. 50% faster than RapidPatch. Open source on GitHub. |
| 31 | [bpatch: Lightweight Delta Patch Generation for IoT over LoRaWAN](https://iris.polito.it/retrieve/b2922609-56dd-4287-807d-6981d7555396/1-s2.0-S2542660525002860-main.pdf) | 2025 | Journal (Polito) | Delta patching algorithm reducing firmware update payloads by up to 39,000x for near-identical versions, 9–18x for typical minor revisions. Evaluated on 173 firmware images across 3 architectures. Open source. |
| 32 | [IMUP: Integrity-Centric Modular Update Platform for IoT Firmware](https://arxiv.org/abs/2507.19367) | Jul 2025 | arXiv | Studied 200 Linux-based IoT devices; found 50%+ of update CVEs stem from customization. Per-module chameleon hashing, 2.9x faster server generation, 5.9x less device downtime vs traditional approaches. |

### Agent-based program repair at scale

| # | Title | Date | Source | Summary |
|---|-------|------|--------|---------|
| 33 | [Evaluating Agent-based Program Repair at Google (Passerine)](https://arxiv.org/abs/2501.07531) | Jan 2025 | arXiv | First baseline for agent-based APR in industrial setting. Using Gemini 1.5 Pro: 73% plausible patches for machine-reported bugs, 25.6% for human-reported. 43% semantically equivalent to ground truth for machine-reported bugs. |
| 34 | [Agentic Bug Reproduction (BRT Agent) for APR at Google](https://arxiv.org/abs/2502.01821) | Feb 2025 | arXiv | Automatically generates Bug Reproduction Tests from bug reports. 28% plausible BRT generation rate (vs 10% for LIBRO baseline). Integrating BRTs yielded 30% more plausible fixes. Ensemble Pass Rate correctly identifies plausible fixes in 70% of cases. |
| 35 | [All You Need Is A Fuzzing Brain: LLM-Powered Vulnerability Detection and Patching](https://arxiv.org/abs/2509.07225) | Sep 2025 / AIxCC 2025 | arXiv / DARPA | 4th place in DARPA AIxCC. 28 vulnerabilities discovered (6 zero-days), 14 patched during competition. Post-competition: 62 total vulns across 26 projects, 36 patches merged upstream. 23 LLM-based strategies across Anthropic/Google/OpenAI models. Open source CRS. |

---

## OSS Releases and Tools

| # | Item | Date | Summary |
|---|------|------|---------|
| 36 | [AUTOSEL v2 (Rewritten)](https://git.sr.ht/~sashal/autosel) | Active Dec 2025 – Feb 2026 | Completely rewritten Linux kernel stable backport classifier by Sasha Levin. Now uses LLM embeddings instead of word statistics/old neural nets. Supports Claude, OpenAI, NVIDIA. Used in production for stable tree maintenance. |
| 37 | [korthout/backport-action v3.2.0](https://github.com/korthout/backport-action/releases) | Feb 23, 2026 | GitHub Action for automated PR backporting. New: `add_labels` input for backport PRs, `add_author_as_assignee` control. Active development with issues for stale PR reminders and auto-review-request. |
| 38 | [Moderne/OpenRewrite CLI v3.54–v3.56](https://docs.moderne.io/releases/cli-dx/) | Dec 2025 – Jan 2026 | v3.54.0 (Dec 16): Extended Maven caching, OpenRewrite 8.69.0. v3.55.0 (Jan 8): Org hierarchy support, JS parser improvements. v3.56.x (Jan 21–23): Batch partitions by build tool, diff rendering refactor. 2000+ automated code transformation recipes. |
| 39 | [DARPA AIxCC CRS Open-Source Releases](https://archive.aicyberchallenge.com/) | Aug–Dec 2025 | All 7 finalist cyber reasoning systems released open source, including Team Atlanta's Atlantis (1st place) and Fuzzing Brain (4th place). Autonomous vulnerability detection + patching systems. |
| 40 | [MigGPT Code Release](https://github.com/CherryBlueberry/MigGPT) | 2025 | Open-source framework for out-of-tree Linux kernel patch migration using LLMs. Accompanies NeurIPS 2025 paper. |
| 41 | [Co-PatcheR Models and Code](https://github.com/ucsb-mlsec/Co-PatcheR) | 2025 | Three 14B model checkpoints for collaborative software patching (localization, generation, validation) released on HuggingFace + GitHub. SWE-bench Verified SOTA for small models (46%). |
| 42 | [PatchPilot Code Release](https://github.com/ucsb-mlsec/PatchPilot) | 2025 | Open-source cost-efficient patching agent. Five-component workflow achieving competitive SWE-bench scores at <$1/instance. |
| 43 | [AIMigrate Python Package](https://github.com/starsimhub/aimigrate) | Nov 2025 | Open-source tool for LLM-assisted code migration with diff-enhanced prompting. Helps migrate codebases when dependencies undergo version changes. |

---

## Blog Posts, News, and Industry Updates

| # | Item | Date | Source | Summary |
|---|------|------|---------|---------|
| 44 | [Linux Kernel AI Coding Assistant Guidelines Added to README](https://lists.openwall.net/linux-kernel/2025/12/14/15) | Dec 14, 2025 | LKML | Formal guidelines for AI tool usage in kernel development added to kernel README. Requires `Assisted-by` tags (e.g., `Assisted-by: Claude:claude-3-opus coccinelle sparse`). AI agents cannot sign off on DCO; human bears full responsibility. |
| 45 | [Greg Kroah-Hartman: Linux Kernel Security Work](http://www.kroah.com/log/blog/2026/01/02/linux-kernel-security-work/) | Jan 2, 2026 | Blog (kroah.com) | Explains how the Linux kernel security team triages and fixes reported security bugs reactively. Covers the process for reporting, handling, and backporting security fixes to stable kernel branches. |
| 46 | [Greg Kroah-Hartman: Linux CVE Assignment Process](http://www.kroah.com/log/blog/2026/02/16/linux-cve-assignment-process/) | Feb 16, 2026 | Blog (kroah.com) | Details how the kernel CNA assigns CVEs to bugfix commits *after* they are merged into stable trees. ~30 bugfixes/day reviewed. CVEs assigned only for supported stable/LTS branches. Subsystem maintainers can dispute. |
| 47 | [AI Is Now Being Used To Help Determine Patches For Backporting In The Linux Kernel](https://www.phoronix.com/news/AI-Help-Backporting-Linux-Patch) | Aug 2025 | Phoronix | Sasha Levin began using LLM-generated explanations in actual backport patch submissions to stable kernel tree. LLMs analyze commits for user-facing impacts, regression scope, and risk assessment. |
| 48 | [Qualys: AI-Powered Patch Reliability Scoring](https://blog.qualys.com/product-tech/2026/02/18/new-ai-powered-patch-reliability-scoring-predict-patch-impact-before-you-deploy) | Feb 18, 2026 | Qualys Blog | New AI capability that scores patches as "Low" or "High" reliability before deployment. Validated against 2025's most problematic rollbacks (Ubuntu USN-7545-1, multiple Windows KBs). Aims to replace "deploy and hope" approach. |
| 49 | [Moderne: Backpatching in Enterprise Software](https://www.moderne.ai/blog/backpatching-enterprise-software-security) | Jul 2025 | Moderne Blog | Comprehensive post on backpatching strategy: applying targeted security fixes to older versions without full migration. Addresses cascading dependency challenges across hundreds of repos. Offered as part of their OpenRewrite-based platform. |
| 50 | [Docker: How Hardened Images Patch CVEs in 24 Hours](https://www.docker.com/blog/how-docker-hardened-images-patch-cves-in-24-hours/) | Nov 2025 | Docker Blog | Real-time CVE ingestion via Docker Scout, instant impact assessment, automated cascading rebuilds. Patched two Golang SSH CVEs within 24 hours in Nov 2025. Demonstrates shift from batch scanning to continuous patching. |
| 51 | [GitHub Copilot Autofix Expanded](https://github.blog/changelog/2025-02-20-copilot-autofix-is-available-for-more-code-scanning-alerts) | Feb 2025 (ongoing) | GitHub Blog | Expanded autofix coverage to 29% of all CodeQL alerts (+8% overall). 270% increase in autofixes for improved alert group. 3x faster median alert resolution time (28 min vs 1.5 hrs). Available for all public repos without Copilot subscription. |
| 52 | [Gitar.ai: Autonomous Merge Conflict Resolution](https://cms.gitar.ai/merge-conflict-resolution-large-codebases/) | Dec 2025 | Gitar.ai Blog | Autonomous AI agent that actively resolves merge conflicts and CI failures. Cross-platform CI/CD support, context-aware with code diffs + dependency graphs + repo history. Configurable trust levels from suggestion-only to fully autonomous commits. |
| 53 | [Linux Kernel Rebaselining Discussion](https://lwn.net/Articles/1020244/) | May 2025 | LWN.net | Discussion about AUTOSEL rebaselining the v6.15 merge window with improved tooling. Concerns about frequency vs quality trade-offs. Maintainers tolerate one AUTOSEL set per mainline release if quality is reasonable. |
| 54 | [DARPA AIxCC Results: $8.5M for AI Vulnerability Patching](https://www.darpa.mil/news/2025/aixcc-results) | Aug 2025 | DARPA | Team Atlanta won $4M. Competitors discovered 54 unique synthetic vulns across 54M LOC, patched 43. Found 18 real zero-days (6 C, 12 Java), patched 11 Java zero-days. All 7 finalist CRS released as open source. |
| 55 | [Microsoft Windows Hotpatch for Enterprise](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/manage/windows-autopatch-hotpatch-updates) | Active 2025–2026 | Microsoft Learn | Windows 11 Enterprise security updates without restart via Autopatch/Intune. Quarterly baseline + 2 months hotpatch cycle. Added Server 2025 Datacenter support. ARM64 in public preview. |

---

## Summary Statistics

- **Total artifacts found**: 55
- **Research papers**: 35 (13 directly about backporting/migration, 10 about APR/bug fixing, 6 about vulnerability patching, 6 about benchmarks/evaluation)
- **OSS releases/tools**: 8
- **Blog posts / industry news**: 12
- **Timeframe coverage**: Core items from Dec 2025 – Feb 2026; some adjacent items from late 2025 included for context

### Items most strictly within December 2025 – February 2026

The following items were published, released, or announced *specifically* within the Dec 2025 – Feb 2026 window:

**Research papers (by arxiv/publication date)**:
- BackportBench (Dec 2025)
- DynaFix (Dec 31, 2025)
- Co-PatcheR (NeurIPS Dec 2025)
- MigGPT (NeurIPS Dec 2025)
- Autonomous Issue Resolver (Dec 2025)
- ContextBranch (Dec 2025)
- PatchIsland (Jan 2026)
- LSGEN (Jan 2026)
- RAG + Multi-Tool Secure Code Gen (Jan 2026)
- Every Maintenance Has Its Exemplar (Feb 2026)
- Persistent Human Feedback for Secure Code (Feb 2026)

**Blog posts and news**:
- Linux Kernel AI Guidelines added to README (Dec 14, 2025)
- GKH: Linux Kernel Security Work (Jan 2, 2026)
- GKH: Linux CVE Assignment Process (Feb 16, 2026)
- Qualys AI Patch Reliability Scoring (Feb 18, 2026)
- Gitar.ai Autonomous Merge Conflict Resolution (Dec 2025)

**OSS releases**:
- korthout/backport-action v3.2.0 (Feb 23, 2026)
- Moderne/OpenRewrite CLI v3.54–v3.56 (Dec 2025 – Jan 2026)
- AUTOSEL v2 in active production use (ongoing)
