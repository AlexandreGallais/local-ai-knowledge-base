---
title: "MSTEST0028: Use Async suffix for async methods suppressor"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/mstest-analyzers/mstest0028.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MSTEST0028: Use Async suffix for async methods suppressor

| Property                            | Value                                    |
|-------------------------------------|------------------------------------------|
| **Rule ID**                         | MSTEST0028                               |
| **Title**                           | Suppress VSTHRD200 for test fixture methods |
| **Category**                        | Suppressor                               |
| **Introduced in version**           | 3.5.0                                    |

## Suppressor description

Suppress the VSTHRD200: Use Async suffix for async methods diagnostic for test fixture methods.

Fixture attributes identify the lifecycle phase, and the method's return type tells MSTest whether to await the callback. Ordinary callers don't select these callbacks by name. An `Async` suffix doesn't help the runner decide when or how to invoke them, so the suppressor lets fixture names follow your project's lifecycle naming convention.

## When to disable suppressor

.NET suppressors cannot be disabled.
