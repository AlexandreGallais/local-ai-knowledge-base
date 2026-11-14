---
title: "NuGet package compatibility rules (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/library-guidance/nuget-package-compatibility-rules.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# NuGet package compatibility rules (part 2 of 2)

## Assembly versioning for .NET libraries that overlap with shared frameworks

Some .NET packages ship assemblies that also exist in .NET shared frameworks. Examples include packages like `System.Text.Json` and `System.Collections.Immutable`, among others. The specific set of packages that overlap with a given shared framework varies by release and is not a fixed or documented list. These packages are unique: they provide APIs that are also available in .NET without a package reference, but they allow applications targeting older frameworks to use newer APIs.

### How conflict resolution and package pruning work

To support these overlapping packages, the .NET SDK and runtime include several features:

- **Conflict resolution.** Conflict resolution occurs at two levels, both following the same principle: prefer the newer version, and prefer the framework's copy when versions are equal.
  - At **build time**, the SDK's `ResolvePackageFileConflicts` task compares assemblies from packages against those provided by the shared framework and selects the winner for the application's output.
  - At **runtime**, the .NET host performs the same logic when probing for assemblies, as described in the assembly conflict resolution design document.

- **NuGet package pruning.** The SDK can prune packages from the dependency graph when the shared framework already provides the same functionality. This was introduced as an opt-in feature in the .NET 9 SDK and is enabled by default in the .NET 10 SDK for projects targeting .NET 10. Package pruning reduces restore time, shrinks dependency graphs, and eliminates false positives from vulnerability scanners like NuGet Audit.

These features allow packages to be used when needed on older frameworks and transparently replaced by the shared framework on newer ones.

### Assembly version policy for shared framework packages

Packages that overlap with .NET shared frameworks follow a special assembly versioning policy:

- **The assembly version is held constant at `Major.Minor.0.0`** for a given major/minor release. For example, all 8.0.x versions of `System.Text.Json` ship with assembly version `8.0.0.0`. This ensures that the package's assembly can be transparently replaced by the shared framework's copy of the same major/minor version.

- **.NET Standard assemblies** in these packages follow the same rule, since they might run on any compatible framework (including .NET itself).

- **.NET Framework assemblies** in these packages are the exception—they *do* increment their assembly version with each servicing release. This is necessary because .NET Framework's GAC and binding redirect behavior requires version changes to guarantee that patched assemblies are loaded. As a result, the .NET Framework assemblies in these packages are the only ones whose assembly version changes across servicing releases.

#### Example: System.Text.Json 8.0.5

The following table shows the assembly versions inside the `System.Text.Json` 8.0.5 NuGet package. Notice that the `net462` assembly version is `8.0.0.5`, while all other TFMs remain at `8.0.0.0`:

| TFM | Assembly version |
|-----|-----------------|
| `net462` | 8.0.0.5 |
| `net6.0` | 8.0.0.0 |
| `net7.0` | 8.0.0.0 |
| `net8.0` | 8.0.0.0 |
| `netstandard2.0` | 8.0.0.0 |

This is intentional. The `netstandard2.0` assembly version is *lower* than the `net462` assembly version in the same package. This is safe because these two assemblies never substitute for each other at runtime—NuGet selects the `net462` assembly for .NET Framework projects and the `netstandard2.0` assembly for other compatible frameworks.

The `net462` assembly must increment because .NET Framework applications need binding redirects to unify callers onto the serviced version, and the GAC requires a version change to prefer the app-local copy. The `net6.0`, `net7.0`, and `net8.0` assemblies stay at `8.0.0.0` so they can be transparently replaced by the shared framework's copy. The `netstandard2.0` assembly also stays at `8.0.0.0` because it might run on modern .NET, where the same conflict resolution and pruning behavior applies.

> **Note:**
> Applications on .NET Framework that consume these packages will have binding redirects automatically generated when `<AutoGenerateBindingRedirects>` is enabled. This is expected and required for correct servicing behavior.

This policy ensures that:

- Applications targeting modern .NET get the shared framework's copy of the assembly seamlessly.
- Applications targeting .NET Framework get properly serviced assemblies with correct binding behavior.
- Libraries targeting .NET Standard work correctly on both platforms.

### Packages without the shared framework constraint

Packages that don't overlap with a shared framework are free to increment their assembly version with every release. This is the typical and recommended pattern, as it ensures that patched binaries are always loaded correctly regardless of the target framework.

## Summary

The following recommendations summarize the compatibility rules for NuGet packages:

✔️ DO ensure that assemblies for compatible frameworks expose the same (or a superset of) API surface.

❌ DO NOT decrease the assembly version of a package across releases.

❌ AVOID binary breaking changes to your package's public API.

❌ AVOID removing package dependencies between compatible versions or compatible target frameworks.

✔️ CONSIDER omitting polyfill dependencies (Microsoft.Bcl.\*) for TFMs where the functionality is provided by the framework.

✔️ DO change the assembly version with each release, unless the package overlaps with a .NET shared framework.

✔️ DO design your .NET Framework applications to support binding redirects for any assembly from NuGet packages.

✔️ CONSIDER enabling Package Validation with a baseline version to automatically detect breaking changes.

## See also

- Versioning and .NET libraries
- Breaking changes and .NET libraries
- Dependencies and .NET libraries
- .NET Package Validation overview
- Microsoft.DotNet.ApiCompat.Tool
- .NET Standard
- Target frameworks in SDK-style projects
- Breaking change rules (dotnet/runtime)
- Assembly conflict resolution design
- Redirecting assembly versions (.NET Framework)
