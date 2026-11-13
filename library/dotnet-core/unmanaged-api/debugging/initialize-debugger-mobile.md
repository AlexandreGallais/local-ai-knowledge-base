---
title: "How to initialize a custom debugger on mobile platforms"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/initialize-debugger-mobile.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to initialize a custom debugger on mobile platforms

Custom .NET debuggers are typically hosted in a separate process. Mobile platforms restrict or prohibit creating such processes, so the target-side custom debugger component must instead be loaded into the application process.

This article applies only to debugger initialization on mobile platforms (iOS and Android) in .NET 11 and later versions. It does not apply to NativeAOT.

## Implement and deploy the target-side component

The target-side debugger component should be implemented as a profiler dynamic library with a `DllGetClassObject` entry point. For example implementations, see the .NET profiler samples.

It should be deployed together with libmscordbi and libmscordaccore dynamic libraries as part of the application in compliance with the target platform's native library packaging, code-signing, and loading requirements.

## Load the target-side component at startup

To have CoreCLR load your component as a profiler, supply the following environment settings before the runtime starts:

| Environment variable | Value |
| --- | --- |
| `DOTNET_ENABLE_PROFILING` | `1` |
| `DOTNET_PROFILER` | `{<profiler-CLSID>}` |
| `DOTNET_PROFILER_PATH` | `<component-path>` |

Replace `<profiler-CLSID>` with your component's profiler GUID, and keep the enclosing braces. Replace `<component-path>` with the path to the native component in the target app's deployment.

For details about these settings, see Runtime configuration options for debugging and profiling.

Use your platform's app-launch configuration to supply these settings.

> **Note:**
> While this procedure uses the profiler mechanism to initialize a debugger, it doesn't establish general-purpose support for third-party profilers on mobile platforms.

## Create the debugger interface

In the target-side component, perform the following initialization:

1. Load `libmscordbi` dynamic library and call its `CoreCLRCreateCordbObjectEx` export. Query the returned object for `ICorDebug`.
2. Call ICorDebug::Initialize, and register your managed-event handler with ICorDebug::SetManagedHandler.
3. Attach to the app with ICorDebug::DebugActiveProcess.

To avoid missing early module-load and startup events, coordinate attachment with runtime startup so that managed execution doesn't proceed before `DebugActiveProcess` completes.

After initialization, use the `ICorDebug` debugger interfaces as on other Unix platforms.
