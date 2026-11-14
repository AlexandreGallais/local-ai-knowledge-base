---
title: ".NET environment variables (part 2 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnet-environment-variables.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# .NET environment variables (part 2 of 3)

## .NET SDK and CLI environment variables

This section describes the following environment variables:

- `DOTNET_ROOT`, `DOTNET_ROOT(x86)`, `DOTNET_ROOT_X86`, `DOTNET_ROOT_X64`
- `DOTNET_HOST_PATH`
- `DOTNET_LAUNCH_PROFILE`
- `NUGET_PACKAGES`
- `DOTNET_SERVICING`
- `DOTNET_NOLOGO`
- `DOTNET_CLI_PERF_LOG`
- `DOTNET_CLI_ENABLEAOT`
- `DOTNET_GENERATE_ASPNET_CERTIFICATE`
- `DOTNET_ADD_GLOBAL_TOOLS_TO_PATH`
- `DOTNET_CLI_TELEMETRY_OPTOUT`
- `DOTNET_SKIP_FIRST_TIME_EXPERIENCE`
- `DOTNET_MULTILEVEL_LOOKUP`
- `DOTNET_ROLL_FORWARD`
- `DOTNET_ROLL_FORWARD_TO_PRERELEASE`
- `DOTNET_CLI_FORCE_UTF8_ENCODING`
- `DOTNET_CLI_UI_LANGUAGE`
- `DOTNET_DISABLE_GUI_ERRORS`
- `DOTNET_ADDITIONAL_DEPS`
- `DOTNET_RUNTIME_ID`
- `DOTNET_SHARED_STORE`
- `DOTNET_STARTUP_HOOKS`
- `DOTNET_BUNDLE_EXTRACT_BASE_DIR`
- `DOTNET_CLI_HOME`
- `DOTNET_CLI_CONTEXT_*`
- `DOTNET_CLI_WORKLOAD_UPDATE_NOTIFY_DISABLE`
- `DOTNET_CLI_WORKLOAD_UPDATE_NOTIFY_INTERVAL_HOURS`
- `DOTNET_SDK_VULNERABILITY_CHECK_DISABLE`
- `DOTNET_SDK_VULNERABILITY_CHECK_INTERVAL_HOURS`
- `DOTNET_SKIP_WORKLOAD_INTEGRITY_CHECK`
- `DOTNET_TOOLS_ALLOW_MANIFEST_IN_ROOT`
- `DOTNET_HOST_TRACE`
- `SuppressNETCoreSdkPreviewMessage`
- Configure MSBuild in the .NET CLI
- `DOTNET_NEW_PREFERRED_LANG`
- `dotnet watch` environment variables

### `DOTNET_ROOT`, `DOTNET_ROOT(x86)`, `DOTNET_ROOT_X86`, `DOTNET_ROOT_X64`

Specifies the location of the .NET runtimes, if they are not installed in the default location. The default location on Windows is `C:\Program Files\dotnet`. The default location on macOS is `/usr/local/share/dotnet`. The default location for the x64 runtimes on an arm64 OS is under an x64 subfolder (so `C:\Program Files\dotnet\x64` on windows and `/usr/local/share/dotnet/x64` on macOS. The default location on Linux varies depending on distro and installment method. The default location on Ubuntu 22.04 is `/usr/share/dotnet` (when installed from `packages.microsoft.com`) or `/usr/lib/dotnet` (when installed from Jammy feed). For more information, see the following resources:

- Troubleshoot app launch failures
- GitHub issue dotnet/core#7699
- GitHub issue dotnet/runtime#79237

These environment variables are used only when running apps via generated executables (apphosts). The order in which the environment variables are considered is:

1. `DOTNET_ROOT_<ARCH>`, where `<ARCH>` is the architecture of the running executable (apphost).
   For example:
     - `DOTNET_ROOT_ARM64` is used for an Arm64 process.
     - `DOTNET_ROOT_X64` is used for an x64 process. This process might be running on x64 or Arm64 architecture.
     - `DOTNET_ROOT_X86` is used for an x86 process. This process might be running on x86 or x64 architecture.
2. `DOTNET_ROOT(x86)` is used when a 32-bit process is running on 64-bit Windows. In other cases, this environment variable is ignored.
3. `DOTNET_ROOT`.

### `DOTNET_HOST_PATH`

Specifies the absolute path to a `dotnet` host (`dotnet.exe` on Windows, `dotnet` on Linux and macOS). This path represents either the host used to launch the currently running `dotnet` process, or the host that would be used when running `dotnet` commands for the currently building project when executing under MSBuild. The .NET SDK uses this variable to help tools that run during .NET SDK commands ensure they use the same `dotnet` host configuration for any child `dotnet` processes they create for the duration of the command. Tools and any MSBuild logic that run within a build and invoke binaries via the `dotnet` host are expected to honor this environment variable to ensure a consistent experience.

Starting in Visual Studio 2026, MSBuild in Visual Studio _also_ ensures that `DOTNET_HOST_PATH` is set for all builds of .NET SDK projects. For greatest consistency, all MSBuild tools and logic that want to use _the same dotnet binary_ as the one that spawned the build should rely on
`DOTNET_HOST_PATH` and should consider emitting a diagnostic (warning or error) when the variable is not present.

> **Note:**
> `DOTNET_HOST_PATH` is not a general solution for locating the `dotnet` host. It is only intended to be used by binaries and tools that are invoked by the .NET SDK or MSBuild.

### `DOTNET_LAUNCH_PROFILE`

The `dotnet run` command sets this variable to the selected launch profile.

Given the following _launchSettings.json_ file:

```json
{
  "profiles": {
    "First": {
      "commandName": "Project",
    },
    "Second": {
      "commandName": "Project",
    }
  }
}
```

And the following _Program.cs_ file:

```csharp
var value = Environment.GetEnvironmentVariable("DOTNET_LAUNCH_PROFILE");
Console.WriteLine($"DOTNET_LAUNCH_PROFILE={value}");
```

The following scenarios produce the output shown:

- Launch profile specified and exists

  ```dotnetcli
  $ dotnet run --launch-profile First
  DOTNET_LAUNCH_PROFILE=First
  ```

- Launch profile not specified, first one selected

  ```dotnetcli
  $ dotnet run
  DOTNET_LAUNCH_PROFILE=First
  ```

- Launch profile specified but does not exist

  ```dotnetcli
  $ dotnet run --launch-profile Third
  The launch profile "Third" could not be applied.
  A launch profile with the name 'Third' doesn't exist.
  DOTNET_LAUNCH_PROFILE=
  ```

- Launch with no profile

  ```dotnetcli
  $ dotnet run --no-launch-profile
  DOTNET_LAUNCH_PROFILE=
  ```

### `NUGET_PACKAGES`

The global packages folder. If not set, it defaults to `~/.nuget/packages` on Unix or `%userprofile%\.nuget\packages` on Windows.

### `DOTNET_SERVICING`

Specifies the location of the servicing index to use by the shared host when loading the runtime.

### `DOTNET_NOLOGO`

Specifies whether .NET welcome and telemetry messages are displayed on the first run. Set to `true` to mute these messages (values `true`, `1`, or `yes` accepted) or set to `false` to allow them (values `false`, `0`, or `no` accepted). If not set, the default is `false` and the messages will be displayed on the first run. This flag does not affect telemetry (see `DOTNET_CLI_TELEMETRY_OPTOUT` for opting out of sending telemetry).

### `DOTNET_CLI_PERF_LOG`

Specifies whether performance details about the current CLI session are logged. Enabled when set to `1`, `true`, or `yes`. This is disabled by default.

### `DOTNET_CLI_ENABLEAOT`

Specifies whether the .NET SDK uses its native (ahead-of-time compiled) CLI command-handling fast path. When enabled, common commands (such as command-line parsing, `dotnet --version`, and `dotnet --info`) are handled by a native entry point for faster startup, transparently falling back to the managed CLI for anything the fast path doesn't handle.

Set this variable to control the fast path explicitly:

- To enable it, set the variable to `true`, `1`, `yes`, or `on`.
- To disable it and route every invocation to the managed CLI, set the variable to `false`, `0`, `no`, or `off`.

> **Note:**
> Starting in .NET 11, this fast path is enabled by default (`true`) on all platforms. To disable it, set the variable to `false`, `0`, `no`, or `off`.

### `DOTNET_GENERATE_ASPNET_CERTIFICATE`

Specifies whether to generate an ASP.NET Core certificate. The default value is `true`, but this can be overridden by setting this environment variable to either `0`, `false`, or `no`.

### `DOTNET_ADD_GLOBAL_TOOLS_TO_PATH`

Specifies whether to add global tools to the `PATH` environment variable. The default is `true`. To not add global tools to the path, set to `0`, `false`, or `no`.

### `DOTNET_CLI_TELEMETRY_OPTOUT`

Specifies whether data about the .NET tools usage is collected and sent to Microsoft. Set to `true` to opt-out of the telemetry feature (values `true`, `1`, or `yes` accepted). Otherwise, set to `false` to opt in to the telemetry features (values `false`, `0`, or `no` accepted). If not set, the default is `false` and the telemetry feature is active.

### `DOTNET_SKIP_FIRST_TIME_EXPERIENCE`

If `DOTNET_SKIP_FIRST_TIME_EXPERIENCE` is set to `true`, the `NuGetFallbackFolder` won't be expanded to disk and a shorter welcome message and telemetry notice will be shown.

> **Note:**
> This environment variable is no longer supported in .NET Core 3.0 and later.
> Use `DOTNET_NOLOGO` as a replacement.

### `DOTNET_MULTILEVEL_LOOKUP`

Specifies whether the .NET runtime, shared framework, or SDK are resolved from the global location. If not set, it defaults to 1 (logical `true`). Set the value to 0 (logical `false`) to not resolve from the global location and have isolated .NET installations. For more information about multi-level lookup, see Multi-level SharedFX Lookup.

> **Note:**
> This environment variable only applies to applications that target .NET 6 and earlier versions. Starting in .NET 7, .NET only looks for frameworks in one location. For more information, see Multi-level lookup is disabled.

### `DOTNET_ROLL_FORWARD`

Determines roll forward behavior. For more information, see the `--roll-forward` option for the `dotnet` command.

### `DOTNET_ROLL_FORWARD_TO_PRERELEASE`

If set to `1` (enabled), enables rolling forward to a pre-release version from a release version. By default (`0` - disabled), when a release version of .NET runtime is requested, roll-forward will only consider installed release versions.

For more information, see the `--roll-forward` option for the `dotnet` command.

### `DOTNET_CLI_FORCE_UTF8_ENCODING`

Forces the use of UTF-8 encoding in the console, even for older versions of Windows 10 that don't fully support UTF-8. For more information, see SDK no longer changes console encoding when finished.

### `DOTNET_CLI_UI_LANGUAGE`

Sets the language of the CLI UI using a locale value such as `en-us`. The supported values are the same as for Visual Studio. For more information, see the section on changing the installer language in the Visual Studio installation documentation. The .NET resource manager rules apply, so you don't have to pick an exact match—you can also pick descendants in the `CultureInfo` tree. For example, if you set it to `fr-CA`, the CLI will find and use the `fr` translations. If you set it to a language that is not supported, the CLI falls back to English.

### `DOTNET_DISABLE_GUI_ERRORS`

For GUI-enabled generated executables - disables dialog popup, which normally shows for certain classes of errors. It only writes to `stderr` and exits in those cases.

### `DOTNET_ADDITIONAL_DEPS`

Equivalent to CLI option `--additional-deps`.

### `DOTNET_RUNTIME_ID`

Overrides the detected RID.

### `DOTNET_SHARED_STORE`

Location of the "shared store" which assembly resolution falls back to in some cases.

### `DOTNET_STARTUP_HOOKS`

List of assemblies to load and execute startup hooks from.

### `DOTNET_BUNDLE_EXTRACT_BASE_DIR`

Specifies a directory to which a single-file application is extracted before it is executed.

For more information, see Single-file executables.

### `DOTNET_CLI_HOME`

Specifies the location that supporting files for .NET CLI commands should be written to. For example:

- User-writable paths for workload packs, manifests, and other supporting data.
- First-run sentinel/lock files for aspects of the .NET CLI's first-run migrations and notification experiences.
- The default .NET local tool installation location.

### `DOTNET_CLI_CONTEXT_*`

- `DOTNET_CLI_CONTEXT_VERBOSE`: To enable a verbose context, set to `true`.
- `DOTNET_CLI_CONTEXT_ANSI_PASS_THRU`: To enable an ANSI pass-through, set to `true`.

### `DOTNET_CLI_WORKLOAD_UPDATE_NOTIFY_DISABLE`

Disables background download of advertising manifests for workloads. Default is `false` - not disabled. If set to `true`, downloading is disabled. For more information, see Advertising manifests.

### `DOTNET_CLI_WORKLOAD_UPDATE_NOTIFY_INTERVAL_HOURS`

Specifies the minimum number of hours between background downloads of advertising manifests for workloads. The default is `24`, which is no more frequently than once a day. For more information, see Advertising manifests.

### `DOTNET_SDK_VULNERABILITY_CHECK_DISABLE`

Disables the opt-in SDK vulnerability, end-of-life, and feature-band discontinuation check. When set to `true`, the .NET CLI doesn't refresh the local SDK release metadata cache in the background, and the MSBuild check doesn't emit NETSDK1238, NETSDK1239, or NETSDK1240. The default is `false`. The check is also opt-in at the project level through the `CheckSdkVulnerabilities` MSBuild property.

### `DOTNET_SDK_VULNERABILITY_CHECK_INTERVAL_HOURS`

Specifies the minimum number of hours between background refreshes of the SDK release metadata cache used by the SDK vulnerability, end-of-life, and feature-band discontinuation check. The default is `24`.

### `DOTNET_SKIP_WORKLOAD_INTEGRITY_CHECK`

Specifies whether to skip the workload integrity check on first-run. The integrity check ensures that workloads from previous feature bands are accessible to the currently installed SDK. Set the value to `true`, `1`, or `yes` to skip the check. The default is `false`, meaning the integrity check is performed.

### `DOTNET_TOOLS_ALLOW_MANIFEST_IN_ROOT`

Specifies whether .NET SDK local tools search for tool manifest files in the root folder on Windows. The default is `false`.

### `DOTNET_HOST_TRACE`

Controls diagnostics tracing from the hosting components, such as `dotnet.exe`, `hostfxr`, and `hostpolicy`.

> **Note:**
> Prior to .NET 10, the `COREHOST_` prefix was used instead of `DOTNET_HOST_` (for example, `COREHOST_TRACE`). The functionality and values remain identical.

- `DOTNET_HOST_TRACE=[0/1]` - default is `0` - tracing disabled. If set to `1`, diagnostics tracing is enabled.
- `DOTNET_HOST_TRACEFILE=<file path>` - has an effect only if tracing is enabled by setting `DOTNET_HOST_TRACE=1`. When set, the tracing information is written to the specified file; otherwise, the trace information is written to `stderr`.
- `DOTNET_HOST_TRACE_VERBOSITY=[1/2/3/4]` - default is `4`. The setting is used only when tracing is enabled via `DOTNET_HOST_TRACE=1`.

  - `4` - all tracing information is written
  - `3` - only informational, warning, and error messages are written
  - `2` - only warning and error messages are written
  - `1` - only error messages are written

The typical way to get detailed trace information about application startup is to set `DOTNET_HOST_TRACE=1` and `DOTNET_HOST_TRACEFILE=host_trace.txt` and then run the application. A new file `host_trace.txt` will be created in the current directory with the detailed information.

### `SuppressNETCoreSdkPreviewMessage`

If set to `true`, invoking `dotnet` won't produce a warning when a preview SDK is being used.
