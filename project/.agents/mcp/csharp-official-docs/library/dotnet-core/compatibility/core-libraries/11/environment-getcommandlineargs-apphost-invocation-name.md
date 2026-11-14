---
title: "Breaking change: Environment.GetCommandLineArgs()[0] preserves the apphost invocation name"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/11/environment-getcommandlineargs-apphost-invocation-name.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Environment.GetCommandLineArgs()[0] preserves the apphost invocation name

When you launch an app through its apphost, `System.Environment.GetCommandLineArgs` now preserves the invocation name, including a relative path or symlink name. The behavior for `dotnet <application.dll>` is unchanged.

## Version introduced

.NET 11

## Previous behavior

Previously, when you launched an app through its apphost, `Environment.GetCommandLineArgs()[0]` returned the managed assembly path or the resolved executable path, rather than the invocation name.

## New behavior

Starting in .NET 11, when you launch an app through its apphost, `Environment.GetCommandLineArgs()[0]` preserves the invocation name, including relative paths and symlink names. For example, if `special_myapp` is a symlink to `myapp`, and you run `./special_myapp`, the value is `./special_myapp`.

When you launch an app with `dotnet <application.dll>`, the behavior is unchanged.

## Type of breaking change

This change is a behavioral change.

## Reason for change

To align .NET with native process behavior, the runtime now preserves the value of `argv[0]` supplied at launch. This behavior also lets an app distinguish which symlink name launched it.

## Recommended action

To get the executable path, use `System.Environment.ProcessPath`. To get the managed entry assembly location, use `Assembly.GetEntryAssembly()?.Location` (see `System.Reflection.Assembly.GetEntryAssembly` and `System.Reflection.Assembly.Location`). The location is an empty string for bundled assemblies in single-file apps. Keep using `Environment.GetCommandLineArgs()[0]` when you need the invocation name.

## Affected APIs

- `System.Environment.GetCommandLineArgs`
