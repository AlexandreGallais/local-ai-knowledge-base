---
title: "Modules - Reference (part 3 of 6)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/modules-reference/Reference.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# Modules - Reference (part 3 of 6)

## The `moduleResolution` compiler option

This section describes module resolution features and processes shared by multiple `moduleResolution` modes, then specifies the details of each mode. See the _Module resolution_ theory section for more background on what the option is and how it fits into the overall compilation process. In brief, `moduleResolution` controls how TypeScript resolves _module specifiers_ (string literals in `import`/`export`/`require` statements) to files on disk, and should be set to match the module resolver used by the target runtime or bundler.
