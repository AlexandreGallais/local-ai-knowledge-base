---
title: "Breaking Changes"
tool: "vite"
version: "8.3"
source: "https://github.com/vitejs/vite/blob/b39e6e63dcbfc3cf4be871acf3554efbd6d0e268/docs/changes/index.md"
commit: "b39e6e63dcbfc3cf4be871acf3554efbd6d0e268"
license: "MIT"
---

# Breaking Changes

List of breaking changes in Vite including API deprecations, removals, and changes. Most of the changes below can be opt-in using the `future` option in your Vite config.

## Planned

These changes are planned for the next major version of Vite. The deprecation or usage warnings will guide you where possible, and we're reaching out to framework, plugin authors, and users to apply these changes.

- `this.environment` in Hooks
- HMR `hotUpdate` Plugin Hook
- SSR Using `ModuleRunner` API

## Considering

These changes are being considered and are often experimental APIs that intend to improve upon current usage patterns. As not all changes are listed here, please check out the Experimental Label in Vite GitHub Discussions for the full list.

We don't recommend switching to these APIs yet. They are included in Vite to help us gather feedback. Please check these proposals and let us know how they work in your use case in each's linked GitHub Discussions.

- Move to Per-environment APIs
- Shared Plugins During Build

## Past

The changes below have been done or reverted. They are no longer relevant in the current major version.

- _No past changes yet_
