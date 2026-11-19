---
name: security-audit
description: "Manual: run only when the user explicitly asks for /security-audit. Audits a repository for security problems in phases - reconnaissance, hunting by attack class, independent validation of each finding, report."
license: MIT
metadata:
  id: SEC-04
  stars: "2"
  nature: process
  mode: R
  wave: V3
  load: manual
---

# Security audit

**Core rule:** every reported finding is validated by a second look with a concrete path from attacker input to impact; unvalidated suspicions are listed apart.

## Procedure

1. Reconnaissance: entry points (routes, CLI, files, messages), trust boundaries, assets, dependencies.
   - Check: a map of inputs and what they reach.
2. Hunt by attack class: injection, path traversal, deserialisation, authentication and authorisation, secrets, SSRF, resource exhaustion, supply chain.
   - Check: each class searched, with what was found or "none".
3. Validate each candidate: trace the input to the sink, confirm no check stops it, write the impact.
   - Check: each finding has input, path, sink, impact.
4. Rate each finding (critical, high, medium, low) and propose a fix.
   - Check: each finding has a rating and a fix.
5. Write `docs/security/audit-<YYYY-MM-DD>.md`; keep it out of public places if the repository is public.
   - Check: the report exists; nothing exploitable is posted publicly.

## Stop and ask the human if

- A critical finding is confirmed: report it at once, before finishing the audit.
- Testing a finding would touch a live system.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Report every pattern match." | Unvalidated matches drown the real issues. |
| "Try the exploit on the server." | Never on live systems; reason on the code. |

## Definition of done

- [ ] All attack classes searched; each finding validated, rated, with a fix; report written.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
