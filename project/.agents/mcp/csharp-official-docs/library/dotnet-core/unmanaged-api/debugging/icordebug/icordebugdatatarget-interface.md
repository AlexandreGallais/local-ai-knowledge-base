---
title: "ICorDebugDataTarget Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugdatatarget-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugDataTarget Interface

Provides a callback interface that provides access to a particular target process.

## Methods

| Method | Description |
|--------|-------------|
|GetPlatform Method|Provides information about the platform, including processor architecture and operating system, on which the target process is running.|
|ReadVirtual Method|Gets a block of contiguous memory starting at the specified address, and returns it in the supplied buffer.|
|GetThreadContext Method|Requests the current thread context for the specified thread.|

## Remarks

 `ICorDebugDataTarget` and its methods have the following characteristics:

- The debugging services call methods on this interface to access memory and other data in the target process.
- The debugger client must implement this interface as appropriate for the particular target (for example, a live process or a memory dump).
- The `ICorDebugDataTarget` methods can be invoked only from within methods implemented in other `ICorDebug*` interfaces. This ensures that the debugger client has control over which thread it is invoked on, and when.
- The `ICorDebugDataTarget` implementation must always return up-to-date information about the target.

The target process should be stopped and not changed in any way while `ICorDebug*` interfaces (and therefore `ICorDebugDataTarget` methods) are being called. If the target is a live process and its state changes, the ICLRDebugging::OpenVirtualProcess method has to be called again to provide a replacement `ICorDebugProcess` instance.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0
