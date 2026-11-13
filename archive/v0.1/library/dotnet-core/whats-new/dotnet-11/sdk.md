---
title: "What's new in the SDK and tooling for .NET 11 (part 1 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/whats-new/dotnet-11/sdk.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# What's new in the SDK and tooling for .NET 11

This article describes new features and enhancements in the .NET SDK for .NET 11. It was last updated for the general availability (GA) release. You can download .NET 11 here.

## SDK footprint

The .NET SDK installer size on Linux and macOS has been reduced by deduplicating assemblies using symbolic links. Duplicate `.dll` and `.exe` files are identified by content hash and replaced with symbolic links pointing to a single copy. This affects tarballs, `.pkg`, `.deb`, and `.rpm` installers.

Analysis of an early .NET 11 build found that 35% of the SDK directory consists of duplicate files. On Linux x64, that's 816 files totaling 140 MB on disk (53 MB compressed). By replacing duplicates with symbolic links, the Linux x64 archive drops significantly in size:

| Platform  | SDK artifact | .NET 10 size (MB) | Measured .NET 11 size (MB) | Reduction |
|-----------|--------------|-------------------|----------------------------|-----------|
| linux-x64 | tarball      | 230               | 189                        | 17.8%     |
| linux-x64 | deb          | 164               | 122                        | 25.6%     |
| linux-x64 | rpm          | 165               | 122                        | 26.0%     |
| linux-x64 | containers   | Varies            | Varies                     | 8–17%     |

The SDK is further trimmed because crossgen is skipped for assemblies that only exist under `DotnetTools/`. Assemblies that also exist outside `DotnetTools/` are still crossgen'd—they get the startup benefit and the duplicate is then removed—but assemblies unique to `DotnetTools/` are left as IL-only. On a `linux-x64` build, this reduces the SDK tarball by an additional 23.6 MB.

Windows deduplication isn't included.

## Code analysis and warnings

- Code analyzer improvements
- New SDK warnings

### Code analyzer improvements

#### CA1873: Reduced noise and improved messages

Two improvements were made to CA1873 (Avoid potentially expensive logging):

**Reduced false positives:** Property accesses, `GetType()`, `GetHashCode()`, and `GetTimestamp()` calls are no longer flagged. Diagnostics now apply only to Information-level logging and below by default, since warning, error, and critical code paths are rarely hot paths.

**Specific reasons in diagnostic messages:** The diagnostic message now includes why an argument was flagged, helping you prioritize which warnings to address:

```text
// Before
warning CA1873: Evaluation of this argument may be expensive and unnecessary if logging is disabled

// After
warning CA1873: Evaluation of this argument may be expensive and unnecessary if logging is disabled (method invocation)
```

The nine specific reasons are:

- Method invocation
- Object creation
- Array creation
- Boxing conversion
- String interpolation
- Collection expression
- Anonymous object creation
- Await expression
- With expression

#### Analyzer bug fixes

| Analyzer                                                              | Fix                                                          |
|-----------------------------------------------------------------------|--------------------------------------------------------------|
| CA1515 | Fixed false positive when C# extension members are present   |
| CA1034 | Fixed false positive when C# extension members are present   |
| CA1859 | Fixed improper handling of default interface implementations |

#### AnalysisLevel corrected for .NET 11

Projects with `AnalysisLevel=latest` were incorrectly using .NET 9 analyzer rules instead of the expected .NET 11 rules. This is now fixed.

### New SDK warnings

#### NETSDK1235: Custom .nuspec with PackAsTool

A new warning is emitted when a project sets `PackAsTool=true` and specifies a custom `NuspecFile` property. Tool packages require specific layout and identifier conventions that custom `.nuspec` files typically violate:

```text
warning NETSDK1235: .NET Tools do not support using a custom .nuspec file, but the nuspec file 'custom.nuspec' was provided. Remove the NuspecFile property from this project to enable packing it as a .NET Tool.
```

The pack operation still proceeds with a warning to avoid breaking existing projects.

## CLI workflow and developer productivity

- Solution filter CLI support
- File-based apps split across files
- Quoted values and item metadata in file-based directives
- File-based apps reuse Native AOT build outputs
- Pass <example-value> variables with dotnet run
- MSBuild properties in launch-profile arguments
- dotnet watch improvements
- Fish shell completions
- dotnet reference falls back to current directory
- dotnet reference support for file-based apps
- Launch settings notice moved to stderr
- dotnet format limits configuration discovery to included files
- Other CLI improvements

### Solution filter CLI support

`dotnet sln` can now create and edit solution filters (`.slnf`) directly from the CLI. Solution filters let large repositories load or build a subset of projects without changing the main solution. The supported operations mirror the existing `dotnet sln` commands:

```bash
dotnet new slnf --parent-solution MySolution.slnx --name Tests
dotnet sln Tests.slnf add tests/Tests/Tests.csproj
dotnet sln Tests.slnf add src/Lib/Lib.csproj
dotnet sln Tests.slnf list
dotnet sln Tests.slnf remove src/Lib/Lib.csproj
```

### File-based apps split across files

File-based apps now support an `#:include` directive, so you can move shared helpers into separate files without giving up the file-based workflow:

```csharp
#:include helpers.cs
#:include models/customer.cs

Console.WriteLine(Helpers.FormatOutput(new Customer()));
```

### Quoted values and item metadata in file-based directives

In a file-based app, a `#:property` directive can use a quoted value that contains spaces. The `#:package`, `#:project`, and `#:ref` directives also accept trailing `Name=Value` tokens that set MSBuild item metadata. The following example sets two quoted properties and uses the `Aliases` metadata on a package directive, so the app references the package through the resulting C# `extern alias`:

```csharp
#:property Company="Contoso Tools"
#:property AssemblyTitle="Contoso Directive Demo"
#:package user@example.com Aliases=CommandLine

extern alias CommandLine;
Console.WriteLine(typeof(CommandLine::System.CommandLine.RootCommand).Assembly.GetName().Name);
```

Run the file with `dotnet run Program.cs`. The quoted value becomes the generated assembly's `Company` metadata, and the `CommandLine` alias qualifies types from the `System.CommandLine` package. For the supported directives and the broader workflow, see File-based apps.

### File-based apps reuse Native AOT build outputs

The Native AOT command-line path can reuse existing build outputs when it runs an unchanged file-based app. Supported cached launches include `dotnet run --file app.cs`, `dotnet run app.cs`, and `dotnet app.cs`. If the cached output doesn't match the current command arguments, the CLI falls back to the managed path.

`dotnet format` also accepts a file-based app:

```console
dotnet format app.cs
```

When a repository enables the SDK artifacts layout, file-based app outputs are placed under that repository's artifacts directory instead of the default per-user cache.

### Pass <example-value> variables with dotnet run

`dotnet run -e KEY=VALUE` passes environment variables to the launched app from the command line, without requiring you to export shell state or edit launch profiles:

```bash
dotnet run -e ASPNETCORE_ENVIRONMENT=Development -e LOG_LEVEL=Debug
```

Environment variables passed this way are available to MSBuild logic as `RuntimeEnvironmentVariable` items.

### MSBuild properties in launch-profile arguments

`dotnet run` now expands MSBuild properties in a launch profile's `commandLineArgs` value by using the evaluated project. For example, a profile argument such as `--name $(AssemblyName)` receives the project's assembly name when you run `dotnet run --launch-profile <profile>`. For more information about launch profiles, see dotnet run.

### dotnet watch improvements

.NET 11 adds several `dotnet watch` improvements for long-running local development loops:

- **Aspire integration:** `dotnet watch` can now integrate with Aspire app hosts, enabling hot-reload workflows across the full Aspire application model.
- **Crash recovery:** When the app crashes, `dotnet watch` automatically relaunches it on the next relevant file change.
- **Windows desktop support:** Ctrl+C handling is improved for Windows desktop apps such as Windows Forms and WPF.

.NET 11 also adds device selection for MAUI and mobile projects. After picking a target framework, `dotnet watch` calls the `ComputeAvailableDevices` MSBuild target, auto-selects when there's a single device, and shows an interactive picker with search when there are several. The chosen device flows through to `dotnet build` and the launched `dotnet run` subprocess, including a re-restore when the device requires a `RuntimeIdentifier` not present in the original restore.

To pre-select a device from the command line, use:

```bash
dotnet watch --device <device-id>
```

The following long-standing `dotnet watch` issues are fixed:

- Automatic browser refresh works for static server-side rendered (SSR) pages in Blazor Web apps that use WebAssembly or Auto interactivity.
- The framework selection prompt no longer appears stuck due to two readers both calling `Console.ReadKey()`.
- `Ctrl+C` and `Ctrl+R` no longer surface a spurious `WebSocketException` or `ObjectDisposedException` when the WebSocket transport tears down.
- Hot Reload no longer deadlocks on iOS when `UIKitSynchronizationContext` is installed before the startup hook runs.

> **Note:**
> `dotnet watch` requires `<MtouchLink>None</MtouchLink>` in the `.csproj` file for iOS Simulator projects. See dotnet/macios #25295.

### Fish shell completions

The fish shell provider previously emitted a one-liner that delegated every completion to a dynamic `dotnet complete` call. The generated script now walks the tokenized command line, emits static completions for subcommands, options, and positional arguments, and falls back to dynamic calls only where required. This matches the behavior of the Bash, Zsh, and PowerShell providers.

### dotnet reference falls back to current directory

`dotnet reference add` and `dotnet reference remove` now fall back to the current directory when no `--project` is supplied, matching the long-standing behavior of `dotnet reference list`:

```bash
cd ClassLib2
dotnet reference add ../ClassLib1/ClassLib1.csproj   # now works without --project
dotnet reference remove ../ClassLib1/ClassLib1.csproj
```

Previously, these commands failed with `Could not find project or directory ''` when run from a directory that contained a project file.

### 'dotnet reference' support for file-based apps

`dotnet reference` now supports file-based apps. Use `dotnet reference add --file app.cs <project-path>` to add `#:project` directives directly to your file-based app, and use `dotnet reference list` and `dotnet reference remove` to manage those references.

### Launch settings notice moved to stderr

The "Using launch settings from..." informational message now writes to `stderr` instead of `stdout`. Scripts that capture the standard output of `dotnet run` no longer need to strip this line out.

### dotnet format limits configuration discovery to included files

In folder mode, `dotnet format` now finds `.editorconfig` files by walking the ancestor directories of files that will actually be formatted. It no longer scans unrelated subtrees, such as large `node_modules` directories:

```console
dotnet format whitespace . --folder --include src/App/Program.cs
```

In one monorepo benchmark, formatting one included file improved from 1.09 seconds to 0.55 seconds. Use `.globalconfig`, rather than an `is_global = true` `.editorconfig` in an unrelated subtree, for configuration that must apply globally.

### Other CLI improvements

- `dotnet format` now accepts `--framework` for multi-targeted projects.
- `dotnet test` in Microsoft Testing Platform (MTP) mode now supports `--artifacts-path`.
- `dotnet tool exec` and `dnx` no longer prompt for an extra approval when running tools.
- `dotnet nuget <subcommand> --help` now correctly forwards to the NuGet CLI's help output instead of falling back to generic help.
- `dotnet publish` no longer removes native DLLs on subsequent runs of single-file publish.
- `dotnet new install --prerelease` selects the latest available version, including prerelease versions, when a template package version isn't specified explicitly. An explicit package version, such as `user@example.com`, continues to select that exact version.
- Workload operations and `global.json` now detect versions written in the internal NuGet package format and report the corrected user-facing format instead of a package-not-found error.
- The `Configuration` environment variable now supplies the default value for the shared `--configuration`/`-c` CLI options across commands. An explicit command-line option still takes precedence, and empty or whitespace-only environment values are ignored.
- File-based property directives no longer permit `:` in the property name. Replace syntax such as `#:property Foo:Bar=value` with a valid MSBuild property name.
- Concurrent `dotnet tool install`, `dotnet tool update`, and `dotnet tool uninstall` operations no longer race with one another.

## Web assets and telemetry

- Asset groups for static web assets
- OpenTelemetry replaces Application Insights for CLI telemetry

### Asset groups for static web assets

The Static Web Assets SDK adds support for **Asset Groups**, a way to declare groups of related assets that share publish, fingerprinting, and endpoint metadata. The related `DefineStaticWebAssetEndpoints` task gains an `AdditionalEndpointDefinitions` parameter, and the glob matcher exposes the captured `**` stem so additional endpoints (for example default-document routes like `/` for `**/index.html`) can be defined declaratively.

This is infrastructure for ASP.NET Core component authors and SDK extension authors. Most app developers see the result indirectly as Razor and Blazor component packages ship cleaner static-asset metadata.

### OpenTelemetry replaces Application Insights for CLI telemetry

The `dotnet` CLI now uses OpenTelemetry (OTel) with Azure Monitor and OTLP exporters for its opt-in telemetry, replacing the previous `Microsoft.ApplicationInsights` dependency. The user-facing behavior is unchanged—the same telemetry is collected with the same opt-out via `DOTNET_CLI_TELEMETRY_OPTOUT`. The motivation is to make the CLI NativeAOT-friendly.
