---
title: "MSTEST0033: Non-nullable reference not initialized suppressor."
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/mstest-analyzers/mstest0033.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MSTEST0033: Non-nullable reference not initialized suppressor

| Property                            | Value                                    |
|-------------------------------------|------------------------------------------|
| **Rule ID**                         | MSTEST0033                               |
| **Title**                           | Suppress CS8618 for TestContext property |
| **Category**                        | Suppressor                               |
| **Introduced in version**           | 3.6.0                                    |

## Suppressor description

Suppress the CS8618: Non-nullable variable must contain a non-null value when exiting constructor. Consider declaring it as nullable. diagnostic for the `TestContext` property as its value is always initialized by the MSTest framework.

## When to disable suppressor

.NET suppressors cannot be disabled.
