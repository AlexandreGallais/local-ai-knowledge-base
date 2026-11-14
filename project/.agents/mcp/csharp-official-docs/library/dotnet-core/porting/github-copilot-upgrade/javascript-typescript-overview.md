---
title: "Upgrade JavaScript and TypeScript projects with GitHub Copilot"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/porting/github-copilot-upgrade/javascript-typescript-overview.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Upgrade JavaScript and TypeScript projects with GitHub Copilot

GitHub Copilot upgrade can update npm dependencies, upgrade the TypeScript compiler, repair compatibility problems, and validate JavaScript and TypeScript applications. The agent detects the project structure and applies guidance for supported frameworks and libraries.

JavaScript-only projects don't need a `tsconfig.json`. For these projects, the agent preserves valid JavaScript and uses the project's own build and test scripts as part of validation.

## Choose an upgrade workflow

- To update one package, a group of packages, or all project dependencies, see Upgrade JavaScript and TypeScript dependencies.
- To move a project through TypeScript compiler versions, see Upgrade the TypeScript compiler.
- To check an application before or after an upgrade, see Validate a JavaScript or TypeScript application.
- To compare the available workflows, see JavaScript and TypeScript capabilities.

## What the agent validates

The agent establishes a baseline before it changes dependencies or the compiler. Based on the project, validation can include compilation, bundler builds, tests, command-line execution, server startup, endpoint checks, and browser flows. After the upgrade, the agent repeats the relevant checks and repairs regressions caused by the upgrade.

## Related content

- GitHub Copilot upgrade overview
- Install GitHub Copilot upgrade
- GitHub Copilot upgrade concepts
- Troubleshoot GitHub Copilot upgrade
