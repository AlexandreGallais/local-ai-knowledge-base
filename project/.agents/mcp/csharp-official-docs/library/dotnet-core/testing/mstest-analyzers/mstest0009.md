---
title: "MSTEST0009: TestCleanup method should have valid layout"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/mstest-analyzers/mstest0009.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSTEST0009: TestCleanup method should have valid layout

| Property                            | Value                                       |
|-------------------------------------|---------------------------------------------|
| **Rule ID**                         | MSTEST0009                                  |
| **Title**                           | TestCleanup method should have valid layout |
| **Category**                        | Usage                                       |
| **Fix is breaking or non-breaking** | Non-breaking                                |
| **Enabled by default**              | Yes                                         |
| **Default severity**                | Warning                                     |
| **Introduced in version**           | 3.3.0                                       |
| **Is there a code fix**             | Yes                                         |

## Cause

A method marked with `[TestCleanup]` should have valid layout.

## Rule description

MSTest calls `[TestCleanup]` on the test-class instance after the test method. The callback releases or restores that test's state:

| Requirement | Reason |
|-------------|--------|
| The method is `public`. | Public methods form MSTest's lifecycle discovery contract. `[DiscoverInternals]` permits an internal declaring class, not an internal lifecycle method. |
| The method isn't `static`. | Cleanup needs access to the instance fields and `TestContext` of the test that just ran. |
| The method is ordinary and isn't `abstract`. | MSTest needs a callable method body, not a special member with language-defined invocation rules. |
| The method isn't generic. | Lifecycle callbacks don't receive test-data arguments from which MSTest could infer method type arguments. |
| The method has no parameters. | MSTest invokes this callback without arguments. Use the instance's `TestContext` for per-test information. |
| The return type is `void`, `Task`, or `ValueTask`. | An awaitable return value lets MSTest finish asynchronous cleanup before it proceeds with the remaining lifecycle steps. |
| The method isn't `async void`. | Without an awaitable result, cleanup could outlive the test lifecycle, and later exceptions couldn't be reliably recorded as cleanup failures. |

The declaring type supplies the test fixture that owns these callbacks:

- Use a `class` so MSTest can associate the callbacks with a test-class hierarchy.
- Use a `public` class, or an `internal` class with `[assembly: DiscoverInternals]`, to meet MSTest's type-discovery contract.
- Use a non-static class for these fixtures. Test methods need a test-class instance, even when a class-level lifecycle callback is static.
- Mark a sealed class with `[TestClass]` or a derived attribute. A sealed class can't supply inherited callbacks to another test class, so it must identify itself as the test container.

## How to fix violations

Ensure that the method matches the layout described above.

## When to suppress warnings

Do not suppress a warning from this rule. If you ignore this rule, flagged instances will be either skipped or result in runtime error.

## Suppress a warning

If you just want to suppress a single violation, add preprocessor directives to your source file to disable and then re-enable the rule.

```csharp
#pragma warning disable MSTEST0009
// The code that's violating the rule is on this line.
#pragma warning restore MSTEST0009
```

To disable the rule for a file, folder, or project, set its severity to `none` in the configuration file.

```ini
[*.{cs,vb}]
dotnet_diagnostic.MSTEST0009.severity = none
```

For more information, see How to suppress code analysis warnings.
