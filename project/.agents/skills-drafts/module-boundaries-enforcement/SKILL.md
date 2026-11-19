---
name: module-boundaries-enforcement
description: "Manual: run only when the user explicitly asks for /module-boundaries-enforcement. Enforces module boundaries with tools - dependency-cruiser, ArchUnit or lint rules - so forbidden imports fail the build."
license: MIT
metadata:
  id: ARC-07
  stars: "1"
  nature: tooling
  mode: R+B
  wave: V4
  load: manual
---

# Module boundaries enforcement

**Core rule:** each boundary rule is written as a tool rule that fails the build, with a test case that proves it catches a forbidden import.

## Procedure

1. Write the boundary rules in plain words with the human (which module may import which).
   - Check: the rules are approved.
2. Choose the tool for the language (table) from the internal mirror.
   - Check: the tool is installed.
3. Encode the rules (dependency-cruiser config, ArchUnit test, lint restricted-imports rule).
   - Check: the current code passes, or violations are listed for the human.
4. Prove each rule: add a forbidden import on a scratch branch and run the check.
   - Check: the check fails with the rule's message.
5. Add the check to the project's lint or test command and CI.
   - Check: CI runs it.

| Language | Tool |
| --- | --- |
| TypeScript, JavaScript | dependency-cruiser, or ESLint `no-restricted-imports` |
| Java | ArchUnit tests |
| C# | architecture tests (NetArchTest if allowed) or analyzers |
| Python | import-linter |

## This installation

<!-- FILL: what=boundary tool allowed and installed for the project's language; find=npm ls dependency-cruiser or the build files and ask the human; verify=the tool runs on the project and reports no crash -->

## Stop and ask the human if

- Existing violations are many: decide whether to fix or to allow them temporarily.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Document the boundaries in a README." | Unenforced rules erode. Make them fail the build. |
| "Rules without a failing case." | Prove each rule catches a violation. |

## Definition of done

- [ ] Approved rules encoded; each proven on a violation; check in CI.

## References

- `references/SOURCE.md`: upstream and licence of this skill.

## Local completion checklist

- [ ] Boundary tool
