# BRIEF: ci-security-reports  (GL-12, 2 stars, V3)

## Final frontmatter (do not change)

```yaml
name: ci-security-reports
description: "Reads and handles the security reports of the GitLab pipeline - SAST, dependency scanning, secret detection, container scanning. Use when a pipeline shows security findings, when a security job fails, or when asked to triage vulnerabilities reported by CI."
metadata:
  id: GL-12
  stars: "2"
  nature: reference
  mode: C
  wave: V3
  load: auto
```

## Goal

A reference that tells how to read each security report the team's pipelines produce, how to triage findings, and the team's rules on fixing, dismissing or accepting them.

## Questions the skill must answer

1. Which security jobs run in the pipelines and where are their reports (artefacts, MR widget)?
2. How to read each report quickly (fields, severity)?
3. What are the team's rules: which severities block a merge, who may dismiss a finding?
4. How to fix the common findings (dependency upgrade, code change, secret rotation)?
5. How to record a false positive?

## Where to look (files, commands, people)

- .gitlab-ci.yml includes of security templates
- job artefacts of a recent pipeline (glab job artifact)
- the human: the triage rules

## Required sections

- Core rule in the first 10 lines.
- Procedure with an Action and a Check per step, or a reference table with the commands.
- Stop and ask the human if; Common mistakes; Definition of done.

## Acceptance tests

- Trigger: loads on "the SAST job reports 3 findings", "dependency scanning found a critical vulnerability", "secret detection failed on my MR"; does not load on "write a unit test", "rename a branch", "explain CVSS in general".
- Paired task: triage a planted dependency finding; with the skill the agent upgrades the dependency per policy and the finding disappears in the next pipeline.

## Human input required (yes/no, what)

Yes: the triage rules, blocking severities and who may dismiss findings.
