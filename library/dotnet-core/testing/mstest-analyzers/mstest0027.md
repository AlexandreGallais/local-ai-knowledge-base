---
title: "MSTEST0027: Use Async suffix for async methods suppressor"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/mstest-analyzers/mstest0027.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MSTEST0027: Use Async suffix for async methods suppressor

| Property                            | Value                                    |
|-------------------------------------|------------------------------------------|
| **Rule ID**                         | MSTEST0027                               |
| **Title**                           | Suppress VSTHRD200 for test methods      |
| **Category**                        | Suppressor                               |
| **Introduced in version**           | 3.5.0                                    |

## Suppressor description

Suppress the VSTHRD200: Use Async suffix for async methods diagnostic for test methods.

The `Async` suffix helps callers recognize APIs that they need to await. MSTest invokes test methods through the test runner, which recognizes their return types and awaits them without relying on their names. Test names can therefore describe the behavior under test without adding an `Async` suffix solely to satisfy a call-site naming convention.

## When to disable suppressor

.NET suppressors cannot be disabled.
