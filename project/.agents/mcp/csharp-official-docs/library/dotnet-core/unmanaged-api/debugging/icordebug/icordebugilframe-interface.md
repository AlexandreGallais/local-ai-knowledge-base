---
title: "ICorDebugILFrame Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugilframe-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugILFrame Interface

Represents a stack frame of common intermediate language (CIL) code. This interface is a subclass of the ICorDebugFrame interface.

## Methods

|Method|Description|
|------------|-----------------|
|CanSetIP Method|Gets a value that indicates whether it is safe to set the instruction pointer to the specified offset location.|
|EnumerateArguments Method|Gets an enumerator for the arguments in this frame.|
|EnumerateLocalVariables Method|Gets an enumerator for the local variables in this frame.|
|GetArgument Method|Gets the value of the specified argument in this CIL stack frame.|
|GetIP Method|Gets the value of the instruction pointer and a bitwise combination value that describes how the value of the instruction pointer was obtained.|
|GetLocalVariable Method|Gets the value of the specified local variable in this CIL stack frame.|
|GetStackDepth Method|Not implemented.|
|GetStackValue Method|Not implemented.|
|SetIP Method|Sets the instruction pointer to the specified offset location in the CIL code.|

## Remarks

The `ICorDebugILFrame` interface is a specialized ICorDebugFrame interface. It is used either for CIL code frames or for just-in-time (JIT) compiled frames. The JIT-compiled frames implement both the `ICorDebugILFrame` interface and the ICorDebugNativeFrame interface.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
