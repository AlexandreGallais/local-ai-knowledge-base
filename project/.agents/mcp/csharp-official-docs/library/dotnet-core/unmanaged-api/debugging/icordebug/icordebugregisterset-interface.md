---
title: "ICorDebugRegisterSet Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugregisterset-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugRegisterSet Interface

Represents the set of registers available on the computer that is currently executing code.

## Methods

| Method                                                                     | Description                             |
|----------------------------------------------------------------------------|-----------------------------------------|
| GetRegisters Method         | Gets the value of each register (on the computer that's currently executing code) that's specified by the bit mask. |
| GetRegistersAvailable Method | Gets a bit mask indicating which registers in this `ICorDebugRegisterSet` are currently available. |
| GetThreadContext Method | Gets the context of the current thread. |
| SetRegisters Method         | Not implemented.                        |
| SetThreadContext Method | Not implemented.                        |

## Remarks

The `ICorDebugRegisterSet` interface supports only 32-bit registers. Use the ICorDebugRegisterSet2 interface on platforms such as IA-64 that require additional registers.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebugRegisterSet2 Interface
