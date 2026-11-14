---
title: "ICorDebugRegisterSet2 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugregisterset2-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugRegisterSet2 Interface

Extends the capabilities of the ICorDebugRegisterSet interface for hardware platforms that have more than 64 registers.

## Methods

|Method|Description|
|------------|-----------------|
|GetRegisters Method|Gets the value of each register (on the computer that is currently executing code) that is specified by the bit mask.|
|GetRegistersAvailable Method|Gets an array of bytes that provides a bitmap of the available registers.|
|SetRegisters Method|Not implemented.|

## Remarks

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- ICorDebugRegisterSet Interface
