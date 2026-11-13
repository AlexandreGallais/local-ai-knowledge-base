---
title: "MSTEST0005: Test context property should have valid layout"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/mstest-analyzers/mstest0005.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MSTEST0005: Test context property should have valid layout

| Property                            | Value                                              |
|-------------------------------------|----------------------------------------------------|
| **Rule ID**                         | MSTEST0005                                         |
| **Title**                           | Test context property should have valid layout     |
| **Category**                        | Usage                                              |
| **Fix is breaking or non-breaking** | Non-breaking                                       |
| **Enabled by default**              | Yes                                                |
| **Default severity**                | Warning                                            |
| **Introduced in version**           | 3.2.0                                              |
| **Is there a code fix**             | Yes                                                |

## Cause

A `TestContext` property is static, or isn't eligible for automatic injection and isn't assigned through a supported constructor.

## Rule description

For automatic property injection, MSTest locates the `TestContext` property by name and assigns it after the test-class constructor runs, before per-test initialization. The property requirements follow from that assignment:

| Requirement | Reason |
|-------------|--------|
| Use a property, not a field. | MSTest's automatic injection locates a property. It doesn't assign a field with the same name. |
| Name the property `TestContext`, with that exact capitalization. | The runtime lookup uses this case-sensitive name, rather than searching for any member whose type is `TestContext`. |
| Declare a public, readable property of type `TestContext`. | MSTest looks up a public property and supplies a `TestContext` object. `[DiscoverInternals]` doesn't relax this property-injection requirement. |
| Use an instance property, not a static property. | Each test execution receives its own context. A static property would share one context between tests, including tests that run concurrently. |
| Provide a setter; it can be private. | MSTest must assign the context after construction. A getter-only property can't receive automatic property injection. |

Starting with MSTest 3.6, a test class can instead receive `TestContext` through its constructor. If you assign that parameter to a field or property yourself, the automatic property-injection requirements don't apply to that assignment. Constructor injection also lets you use a `readonly` field or a getter-only property. See Access the TestContext object.

## How to fix violations

Ensure that the `TestContext` property matches the required layout described above.

## When to suppress warnings

Do not suppress a warning from this rule. Ignoring this rule will result in the `TestContext` not being injected by MSTest, thus resulting in `NullReferenceException` or inconsistent state when using the property.

## Suppress a warning

If you just want to suppress a single violation, add preprocessor directives to your source file to disable and then re-enable the rule.

```csharp
#pragma warning disable MSTEST0005
// The code that's violating the rule is on this line.
#pragma warning restore MSTEST0005
```

To disable the rule for a file, folder, or project, set its severity to `none` in the configuration file.

```ini
[*.{cs,vb}]
dotnet_diagnostic.MSTEST0005.severity = none
```

For more information, see How to suppress code analysis warnings.
