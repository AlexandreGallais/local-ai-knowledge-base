---
title: "What's new in .NET 11 runtime (part 3 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/whats-new/dotnet-11/runtime.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# What's new in .NET 11 runtime (part 3 of 3)

## File locking on iOS and tvOS

On iOS and tvOS, including simulators, CoreCLR now disables advisory file locking by default. A `System.IO.FileStream` that acquired an advisory lock could cause the operating system to terminate an app when the app entered the background while it held the lock. As a result, `System.IO.FileShare` restrictions are no longer enforced by those locks on iOS and tvOS, including between handles in the same process. Mac Catalyst and other platforms keep their existing defaults.

If your app relies on `FileShare` enforcement and you accept the risk of suspension-related termination, restore file locking by using either of the following settings:

- Set the `DOTNET_SYSTEM_IO_DISABLEFILELOCKING` environment variable to `0`.
- Set the `System.IO.DisableFileLocking` runtime configuration property to `false`. For example, in the *runtimeconfig.json* file:

  ```json
  {
    "configProperties": {
      "System.IO.DisableFileLocking": false
    }
  }
  ```

## Reliability fixes

The runtime includes fixes for the following issues:

- On Linux, the SDK no longer crashes on Red Hat Enterprise Linux (RHEL) 8 on Arm64, and the runtime correctly traverses cgroup v2 memory limits at the root of the hierarchy.
- Array marshalling to native code now produces correct values and avoids unexpected exceptions.
- Sharing Unix named mutexes with older .NET processes no longer causes spurious abandoned-mutex errors.
- On macOS, terminating a process tree no longer hangs.
- Generic virtual method dispatch no longer hangs after repeated `System.Runtime.Loader.AssemblyLoadContext` unloads.
- `System.Collections.Concurrent.ConcurrentQueue`1.TryDequeue*` no longer spuriously reports an empty queue while a segment freezes during growth. `System.Collections.Concurrent.ConcurrentQueue`1.TryPeek*` has the same reliability fix.
- On Windows, garbage collection works correctly on machines with multiple CPU groups.

## Runtime diagnostics

The async profiler now instruments both runtime-async methods and compiler-generated async state-machine methods, so tools receive one consistent event model regardless of async implementation style. The runtime also adds improved interpreter perf-map logging support, and fixes parsing of `CORECLR_NOTIFICATION_PROFILERS` lists that don't end with a semicolon.

## See also

- What's new in .NET libraries for .NET 11
- What's new in the SDK for .NET 11
- Breaking changes in .NET 11
