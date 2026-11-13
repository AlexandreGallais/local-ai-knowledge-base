---
title: "MSTEST0047: Unused TestContext parameter suppressor."
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/mstest-analyzers/mstest0047.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MSTEST0047: Unused TestContext parameter suppressor

| Property                            | Value                                                     |
|-------------------------------------|-----------------------------------------------------------|
| **Rule ID**                         | MSTEST0047                                                |
| **Title**                           | Suppress IDE0060 for the TestContext parameter            |
| **Category**                        | Suppressor                                                |
| **Introduced in version**           | 3.10.0                                                    |

## Suppressor description

Suppress the IDE0060: Remove unused parameter diagnostic for the `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext` parameter of fixture methods.

MSTest lets you receive the `TestContext` as a parameter of fixture methods that are marked with `Microsoft.VisualStudio.TestTools.UnitTesting.AssemblyInitializeAttribute`, `Microsoft.VisualStudio.TestTools.UnitTesting.ClassInitializeAttribute`, `Microsoft.VisualStudio.TestTools.UnitTesting.GlobalTestInitializeAttribute`, or `Microsoft.VisualStudio.TestTools.UnitTesting.GlobalTestCleanupAttribute`. Because the parameter is required by MSTest even when your method body doesn't use it, IDE0060 would otherwise incorrectly flag it as unused.

## When to disable suppressor

.NET suppressors cannot be disabled.
