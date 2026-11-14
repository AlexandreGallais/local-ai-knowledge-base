---
title: "What's new in the SDK and tooling for .NET 11 (part 2 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/whats-new/dotnet-11/sdk.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# What's new in the SDK and tooling for .NET 11 (part 2 of 3)

## CLI architecture

- NativeAOT entry point for the dotnet CLI
- MSBuild server enabled by default
- Partial Ready-to-Run for upstack tooling

### NativeAOT entry point for the dotnet CLI

To enable near-instant startup for common CLI invocations, .NET 11 now enables the NativeAOT-compiled `dotnet` CLI host by default. You can opt out by setting `DOTNET_CLI_ENABLEAOT=false`. The managed and NativeAOT parsers share one implementation, so the AOT path parses, validates, and renders `--help` for every command.

Commands that can run entirely without the managed runtime execute natively. Every other command transparently falls back to the managed CLI. The following commands are fully served from the AOT path:

- `dotnet --version`, `dotnet --info`, `dotnet --help`
- `dotnet <command> --help` for every built-in command
- `dotnet --cli-schema`
- `dotnet sln list`, `dotnet sln migrate`, `dotnet sln remove`

Tool and external-command invocations (global tools, PATH commands, app-base commands) now resolve and launch out-of-process from the AOT path as well, skipping the 600–700 ms managed CLI startup for commands like `dotnet ef` or `dotnet dev-certs`.

OpenTelemetry tracing spans are emitted from the AOT path with correct parent/child relationships to the managed CLI spans, enabling end-to-end distributed trace analysis across both hosts.

### MSBuild server enabled by default

The MSBuild server is now enabled by default. This keeps a warm MSBuild worker between CLI invocations, which reduces startup overhead for repeated build and test commands. To opt out, set `DOTNET_CLI_USE_MSBUILD_SERVER=false` or `MSBUILDUSESERVER=0`.

### Partial Ready-to-Run for upstack tooling

A new MSBuild property lets upstack tooling (for example, `dotnet/macios` and `dotnet/maui`) declare a list of assemblies to be partially R2R-compiled and excluded from the composite image. The motivating scenario is precompiling generated XAML code in Debug builds to speed up F5 without paying the full crossgen cost for the rest of the app. App developers don't set this property directly—it's a hook the mobile workloads use in their targets.

## Native AOT optimized publishing

Optimized Native AOT publishing is opt-in. The `UseOptimizedPublish` property defaults to `false` for Native AOT projects, preserving the full build target chain and its build hooks. To enable optimized publishing explicitly, set both properties:

```xml
<PropertyGroup>
  <PublishAot>true</PublishAot>
  <UseOptimizedPublish>true</UseOptimizedPublish>
</PropertyGroup>
```

For details about the build hooks affected by optimized publishing and how to migrate custom targets, see Full build skipped for Native AOT publish.

## Test improvements

- dotnet test improvements
- dotnet test support for mobile app testing
- dotnet test run-level policy options
- dotnet test support for traversal projects
- dotnet test reporter and artifacts improvements
- Test templates support xUnit v3 and NUnit on Microsoft.Testing.Platform

### dotnet test improvements

.NET 11 adds several capabilities to `dotnet test` when running through Microsoft Testing Platform (MTP):

- **`--no-dependencies`**: Skips building project-to-project references, matching the existing `dotnet build --no-dependencies` behavior.
- **`DOTNET_TEST_RUNNER` environment variable**: Selects the test runner without requiring a `global.json` change. Set it to `VSTest` or `Microsoft.Testing.Platform` to override `global.json` for the current session.
- **`--use-current-runtime` / `--ucr`**: Targets the current runtime during restore and build, matching the option already available on `dotnet build` and `dotnet publish`.
- **`--test-modules` exclusion patterns**: Patterns starting with `!` are now treated as excludes, and whitespace between semicolons is trimmed, making YAML-folded CI expressions work correctly.
- **Per-assembly test counts**: The summary line for multi-assembly runs now includes per-assembly counts.
- **Terminal logger arguments**: `--tl`, `--terminallogger`, and `--tlp` are now forwarded to MSBuild instead of being passed as test application arguments.
- **Live display of in-flight tests**: The progress area shows tests that are running, using a new `TestInProgressMessages` IPC event. The panel keeps per-assembly trimming for large parallel runs and is enabled only for interactive ANSI terminals.
- **Two-stage Ctrl+C cancellation**: The first press stops scheduling new test apps and shows a hint; the second press force-kills all child test processes.
- **Protocol 1.1.0 output forwarding**: When the test host supports protocol 1.1.0, stdout/stderr and `IOutputDevice` messages are streamed live through the terminal reporter instead of being shown only on failure.

### dotnet test support for mobile app testing

The Microsoft Testing Platform path for `dotnet test` supports test projects that target Android, iOS, macOS, and Mac Catalyst. For Android and iOS, it can select connected devices, emulators, or simulators. Use `--device` to select a device per target framework, or let `dotnet test` auto-select when only one is available.

The workloads include test project templates for Android (`dotnet new androidtest`), iOS (`dotnet new iostest`), macOS (`dotnet new macostest`), and Mac Catalyst (`dotnet new maccatalysttest`). They use MSTest by default, but you can configure another framework supported by Microsoft.Testing.Platform.

`dotnet test -bl` records device selection, deployment, and run-argument builds in one coherent binary log, and `dotnet test` reports the underlying MSBuild errors when deployment or run-argument discovery fails.

### dotnet test run-level policy options

The Microsoft Testing Platform path for `dotnet test` adds options that apply to the complete run rather than to each test application. Place these options before `--`; options after `--` continue to be forwarded to each application.

```console
# Stop the complete run after 90 seconds.
dotnet test --timeout 90s

# Stop after five failed, errored, timed-out, or cancelled results.
dotnet test --maximum-failed-tests 5
```

`--timeout` accepts `ms`, `s`, and `m` suffixes and counts time only while at least one test application is running. A timeout returns exit code 3, while `--maximum-failed-tests` returns exit code 13 when its limit is reached.

For solution and multi-targeted runs, the `--results-directory-layout per-module` option gives every test application a separate output directory, preventing reports with the same relative file name from overwriting one another. The default remains `flat`.

```console
dotnet test --results-directory-layout per-module
```

```text
TestResults/
  MyTests/
    net11.0_x64/
  OtherTests/
    net11.0_x64/
```

When the SDK's artifacts output layout is enabled, MTP test reports, coverage, and diagnostics default to `<ArtifactsPath>/test/<project>/<pivot>`. An explicit `--results-directory` or `--results-directory-layout` still takes precedence.

`dotnet test --nologo` maps to Microsoft.Testing.Platform's `--no-banner` option, and `--no-banner` appears in the command help.

An experimental affected-test workflow is also available through a separately distributed Microsoft.Testing.Platform extension. It can collect a repository's test map and then run only the tests affected by a change. Collection and affected-test selection are mutually exclusive and can't be combined with device testing, parallel modules, or minimum-test policies.

```powershell
$env:DOTNET_CLI_ENABLE_AFFECTED_TESTS = "1"
dotnet test --collect-test-map
dotnet test --affected-tests
```

### dotnet test support for traversal projects

`dotnet test` now supports `Microsoft.Build.Traversal` projects. The SDK recursively expands nested traversal projects, deduplicates diamond references, and honors `Configuration` and `Platform` metadata on project references before executing tests for the aggregated project set.

```console
dotnet test dirs.proj
```

### dotnet test reporter and artifacts improvements

Reporter and artifact handling has been improved for multi-module runs, including expected-versus-actual rendering in failure output, whole-run zero-test verdict logic, and automatic post-processing of compatible test artifacts.

### Test templates support xUnit v3 and NUnit on Microsoft.Testing.Platform

The built-in `xunit` template adds a `--xunit-version` option. Use `v3` to generate an xUnit v3 project that defaults to Microsoft.Testing.Platform as the runner:

```bash
dotnet new xunit --xunit-version v3
dotnet new xunit --xunit-version v3 --test-runner VSTest
```

The `nunit` template similarly adds a `--test-runner` option to opt in to Microsoft.Testing.Platform:

```bash
dotnet new nunit --test-runner Microsoft.Testing.Platform
```

Both options are available for C#, F#, and VB templates.

## MSBuild and NuGet

- Faster wildcard matching during project evaluation
- Configure minimum package publication age from the CLI

### Faster wildcard matching during project evaluation

The .NET SDK uses wildcard patterns during project evaluation. For example, SDK-style projects use patterns such as `**/*.cs` to include source files. In .NET SDK 11.0.100 or Visual Studio 18.12 and later versions, MSBuild finds matching files faster in projects that have many directories and files.

In benchmarks on Windows, complete project evaluations were 10–13% faster and allocated 16–34% less memory than with the legacy matcher:

| Directories | Nonmatching files per directory | Evaluation time vs. legacy | Allocation vs. legacy |
| ----------: | ------------------------------: | -------------------------: | --------------------: |
|          32 |                               8 |                      0.89x |                 0.73x |
|          32 |                              64 |                      0.90x |                 0.84x |
|         128 |                               8 |                      0.87x |                 0.66x |
|         128 |                              64 |                      0.90x |                 0.84x |

The optimization helps most when wildcard include and exclude patterns overlap, which is common in SDK-style projects. For example, the SDK includes source files with `**/*.cs` while it excludes build-output directories such as `bin` and `obj`. The benchmark results cover four tested project-evaluation workloads, not all builds.

### Configure minimum package publication age from the CLI

The `dotnet nuget add source` and `dotnet nuget update source` commands accept `--min-publish-age-hours`, which sets the `minPublishAgeHours` source setting in *nuget.config*. This option lets you configure the minimum age of package versions that are eligible for selection without editing the configuration file by hand:

```dotnetcli
dotnet nuget add source https://api.nuget.org/v3/index.json --name public --min-publish-age-hours 24 --configfile nuget.config
dotnet nuget update source public --min-publish-age-hours 48 --configfile nuget.config
```

The `dotnet package add` and `dotnet package update` commands apply the configured minimum publish age when they automatically select a version. An explicit version request bypasses automatic age filtering. An update reports when the setting excludes a newer version.

Ordinary restore doesn't enforce the age for non-floating references or transitive dependencies. For a floating package reference, restore fails with NU1020 when an applicable source has a nonzero minimum age and the package doesn't match a configured exception. Restore doesn't select an older version to satisfy the minimum age. For details, see Minimum package publish age.

## Container and tooling updates

- Multi-arch container builds with Podman
- Platform-native local container runtime selection
- Reproducible container publishing
- TypeScript outputs integrate with Static Web Assets
- MSBuild server and OpenTelemetry environment variables

### Multi-arch container builds with Podman

The SDK's built-in container publishing now supports building multi-architecture container images when using Podman as the container engine. Previously, multi-arch builds required Docker. This unblocks rootless multi-arch workflows on Linux distributions that ship Podman by default.

### Platform-native local container runtime selection

Container publishing now prefers platform-native local runtimes when available: `wslc` on Windows, and `container` on macOS. Docker and Podman remain fallbacks. To force a runtime, set `LocalRegistry` explicitly in your project or publish profile.

### Reproducible container publishing

Publishing the same application more than once could previously produce different container image digests, because timestamps, archive headers, and directory enumeration order varied between builds. Set `SOURCE_DATE_EPOCH` to a stable Unix timestamp so independent publishes of the same inputs produce the same digest:

```bash
dotnet publish /t:PublishContainer \
  -p:ContainerRegistry=registry.example.com \
  -p:SOURCE_DATE_EPOCH="$(git log -1 --pretty=%ct)"
```

Remote registry publishes also check whether the computed image manifest already exists in the destination repository. When it does, the SDK skips processing the layers and configuration while still applying every requested image tag. This optimization is enabled by default; set `ContainerPushNoCache=true` to bypass the manifest-level check. The SDK still checks each layer and configuration blob and doesn't upload blobs that are already present.

### TypeScript outputs integrate with Static Web Assets

Projects that use `Microsoft.TypeScript.MSBuild` in Razor Class Libraries now properly integrate TypeScript compilation outputs with ASP.NET Core Static Web Assets. The new integration hooks TypeScript outputs into the Static Web Assets pipeline after compilation, enabling compression, fingerprinting, and correct rebuild behavior. Previously, rebuild operations could fail because TypeScript outputs were discovered before compilation or stale references persisted after clean.

### MSBuild server and OpenTelemetry environment variables

The `dotnet` CLI no longer suppresses the MSBuild build server when `DOTNET_CLI_USE_MSBUILD_SERVER` is unset. Previously the CLI unconditionally wrote `MSBUILDUSESERVER=0`, overriding any user-set value. Now, if `DOTNET_CLI_USE_MSBUILD_SERVER` is not set, the CLI leaves `MSBUILDUSESERVER` untouched so you can enable the MSBuild server directly.

The OTLP telemetry exporter is now also enabled when any standard OpenTelemetry `OTEL_EXPORTER_OTLP_*` environment variable is present (endpoint, protocol, headers, or timeout—including signal-specific `_TRACES_*` and `_METRICS_*` variants), in addition to the existing `DOTNET_CLI_TELEMETRY_ENABLE_EXPORTER` flag.
