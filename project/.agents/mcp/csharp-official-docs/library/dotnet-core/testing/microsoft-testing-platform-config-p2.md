---
title: "Microsoft.Testing.Platform (MTP) config options (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/microsoft-testing-platform-config.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Microsoft.Testing.Platform (MTP) config options (part 2 of 2)

## Environment variables

Environment variables can be used to supply some runtime configuration information.

> **Note:**
> Environment variables take precedence over configuration settings in the *testconfig.json* file.

### `TESTINGPLATFORM_EXIT_PROCESS_ON_UNHANDLED_EXCEPTION` environment variable

When set to `1`, the test host process exits immediately on unhandled exceptions. When set to `0`, the platform allows graceful shutdown. This setting takes precedence over the `platformOptions:exitProcessOnUnhandledException` configuration.

### `TESTINGPLATFORM_DEFAULT_HANG_TIMEOUT` environment variable

Overrides the default timeout (300 seconds) used for named-pipe connections between the test host controller and test host. The value must be a `TimeSpan`-compatible string.

### `TESTINGPLATFORM_UI_LANGUAGE` environment variable

Starting with MTP 1.5, this environment variable sets the language of the platform for displaying messages and logs using a locale value such as `en-us`. This language takes precedence over the Visual Studio and .NET SDK languages. The supported values are the same as for Visual Studio. For more information, see the section on changing the installer language in the Visual Studio installation documentation.

### `TESTINGPLATFORM_DIAGNOSTIC` environment variable

If set to `1`, enables the diagnostic logging.

### `TESTINGPLATFORM_DIAGNOSTIC_VERBOSITY` environment variable

Defines the verbosity level when diagnostics are enabled. The available values are `Trace`, `Debug`, `Information`, `Warning`, `Error`, or `Critical`.

### `TESTINGPLATFORM_DIAGNOSTIC_OUTPUT_DIRECTORY` environment variable

The output directory of the diagnostic logging. If not specified, the file is generated in the default *TestResults* directory.

### `TESTINGPLATFORM_DIAGNOSTIC_FILE_PREFIX` environment variable

The prefix for the log file name. By default, MTP uses `<asm>_<tfm>_<arch>` and appends a timestamp. The resulting file name is `<asm>_<tfm>_<arch>_<timestamp>.diag`. The variable matches the `--diagnostic-file-prefix` command-line option.

> **Note:**
> This environment variable name is available in MTP starting with version 2.3.0. The legacy `TESTINGPLATFORM_DIAGNOSTIC_OUTPUT_FILEPREFIX` environment variable is still honored for backward compatibility but is deprecated and might be removed in a future major version. When both variables are set, `TESTINGPLATFORM_DIAGNOSTIC_FILE_PREFIX` takes precedence.

### `TESTINGPLATFORM_DIAGNOSTIC_SYNCHRONOUS_WRITE` environment variable

Forces the built-in file logger to synchronously write logs. Useful for scenarios where you don't want to lose any log entries (if the process crashes). This does slow down the test execution. Matches the `--diagnostic-synchronous-write` command-line option.

> **Note:**
> This environment variable name is available in MTP starting with version 2.3.0. The legacy `TESTINGPLATFORM_DIAGNOSTIC_FILELOGGER_SYNCHRONOUSWRITE` environment variable is still honored for backward compatibility but is deprecated and might be removed in a future major version. When both variables are set, `TESTINGPLATFORM_DIAGNOSTIC_SYNCHRONOUS_WRITE` takes precedence.

### `TESTINGPLATFORM_EXITCODE_IGNORE` environment variable

A semicolon-separated list of exit codes to ignore. When an exit code is ignored, the process returns `0` instead. For example, `TESTINGPLATFORM_EXITCODE_IGNORE=2;8` ignores test failures and no-tests-ran scenarios.

### `TESTINGPLATFORM_NOBANNER` environment variable

When set to `1` or `true`, suppresses the startup banner, the copyright message, and the telemetry banner. Equivalent to the `--no-banner` command-line option. The `DOTNET_NOLOGO` environment variable has the same effect.

### `NO_COLOR` environment variable

When set to any non-empty value, suppresses all ANSI color output. MTP honors the `NO_COLOR` convention.

> **Note:**
> Available in MTP starting with version 2.3.0.

### `DOTNET_NOLOGO` environment variable

When set to `1` or `true`, suppresses the startup banner, the copyright message, and the telemetry banner. This is the standard .NET CLI environment variable and is honored by MTP. See also `TESTINGPLATFORM_NOBANNER`.

### `TESTINGPLATFORM_PIPE_DIRECTORY` environment variable

Starting with MTP 2.4.0, this variable overrides the directory where MTP creates Unix domain-socket files for named-pipe communication. Use it when a sandbox or container doesn't allow socket creation in the default temporary directory. MTP creates and checks the directory, and fails with an error when the directory isn't writable or the resulting socket path is too long.

The variable has no effect on Windows, where named pipes don't use file-system paths. It also doesn't relocate a pipe that another process, such as the .NET SDK, creates.

### Deadline cancellation prototype

> **Warning:**
> **EXPERIMENTAL/PROTOTYPE:** Deadline cancellation is a prototype in MTP 2.4. Its variables and behavior can change or be removed.

Set `TESTINGPLATFORM_DEADLINE` to the complete hard-cancel instant supplied by the deadline producer. Use an ISO 8601 UTC value. Don't subtract MTP's margins from the value.

MTP requests a graceful stop before the deadline. `TESTINGPLATFORM_DEADLINE_STOP_MARGIN` controls how early and defaults to 60 seconds. A test framework that doesn't support graceful stop ignores this request.

As a fallback, `TESTINGPLATFORM_DEADLINE_DUMP_MARGIN` starts an active HangDump extension before the deadline. The margin defaults to 30 seconds. HangDump captures the process tree and then kills the test host. Without a deadline, MTP doesn't start a deadline timer.

The deadline producer remains responsible for hard cancellation at the supplied instant.

### `TESTINGPLATFORM_WAIT_ATTACH_DEBUGGER` environment variable

When set to `1`, the test process pauses at startup and waits for a debugger to attach before proceeding. Equivalent to the `--debug` command-line option. Not supported on browser platforms.

> **Note:**
> This environment variable is available in MTP starting with version 1.6.0.

### `TESTINGPLATFORM_LAUNCH_ATTACH_DEBUGGER` environment variable

When set to `1`, the test process calls `Debugger.Launch()` at startup, which prompts the system to launch a just-in-time debugger and attach it to the process. Use this variable to debug startup-time issues (for example, server-mode handshake) that occur before you can manually attach. On non-Windows platforms, the behavior depends on the configured JIT debugger.

> **Note:**
> This environment variable is available in MTP starting with version 1.6.0.

> **Note:**
> Diagnostic-related environment variables take precedence over their corresponding `--diagnostic-*` command-line arguments.

## See also

- MTP CLI options reference
- MTP features
- Configure MSTest
- MTP troubleshooting
