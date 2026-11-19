---
name: threat-modeling
description: "Manual: run only when the user explicitly asks for /threat-modeling. Builds a threat model of a system or a feature from its code - assets, trust boundaries, attacker capabilities, threats, mitigations - in a short Markdown file."
license: Apache-2.0
metadata:
  id: SEC-05
  stars: "2"
  nature: process
  mode: R
  wave: V3
  load: manual
---

# Threat modeling

**Core rule:** ground every threat in the repository (a route, a file, a message) and pair it with an existing or proposed mitigation.

## Procedure

1. Define the scope: the system or feature, its users, what is out of scope.
   - Check: scope written in three lines.
2. List assets (data, credentials, availability) and trust boundaries (network, process, user roles), from the code.
   - Check: each boundary has a file or config location.
3. For each boundary, list threats with STRIDE (spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege).
   - Check: each threat names the boundary and the asset.
4. For each threat, find the mitigation in the code or propose one; rate the residual risk.
   - Check: each threat has a mitigation and a rating.
5. Write `docs/security/threat-model-<topic>.md` with a table.
   - Check: the file exists and the human reviewed it.

## Stop and ask the human if

- The assets or the attacker profile are not known.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "List generic threats." | Tie each threat to a place in this code. |
| "Mitigations later." | A threat without mitigation status is not actionable. |

## Definition of done

- [ ] Assets, boundaries, threats and mitigations grounded in the code; file written and reviewed.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
