---
name: license-compliance
description: "Checks the licences of dependencies being added or updated against the organisation's policy. Use when adding or upgrading a dependency, when a licence report is requested, when copying code from another project, or when a package has no clear licence."
metadata:
  id: SEC-07
  stars: "2"
  nature: process
  mode: B
  wave: V3
  load: auto
---

# Licence compliance

**Core rule:** a dependency enters only if its licence (and its new transitive dependencies' licences) are allowed by the policy; unknown means not allowed until checked.

## Procedure

1. List the new or updated packages and their transitive additions (lockfile diff).
   - Check: the list is complete.
2. Read each licence from the package metadata or its `LICENSE` file.
   - Check: each package has an SPDX identifier or "unknown".
3. Compare with the policy table below.
   - Check: each package is allowed, needs review, or is refused.
4. Report: allowed list, items to review, refused items with alternatives.
   - Check: the human decided on review items.

## Policy

<!-- FILL: what=the organisation's licence policy (allowed, review, forbidden); find=ask the human or the internal policy document; verify=the policy is written here as three lists of SPDX identifiers -->

<!-- FILL: what=licence report tools available offline per ecosystem; find=command -v license-checker pip-licenses cargo-deny and the build plugins; verify=one report runs on the project without network -->

## Stop and ask the human if

- A licence is unknown, copyleft in a distributed product, or not in the policy.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "It is on the mirror, so it is allowed." | The mirror does not check licences against the policy. |
| "Only direct dependencies matter." | Transitive ones are shipped too. |

## Definition of done

- [ ] Every new package's licence identified and checked against the policy; review items decided.

## Local completion checklist

- [ ] Licence policy
- [ ] Offline licence tools
