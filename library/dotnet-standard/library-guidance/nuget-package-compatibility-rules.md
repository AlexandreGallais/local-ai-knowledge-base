---
title: "NuGet package compatibility rules (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/library-guidance/nuget-package-compatibility-rules.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# NuGet package compatibility rules

NuGet packages are the primary distribution mechanism for .NET libraries. To ensure that consumers can reliably update packages and use them across frameworks and versions, package authors must follow a set of compatibility rules. These rules ensure that newer versions of a package can replace older versions without breaking applications at build time or runtime.

This article describes the compatibility rules that apply to NuGet packages, with specific attention to framework compatibility, assembly compatibility, dependency compatibility, and assembly versioning.

## Compatible frameworks must provide compatible assemblies

NuGet packages can target multiple frameworks by including assemblies for different target framework monikers (TFMs). When a package supports multiple frameworks, there is an implied compatibility relationship between those frameworks. Specifically, newer or more specific frameworks are *compatible with* older or more general ones. For example:

- `net8.0` is compatible with `netstandard2.0`
- `net462` (.NET Framework 4.6.2) is compatible with `netstandard2.0`
- `net9.0` is compatible with `net8.0`

When a consumer's project targets a framework that isn't directly included in a package, NuGet selects the *best matching* compatible framework from the package. For details on how this selection works, see NuGet Target Frameworks. For example, a `net8.0` application consuming a package that contains only a `netstandard2.0` assembly will use that `netstandard2.0` assembly. If the package also contains a `net8.0` assembly, that more specific assembly is used instead.

This framework selection has a direct impact on compatibility. When another library compiles against your package for a particular target framework, that library depends on any compatible build of your package presenting the same (compatible) API surface at both compile time and runtime. If a consumer compiles against the `netstandard2.0` assembly but the application runs with the `net8.0` assembly (or vice versa), both assemblies must expose a compatible API surface. Otherwise, the consumer might encounter `MissingMethodException` or `TypeLoadException` at runtime.

✔️ DO ensure that assemblies for compatible frameworks within the same package expose the same (or a superset of) API surface.

✔️ CONSIDER enabling Package Validation to automatically check for API inconsistencies across TFMs:

```xml
<PropertyGroup>
  <EnablePackageValidation>true</EnablePackageValidation>
</PropertyGroup>
```

> The compatible framework in package validator checks, for example, that your `netstandard2.0` assembly and `net8.0` assembly don't have API inconsistencies.

For more information about framework compatibility, see .NET Standard and Target frameworks in SDK-style projects.

## Assembly compatibility rules

These rules apply whenever one assembly must be compatible with another—whether it's a newer version of the same assembly replacing a previous version, or an assembly for a more specific framework (such as `net8.0`) that can be substituted for a more general one (such as `netstandard2.0`) within the same package.

For an assembly to be considered *compatible*, it must meet two requirements:

1. **Equal or higher assembly version.** The assembly version (`AssemblyVersionAttribute`) must be greater than or equal to the previous version.

1. **No breaking API changes.** The assembly must not remove or change public API in any binary-breaking way. This means no removal of public types or members, no changes to method signatures, and no other changes that would cause a `MissingMethodException`, `MissingMemberException`, or `TypeLoadException` at runtime.

### Assembly versions

❌ DO NOT decrease the assembly version of a package across releases.

> Decreasing an assembly version breaks the runtime's ability to load the correct assembly and can cause `FileLoadException` errors at runtime. Assembly versions are used by the runtime to resolve which assembly to load. When a library is compiled against assembly version 2.0.0.0, the runtime requires that version or higher to be present. If a newer package ships with a lower assembly version, any library that was compiled against the higher version fails to load.
>
> While it's technically possible to work around this with a binding redirect or an `AssemblyResolve` handler to redirect the higher version to the lower one, this is always a breaking change in practice. The higher assembly version exists because it shipped with newer API and bug fixes that consumers have come to depend on. Redirecting to an older assembly means those APIs and fixes are no longer present, leading to `MissingMethodException` or incorrect behavior at runtime.

### Binary breaking changes

❌ AVOID binary breaking changes to your package's public API.

> Binary breaking changes—changes that cause previously compiled code to fail at runtime—might be permissible across major package versions, but authors should understand the ecosystem impact. Any library in the ecosystem that depends on your package also exposes your API surface transitively. A binary breaking change in your package can break consumers of those downstream libraries, even if they don't directly reference your package.

The .NET libraries maintain a very high bar for binary compatibility. For a detailed list of what constitutes a breaking change, see the breaking change rules in the dotnet/runtime repository.

✔️ CONSIDER using Package Validation with a baseline version to automatically detect binary breaking changes between releases:

```xml
<PropertyGroup>
  <EnablePackageValidation>true</EnablePackageValidation>
  <PackageValidationBaselineVersion>1.0.0</PackageValidationBaselineVersion>
</PropertyGroup>
```

> You can also use the Microsoft.DotNet.ApiCompat.Tool to compare assemblies or packages outside of the build process.

## Dependency compatibility rules

The dependencies declared by a NuGet package are part of its public contract. When a consumer installs your package, they also get all of its dependencies. Dropping a dependency in a newer version of your package can break consumers who rely on types from that dependency being present at runtime.

❌ AVOID removing package dependencies between compatible versions of the package or between compatible target frameworks within the same package.

> Dropping a dependency can cause runtime failures for consumers who rely on types from that dependency, even if your own code no longer uses it directly. Dropping a dependency is more reasonable across major version boundaries. Unlike binary breaking changes, a dropped dependency can be mitigated by the consuming application without recompiling intermediate libraries—the application can simply add a direct reference to the removed dependency.

### Polyfill package dependencies (Microsoft.Bcl.\*)

One place where the .NET libraries intentionally drop dependencies is for *polyfill packages* such as `Microsoft.Bcl.AsyncInterfaces`, `Microsoft.Bcl.HashCode`, and `Microsoft.Bcl.Memory`. These packages provide functionality on older frameworks (such as .NET Standard 2.0 and .NET Framework) that is built into newer .NET versions.

✔️ CONSIDER including polyfill dependencies only for older TFMs and omitting them for TFMs where the functionality is provided by the framework itself.

```xml
<ItemGroup Condition="'$(TargetFramework)' == 'netstandard2.0'">
  <PackageReference Include="Microsoft.Bcl.AsyncInterfaces" Version="8.0.0" />
</ItemGroup>
<!-- No dependency needed for net8.0, where IAsyncEnumerable is built-in -->
```

> When a polyfill dependency is dropped for a newer TFM, make sure that the package includes a TFM-specific assembly for that framework. Otherwise, consumers on the newer framework might resolve the `netstandard2.0` assembly, which still expects the polyfill at runtime. Multi-targeting with explicit TFM-specific assets avoids this problem.

## Assembly versioning

Assembly versions are distinct from NuGet package versions. While package versions follow Semantic Versioning (SemVer) conventions, assembly versions are four-part version numbers (`Major.Minor.Build.Revision`) used by the .NET runtime to resolve and load assemblies.

The assembly version is embedded in compiled references. When library A is compiled against version 2.0.0.0 of library B, the runtime requires that library B's assembly version be 2.0.0.0 or higher at runtime. This binding behavior is what makes assembly version changes important for package compatibility.

✔️ DO change the assembly version with each release of your package.

> This is essential to ensure loading of patched binaries, particularly on .NET Framework where the GAC and binding redirect behavior require version changes for correct assembly resolution.

### Assembly versioning on .NET Framework

On .NET Framework, assembly versioning has additional implications due to the runtime's loading behavior:

- **Global Assembly Cache (GAC) preference.** The .NET Framework loader always prefers an assembly from the GAC over an app-local copy. Packages that do not change their assembly version across releases cannot guarantee that serviced (patched) versions will be loaded on .NET Framework, because the GAC might contain an older copy with the same assembly version.

- **Binding redirects are required.** The .NET Framework loader requires binding redirects to unify different assembly versions. When an application consumes multiple packages that depend on different versions of a shared library, binding redirects tell the runtime to load a single (higher) version for all callers.

✔️ DO design your .NET Framework applications to support binding redirects for any assembly from NuGet packages.

> Without binding redirects, an application might be unable to update a mid-stack library in the event of a critical security update. Enable `<AutoGenerateBindingRedirects>` in your application project to have the build system automatically generate the necessary binding redirects.
