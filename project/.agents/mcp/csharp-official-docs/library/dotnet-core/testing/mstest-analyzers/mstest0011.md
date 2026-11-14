---
title: "MSTEST0011: ClassCleanup method should have valid layout"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/mstest-analyzers/mstest0011.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSTEST0011: ClassCleanup method should have valid layout

| Property                            | Value                                        |
|-------------------------------------|----------------------------------------------|
| **Rule ID**                         | MSTEST0011                                   |
| **Title**                           | ClassCleanup method should have valid layout |
| **Category**                        | Usage                                        |
| **Fix is breaking or non-breaking** | Non-breaking                                 |
| **Enabled by default**              | Yes                                          |
| **Default severity**                | Warning                                      |
| **Introduced in version**           | 3.3.0                                        |
| **Is there a code fix**             | Yes                                          |

## Cause

A method marked with `[ClassCleanup]` should have valid layout.

## Rule description

MSTest calls `[ClassCleanup]` to release resources shared by a test class, rather than resources owned by one test-class instance:

| Requirement | Reason |
|-------------|--------|
| The method is `public`. | Public methods form MSTest's lifecycle discovery contract. `[DiscoverInternals]` permits an internal declaring class, not an internal lifecycle method. |
| The method is `static`. | Class cleanup belongs to the class's shared lifecycle and must not depend on a particular test instance. |
| The method is ordinary and isn't `abstract` or generic. | MSTest needs a method body it can invoke without special invocation rules or method type arguments. |
| The method has no parameters, or one `TestContext` parameter in MSTest 3.8 and later. | MSTest can invoke cleanup without arguments or supply the class-cleanup context. It doesn't supply arbitrary arguments or a test's data row. |
| The return type is `void`, `Task`, or `ValueTask`, and the method isn't `async void`. | MSTest must wait for asynchronous cleanup and observe its failures instead of leaving resource release to an unobserved operation. |
| An abstract or generic declaring class specifies `InheritanceBehavior.BeforeEachDerivedClass`. | The inheritance setting associates a base class's cleanup with the concrete derived classes that use its resources. |
| A sealed declaring class doesn't specify `InheritanceBehavior.BeforeEachDerivedClass`. | A sealed class can't have derived classes, so that inheritance setting has no lifecycle to apply to. |

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
#pragma warning disable MSTEST0011
// The code that's violating the rule is on this line.
#pragma warning restore MSTEST0011
```

To disable the rule for a file, folder, or project, set its severity to `none` in the configuration file.

```ini
[*.{cs,vb}]
dotnet_diagnostic.MSTEST0011.severity = none
```

For more information, see How to suppress code analysis warnings.
