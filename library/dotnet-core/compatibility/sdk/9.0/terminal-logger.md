---
title: "Breaking change: Terminal Logger is default"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/sdk/9.0/terminal-logger.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Terminal Logger is default

Terminal Logger is now enabled by default for all "interactive" terminal sessions. Terminal Logger formats the console output for builds differently to the console logger. For more information about Terminal Logger, see 'dotnet build' options, specifically the `--tl` option.

## Previous behavior

`dotnet build` and other build-related CLI commands used the 'minimal' verbosity MSBuild console logger by default for user-driven builds.

## New behavior

If the terminal supports various layout and colorization features, `dotnet build` and other build-related CLI commands use Terminal Logger by default for user-triggered builds. If the command is part of a shell script or has had input or output redirected in any way, or if the terminal doesn't support some of the enhanced layout features that Terminal Logger has, then Terminal Logger isn't used.

## Version introduced

.NET 9 Preview 1

## Type of breaking change

This change is a behavioral change.

## Reason for change

Terminal Logger output about the progress of a build is more information dense and actionable than the console logger output. The MSBuild team wants to encourage the use of Terminal Logger early in the .NET 9 release cycle so that there's time to gather feedback about the quality and functionality of the feature.

## Recommended action

If you need to revert to the console logger, you can disable Terminal Logger in the following ways:

- To disable Terminal Logger for a specific command, specify `--tl:off` on the command line or via an MSBuild response file.
- To disable Terminal Logger for all commands, set the `MSBUILDTERMINALLOGGER` environment variable to `off`.

## Affected APIs

N/A

## See also

- 'dotnet build' options
- Terminal Logger
