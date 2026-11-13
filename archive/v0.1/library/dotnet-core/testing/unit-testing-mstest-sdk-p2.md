---
title: "MSTest SDK configuration (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/unit-testing-mstest-sdk.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MSTest SDK configuration (part 2 of 2)

## Experimental features

The following MSTest 4.3 features are **experimental**. Their public APIs are subject to change, and they're surfaced behind experimental diagnostics. To opt in, acknowledge the corresponding diagnostic ID.

### Programmatic test filtering with `ITestFilter`

> **Note:**
> Introduced in MSTest 4.3.0 (experimental).

The experimental `ITestFilter` extension point, registered through `[TestFilterProviderAttribute]`, lets you decide programmatically whether each test runs, before any test class is loaded. This is useful for custom selection logic that can't be expressed with command-line filters.

Implement `ITestFilter.Filter(TestFilterContext)` to inspect metadata without loading the test class:

```csharp
public sealed class MyFilter : ITestFilter
{
    public TestFilterResult Filter(TestFilterContext context) =>
        context.DisplayName.Contains("Nightly", StringComparison.Ordinal)
            ? TestFilterResult.Run : TestFilterResult.Drop;
}
```

Return `TestFilterResult.Run` to run the test, `Drop` to omit it without a result, or `Skip(reason)` to report a skipped result. MSTest can call one filter instance concurrently, so implementations must be thread-safe. Command-line and test-explorer filters run before `ITestFilter`, while `[Ignore]` is evaluated afterward.

Starting with MSTest 4.4, .NET projects can use the generic, type-safe registration form `[assembly: TestFilterProvider<MyFilter>]`. The compiler then enforces that `MyFilter` implements `ITestFilter` and has a public parameterless constructor. The generic attribute isn't available for .NET Framework. For a multi-targeted project, select the generic or non-generic form with a target-framework preprocessor symbol.

```csharp
#if NET
[assembly: TestFilterProvider<MyFilter>]
#else
[assembly: TestFilterProvider(typeof(MyFilter))]
#endif
```

Starting with MSTest 4.4, the MSTEST0081 analyzer fully validates the non-generic registration form. For the generic form, it still reports generic filter types and assemblies that register more than one provider.

### `TestRun.Current` and planned tests

> **Note:**
> Introduced in MSTest 4.3.0 (experimental).

The experimental `TestRun.Current` API (from RFC 014) exposes information about the current run, including the set of planned tests, so extensions and fixtures can inspect what's scheduled to execute.

## Known limitations

The NuGet-provided MSBuild SDKs (including MSTest.Sdk) have limited tooling support when it comes to updating their version, meaning that the usual NuGet update and Visual Studio UI for managing NuGet packages doesn't work as expected. You'll need to manually update the version in the `global.json` file and in the project file. (This applies even if you use Dependabot due to issues dependabot-core#12824 and dependabot-core#8615.)

## See also

- MTP–related properties
- VSTest–related properties
