---
title: ".NET SDK and .NET CLI telemetry (part 2 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/telemetry.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# .NET SDK and .NET CLI telemetry (part 2 of 3)

## Data points

Except for Microsoft employee usage classification, telemetry doesn't collect personal data, such as usernames or email addresses. For a positive classification outside of Continuous Integration pipelines (CI), telemetry can report a normalized local Microsoft employee account alias and corporate domain. It doesn't report a full email address. It doesn't scan your code and doesn't extract project-level data, such as name, repository, or author. It doesn't extract the contents of any data files accessed or created by your apps, dumps of any memory occupied by your apps' objects, or the contents of the clipboard. The data is sent securely to Microsoft servers by using Azure Monitor technology. The data is held under restricted access and published under strict security controls from secure Azure Storage systems.

Protecting your privacy is important to Microsoft. If you suspect the telemetry is collecting sensitive data or the data is being insecurely or inappropriately handled, file an issue in the dotnet/sdk repository.

For more information about your privacy and personal data collected, see the Microsoft Privacy Statement.

The following tabs show the telemetry data captured by SDK version:

# .NET 11

- **SDK version 11.0.200 and later:**
  - The CLI classifies whether the current user is a Microsoft employee. For more information, see Microsoft employee usage classification.

- **SDK version 11.0.100 and later:**
  - Roslyn compiler output cache telemetry:
    - Whether the compiler found and restored a cached compilation result.
    - The outcome of an attempt to store a compilation result in the cache.
    - The compiler language (C# or Visual Basic).
    - Time spent computing the cache key, restoring a cached result, storing a result, and compiling and emitting on a cache miss.

# .NET 10

- **SDK version 10.0.100 and later:**
  - Hashed project identifier for `dotnet run`.
  - Application type of either file-based app or project-based for `dotnet run`.
  - The launch profile name if specified for `dotnet run`.
  - Whether a launch profile was specified for `dotnet run`.
  - The launch settings configuration model used (if any) for `dotnet run`.
  - Number of SDKs used for `dotnet run`.
  - Number of PackageReferences for `dotnet run`.
  - Number of ProjectReferences for `dotnet run`.
  - Number of additional properties for file-based apps with `dotnet run`.
  - Whether MSBuild was used for file-based apps with `dotnet run`.
  - Whether Roslyn compiler was used for file-based apps with `dotnet run`.
  - The detected LLM agent name if the CLI was invoked from an LLM agent. For more information, see LLM detection.
  - Captures the `global.json` state at the time a command is invoked. The state is one of the following values: **not_found**, **valid**, **invalid_json**, or **invalid_data**.
  - Which MSBuild task factories are used to load and run tasks (including inline C# tasks, multithreaded-aware tasks, and out-of-process tasks), and how many tasks they execute.
  - Number of MSBuild tasks executed in TaskHosts versus tasks not executed in TaskHosts.

# .NET 8

- **SDK version 8.0.400 and later:**
  - Base image inference telemetry for containerized .NET applications:
    - Whether base image inference was performed (versus manually specified).
    - Target framework for base image inference.
    - Base image name and tag (only for Microsoft-produced images from mcr.microsoft.com).
    - Container family if specified or inferred (only for Microsoft-produced images).
    - Project type (ASP.NET Core or Console).
    - Publish mode (AOT, Trimmed, Self-Contained, or Framework-Dependent).
    - Whether invariant globalization is used.
    - Target runtime identifiers.
  - Container creation and publishing telemetry:
    - Type of remote registry used for pulling base images (Azure, AWS, Google, GitHub, Docker Hub, MCR, or Other).
    - Type of local source used for base images (Docker, Podman, or Tarball).
    - Type of remote registry used for pushing images (Azure, AWS, Google, GitHub, Docker Hub, MCR, or Other).
    - Type of local destination for images (Docker, Podman, or Tarball).
    - Error types when failures occur (unknown repository, credential <example-value>, RID mismatch, and local load).
    - Additional details for credential <example-value>: whether the failure occurred during push or pull.
    - Additional details for RID mismatches: the requested RID and available RIDs in the base image.

- **SDK version 8.0.100 and later:**
  - Hashed TargetPlatformIdentifier used for build (MSBuild property).
  - Hashed HybridGlobalization used for build (MSBuild property).
  - Whether .NET Blazor WebAssembly SDK is used.
  - Whether .NET WebAssembly SDK is used.
  - Whether .NET MAUI is used.
  - Whether .NET mobile SDK is used.
  - Whether other mobile SDKs are used (like: Avalonia, Uno).
  - Whether Mono AOT is used.
  - Whether Mono AOT strip IL feature is used.
  - Whether Mono interpreter is used.
  - Whether library mode for mobile is used.
  - Whether NativeAOT is used.
  - The Mono runtime pack version that was used.

# .NET 7

- **SDK version 7.0.100 and later:**
  - Hashed PublishAot used for build (MSBuild property).
  - Hashed PublishProtocol used for build (MSBuild property).

# .NET 6

- **SDK version 6.0.300 and later:**
  - If the CLI was invoked from a Continuous Integration environment. For more information, see Continuous Integration Detection.

- **SDK version 6.0.104 and later:**
  - Hashed PublishReadyToRunUseCrossgen2 used for build (MSBuild property).
  - Hashed Crossgen2PackVersion used for build (MSBuild property).
  - Hashed CompileListCount used for build (MSBuild property).
  - Hashed _ReadyToRunCompilationFailures used for build (MSBuild property).

- **SDK version 6.0.100 and later:**
  - OS architecture.

# .NET 5

- **SDK version 5.0.202 and later:**
  - Elapsed time from process start until entering the CLI program's main method, measuring host and runtime startup.
  - Elapsed time for the step that adds .NET Tools to the path on first run.
  - Elapsed time to display first time use notice on first run.
  - Elapsed time for generating ASP.NET Certificate on first run.
  - Elapsed time to parse the CLI input.

- **SDK version 5.0.201 and later:**
  - Hashed PublishReadyToRun used for build (MSBuild property).
  - Hashed PublishTrimmed used for build (MSBuild property).
  - Hashed PublishSingleFile used for build (MSBuild property).

- **SDK version 5.0.100 and later:**
  - Hashed TargetFrameworkVersion used for build (MSBuild property).
  - Hashed RuntimeIdentifier used for build (MSBuild property).
  - Hashed SelfContained used for build (MSBuild property).
  - Hashed UseApphost used for build (MSBuild property).
  - Hashed OutputType used for build (MSBuild property).

# .NET 3

- **SDK version 3.0.100 and later:**
  - Whether the output was redirected (`true` or `false`).
  - On a CLI/SDK crash, the exception type and its stack trace (only CLI/SDK code is included in the stack trace sent). For more information, see Crash exception telemetry.

# .NET 2

- **SDK version 2.1.300 and later:**
  - Kernel version.
  - Libc release and version.

- **SDK version 2.0 and later:**
  - Command arguments and options: the SDK collects several arguments and options, not arbitrary strings. See collected options. Hashed after version 2.1.300.
  - Whether the SDK is running in a container.
  - Target frameworks (from the `TargetFramework` event), hashed starting in version 2.1.
  - Hashed Media Access Control (MAC) address (SHA256).
  - Hashed current working directory.
  - Install success report, with hashed installer exe filename.

# All SDKs

- **All SDK versions:**
  - Timestamp of invocation.
  - Command invoked (for example, "build"), hashed starting in version 2.1.
  - Three octet IP address used to determine the geographical location.
  - Operating system and version.
  - Runtime ID (RID) the SDK is running on.
  - .NET SDK version.
  - Telemetry profile: an optional value only used with explicit user opt-in and used internally at Microsoft.

---

### Microsoft employee usage classification

Starting with .NET 11 SDK 11.0.200, the CLI detects evidence that the current user is a Microsoft employee. This classification measures Microsoft employee usage of the .NET CLI. Using Microsoft products doesn't cause a positive classification.

| Tag | Data |
| --- | --- |
| `dotnet.cli.is_microsoft_internal` | Whether detection found evidence that the current user is a Microsoft employee. |
| `dotnet.cli.microsoft_internal_source` | The source that found Microsoft employee evidence. Reported only for a positive result. |
| `dotnet.cli.microsoft_internal_alias` | A normalized local Microsoft employee account alias. Reported only for a positive result outside CI. |
| `dotnet.cli.microsoft_internal_domain` | A normalized corporate domain. Reported only for a positive result outside CI. |

Outside CI, the CLI can use existing GitHub credentials to query whether an account belongs to the Microsoft organization. The CLI sends the credentials only to GitHub's API for this check. The CLI never caches the credentials or adds them to telemetry. GitHub logins aren't used as telemetry aliases.

The CLI doesn't run GitHub identity probes in CI. The CLI also suppresses alias and domain values in CI.

### Collected options

Certain commands send extra data. A subset of commands sends the first argument:

| Command               | First argument data sent                |
|-----------------------|-----------------------------------------|
| `dotnet help <arg>`   | The command help is being queried for.  |
| `dotnet new <arg>`    | The template name (hashed).             |
| `dotnet add <arg>`    | The word `package` or `reference`.      |
| `dotnet remove <arg>` | The word `package` or `reference`.      |
| `dotnet list <arg>`   | The word `package` or `reference`.      |
| `dotnet sln <arg>`    | The word `add`, `list`, or `remove`.    |
| `dotnet nuget <arg>`  | The word `delete`, `locals`, or `push`. |
| `dotnet workload <subcommand> <arg>`  | The word `install`, `update`, `list`, `search`, `uninstall`, `repair`, `restore` and the workload name (hashed). |
| `dotnet tool <subcommand> <arg>`  | The word `install`, `update`, `list`, `search`, `uninstall`, `run` and the dotnet tool name (hashed). |

A subset of commands sends selected options if they're used, along with their values:

| Option                  | Commands                                                                                       |
|-------------------------|------------------------------------------------------------------------------------------------|
| `--verbosity`           | All commands                                                                                   |
| `--language`            | `dotnet new`                                                                                   |
| `--configuration`       | `dotnet build`, `dotnet clean`, `dotnet publish`, `dotnet run`, `dotnet test`                  |
| `--framework`           | `dotnet build`, `dotnet clean`, `dotnet publish`, `dotnet run`, `dotnet test`, `dotnet vstest` |
| `--runtime`             | `dotnet build`,  `dotnet publish`                                                              |
| `--platform`            | `dotnet vstest`                                                                                |
| `--logger`              | `dotnet vstest`                                                                                |
| `--sdk-package-version` | `dotnet migrate`                                                                               |

When the SDK fails to resolve a built-in command, any command resolver that successfully resolves the command sends a hash of the command name along with the name of the command resolver type.

Starting with .NET Core 2.1.100 SDK, the SDK hashes all these values except for `--verbosity` and `--sdk-package-version`.

### Template engine telemetry

Starting with .NET Core 2.1.100 SDK, the `dotnet new` template instantiation command collects extra data for Microsoft-authored templates:

* `--framework`
* `--auth`

### dotnet run telemetry

Starting with .NET SDK 10.0.100, the `dotnet run` command collects feature-based telemetry to help drive development and usage of file-based apps.

**Telemetry for all `dotnet run` executions:**

- Application type (file-based or project-based)
- Hashed project or file identifier
- Number of SDKs used
- Number of PackageReferences
- Number of ProjectReferences
- Launch profile usage (whether `--launch-profile` or `--no-launch-profile` was used)
- Whether the launch profile is a default profile
- Launch settings model applied, if any

**Telemetry for file-based apps only:**

- Number of additional properties (for example, `#:property` directives)
- Whether MSBuild was used for building
- Whether the Roslyn compiler was used directly

## Crash exception telemetry

If the .NET CLI or SDK crashes, it collects the name of the exception and stack trace of the CLI or SDK code. The .NET CLI collects this information to assess problems and improve the quality of the .NET SDK and CLI.

The .NET CLI collects information for CLI or SDK exceptions only, not exceptions in your application. The collected data contains the name of the exception and the stack trace. This stack trace is of CLI or SDK code.

The following example shows the kind of data that is collected:

```console
System.IO.IOException
at System.ConsolePal.WindowsConsoleStream.Write(Byte[] buffer, Int32 offset, Int32 count)
at System.IO.StreamWriter.Flush(Boolean flushStream, Boolean flushEncoder)
at System.IO.StreamWriter.Write(Char[] buffer)
at System.IO.TextWriter.WriteLine()
at System.IO.TextWriter.SyncTextWriter.WriteLine()
at Microsoft.DotNet.Cli.Utils.Reporter.WriteLine()
at Microsoft.DotNet.Tools.Run.RunCommand.EnsureProjectIsBuilt()
at Microsoft.DotNet.Tools.Run.RunCommand.Execute()
at Microsoft.DotNet.Tools.Run.RunCommand.Run(String[] args)
at Microsoft.DotNet.Cli.Program.ProcessArgs(String[] args, ITelemetry telemetryClient)
at Microsoft.DotNet.Cli.Program.Main(String[] args)
```

.NET contributors and anyone else running a version of the .NET SDK that they built themselves should consider the path to their SDK source code. If a crash occurs while using a .NET SDK that is a custom debug build or configured with custom build symbol files, the SDK source file path from the build machine is collected as part of the stack trace and isn't hashed.

Because of this, you shouldn't place custom builds of the .NET SDK in directories whose path names expose personal or sensitive information.
