---
title: "MSTEST0073: Prefer a constant for the '[ResourceLock]' resource key"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/mstest-analyzers/mstest0073.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MSTEST0073: Prefer a constant for the '\[ResourceLock]' resource key

| Property                            | Value                                              |
|-------------------------------------|----------------------------------------------------|
| **Rule ID**                         | MSTEST0073                                          |
| **Title**                           | Prefer a constant for the '\[ResourceLock]' resource key |
| **Category**                        | Usage                                              |
| **Fix is breaking or non-breaking** | Non-breaking                                       |
| **Enabled by default**              | Yes                                                |
| **Default severity**                | Info                                               |
| **Introduced in version**           | 4.4.0                                              |
| **Is there a code fix**             | No                                                 |

## Cause

A `[ResourceLock]` attribute passes its resource key as a bare string literal instead of referencing a shared constant.

## Rule description

`[ResourceLock]` matches tests by exact, case-sensitive string equality of the resource key. A bare string literal fails open: a typo produces a different key, so the conflicting tests are no longer serialized and race silently instead of failing with a build error. Referencing a shared constant, such as a `WellKnownResources` member or your own `const`, makes typos a compile error and lets the compiler enforce that every test contending on the same resource uses the same key.

```csharp
[ResourceLock("database")] // Violation: bare string literal.
[TestMethod]
public void ReadsSharedSchema() { }
```

## How to fix violations

Reference a `WellKnownResources` member for process-global state, or declare and reference your own `const string`.

```csharp
private const string Database = "database";

[ResourceLock(Database)]
[TestMethod]
public void ReadsSharedSchema() { }
```

## When to suppress warnings

It's safe to suppress this warning if you intentionally use a literal resource key and are confident no other test in the assembly needs to coordinate on the same resource.

## Suppress a warning

If you just want to suppress a single violation, add preprocessor directives to your source file to disable and then re-enable the rule.

```csharp
#pragma warning disable MSTEST0073
// The code that's violating the rule is on this line.
#pragma warning restore MSTEST0073
```

To disable the rule for a file, folder, or project, set its severity to `none` in the configuration file.

```ini
[*.{cs,vb}]
dotnet_diagnostic.MSTEST0073.severity = none
```

For more information, see How to suppress code analysis warnings.

## See also

- ResourceLockAttribute
