---
id: 2025-12-01-monthly-002
slug: monthly-2025-11
number: 2
title: "Backporting.ai Digest – November 2025"
date: "2025-12-01"
author: "Nikita Ivanov"
authorUrl: "https://deistvitelnobesconechna.blog/"
summary: "This month's four papers all focus on automated program repair: history-aware patching, Ruby support, vulnerability benchmarks, and kernel driver migration."
entries:
  - title: "HAFixAgent: History-Aware Automated Program Repair Agent"
    url: https://arxiv.org/abs/2511.01047
    summary: Uses git-blame and version control history to improve multi-hunk patch generation; fixes 523/829 Java bugs, tripling prior best results.
    tags:
      - research
      - program-repair
      - LLM
      - agent
      - history-aware
      - git-blame
      - multi-hunk
  - title: "Collaborative Agents for Automated Program Repair in Ruby"
    url: https://arxiv.org/abs/2511.03925
    summary: Multi-agent system with test-driven feedback for Ruby program repair; achieves 67% fix rate on first attempt.
    tags:
      - research
      - program-repair
      - LLM
      - multi-agent
      - Ruby
      - test-driven
  - title: "PATCHEVAL: A New Benchmark for Evaluating LLMs on Patching Real-World Vulnerabilities"
    url: https://arxiv.org/abs/2511.11019
    summary: Multilingual benchmark of real security vulnerabilities across Go, JavaScript, and Python with sandbox-based patch validation.
    tags:
      - research
      - security
      - benchmark
      - LLM
      - vulnerability-repair
      - multilingual
      - patch-validation
  - title: "LLM-Driven Kernel Evolution: Automating Driver Updates in Linux"
    url: https://arxiv.org/abs/2511.18924
    summary: Multi-agent system for automatically migrating Linux kernel drivers across API changes; introduces a benchmark of real driver update scenarios.
    tags:
      - research
      - Linux-kernel
      - driver-maintenance
      - LLM
      - multi-agent
      - automated-patching
      - API-changes
---

## Mining Git History for Better Patches

[HAFixAgent](https://arxiv.org/abs/2511.01047) takes a page from how human developers actually debug: before writing a fix, look at who changed what and why. The system hooks into git-blame to surface version control history—previous commits, related changes, the evolution of the buggy code—and feeds this context into an agentic repair loop.

Multi-hunk bugs are where most automated repair tools stumble. When a fix requires coordinated edits across multiple locations, single-shot generation rarely gets it right. HAFixAgent addresses this by treating history as a first-class signal: if a function was refactored three commits ago and introduced a subtle regression, that commit diff becomes part of the repair context. The agent can trace the bug to its origin and reason about what the original author intended.

The evaluation uses Defects4J, the standard benchmark of real-world Java bugs collected from open-source projects. Across 854 bugs, 71.1% had accessible blame information, and 70.7% mapped to a single unique blame commit—repository history is both widely available and highly concentrated. HAFixAgent repaired 523 out of 829 common bugs. For comparison, the best prior LLM-based repair agent fixed only 164 of those same bugs—HAFixAgent more than triples that baseline. For the harder multi-hunk cases (371 bugs requiring coordinated edits across multiple locations), HAFixAgent fixed 175 compared to 133 for the previous best multi-hunk repair tool—a 29.9% improvement. The efficiency held too: incorporating historical context didn't significantly increase agent steps or token costs, and for the most complex multi-file-multi-hunk bugs, median costs were actually lower.

## Ruby Gets Its Own Repair System

Automated program repair has focused heavily on Java, Python, and C. Ruby's dynamic typing and metaprogramming make it a harder target. [RAMP](https://arxiv.org/abs/2511.03925) brings collaborative agents to Ruby with a test-driven feedback architecture.

The system splits responsibilities across specialized agents. One handles fault localization—identifying which methods and lines are likely buggy based on failing test cases. Another generates candidate patches. A third validates patches against the test suite and filters plausible fixes. The agents communicate through shared context, iteratively refining patches based on test feedback.

Evaluated on a multilingual code benchmark, RAMP fixes 67% of Ruby bugs on the first attempt—the first comprehensive evaluation of LLM-based repair on this language. The system converges quickly, typically within five iterations. Ablation studies confirm the key drivers: test generation and self-reflection are essential components. Without them, performance drops significantly. RAMP handles the full spectrum of failure modes—wrong answers, compilation errors, and runtime crashes—providing new insights into what makes multi-agent repair effective for dynamically-typed languages underserved by existing repair research.

## Benchmarking Vulnerability Patching Across Languages

How well do LLMs actually patch real vulnerabilities? [PATCHEVAL](https://arxiv.org/abs/2511.11019) provides a multilingual benchmark grounded in actual security vulnerabilities (the kind that get CVE identifiers and public disclosures), covering Go, JavaScript, and Python—languages underrepresented in existing vulnerability repair datasets. Most benchmarks focus on C/C++ or Java; PATCHEVAL addresses this gap with real-world vulnerabilities from modern web and systems programming ecosystems.

The benchmark categorizes each vulnerability by weakness type—input validation flaws, injection bugs, authentication bypasses, and so on. This enables fine-grained analysis of which weakness types LLMs handle well and where they fail. Input validation bugs might be straightforward; injection vulnerabilities requiring semantic understanding of data flow pose different challenges. The categorization lets researchers identify systematic blind spots rather than treating all vulnerabilities as equivalent.

PATCHEVAL includes sandbox-based patch validation rather than just checking syntactic correctness. Generated patches run against test suites and exploit-triggering inputs to verify they actually fix the vulnerability without breaking functionality. This catches the common failure mode where a patch "fixes" the bug by removing the vulnerable functionality entirely—a technically correct but practically useless repair.

The multilingual scope matters because vulnerabilities manifest differently across language ecosystems. A SQL injection in a Python web app has different fix patterns than an equivalent bug in a Go service. Cross-language benchmarks reveal whether repair capabilities transfer or whether models need language-specific fine-tuning.

## Keeping Drivers Alive Across Kernel Versions

Out-of-tree drivers face a maintenance treadmill: every kernel release potentially breaks API compatibility. A driver working on 5.15 might fail to compile on 6.1 because subsystem interfaces changed. [AUTODRIVER](https://arxiv.org/abs/2511.18924) automates this migration using multi-agent LLMs.

The system introduces DRIVEBENCH, a benchmark of real driver update scenarios extracted from Linux kernel evolution. Each case pairs a driver with its source kernel version and a target version where API changes broke compatibility. The benchmark captures the diversity of kernel API churn—renamed functions, restructured data types, deprecated interfaces, changed calling conventions. Unlike synthetic benchmarks, DRIVEBENCH draws from actual historical migrations that kernel maintainers performed manually, providing ground truth for evaluating automated approaches.

AUTODRIVER's multi-agent architecture separates concerns: one agent analyzes the API changes between kernel versions, another localizes which driver code needs updating, and a third generates the actual patches. This decomposition mirrors how kernel developers approach the problem—first understand what changed in the subsystem, then systematically update each affected callsite. The multi-agent design prevents any single model from being overwhelmed by the complexity of kernel code while allowing specialization.

The focus on drivers is strategic. Drivers constitute a huge fraction of kernel code—over 60% by some estimates—much of it maintained by small teams or individual developers who struggle to keep up with upstream churn. Automated migration could keep hardware support alive across kernel versions without requiring constant manual porting effort, particularly valuable for industrial and embedded systems locked to specific hardware.

