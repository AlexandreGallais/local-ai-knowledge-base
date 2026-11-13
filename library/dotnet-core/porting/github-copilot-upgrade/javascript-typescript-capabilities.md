---
title: "JavaScript and TypeScript upgrade capabilities"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/porting/github-copilot-upgrade/javascript-typescript-capabilities.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# JavaScript and TypeScript upgrade capabilities

GitHub Copilot upgrade provides workflows for common JavaScript and TypeScript maintenance tasks. Describe the result that you want, and the agent selects the relevant workflow and project-specific guidance.

## Upgrade workflows

| Capability | Use it to | Example prompt |
|---|---|---|
| Dependency upgrade | Update selected npm packages or all project dependencies and repair breaking changes. | _"Upgrade all dependencies in this project."_ |
| TypeScript compiler upgrade | Move the TypeScript compiler through major versions and resolve new compiler errors at each step. | _"Upgrade TypeScript to version 7."_ |
| Runtime validation | Compile, build, test, run, and inspect an application before or after an upgrade. | _"Validate this application."_ |
| Dependabot update validation | Validate a JavaScript or TypeScript dependency update that Dependabot already selected and applied. | This workflow runs as part of a configured Dependabot update. |

## Framework-specific guidance

During a dependency upgrade, the agent can detect supported frameworks and apply migration guidance for their package relationships and breaking changes. The guidance can define required peer packages, package groups that must move together, codemods, and checks for individual major-version transitions.

The available guidance evolves independently from the top-level workflow. Ask the agent to assess the repository when you need to know which framework-specific guidance applies to the current project.

## Validation behavior

Dependency and compiler upgrades include pre-upgrade and post-upgrade validation. Depending on the project, the agent can use compilation, bundler builds, tests, command-line execution, server startup, endpoint probes, and browser flows. For more information, see Validate a JavaScript or TypeScript application.

## Related content

- Upgrade JavaScript and TypeScript projects
- Upgrade JavaScript and TypeScript dependencies
- Upgrade the TypeScript compiler
