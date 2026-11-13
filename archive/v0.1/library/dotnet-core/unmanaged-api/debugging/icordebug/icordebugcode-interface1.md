---
title: "ICorDebugCode Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugcode-interface1.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugCode Interface

Represents a segment of either common intermediate language (CIL) code or native code.

## Methods

|Method|Description|
|------------|-----------------|
|CreateBreakpoint Method|Creates a breakpoint at the specified offset.|
|GetAddress Method|Gets the relative virtual address (RVA) of the code segment that this `ICorDebugCode` represents.|
|GetCode Method|Gets all the code for the specified function, formatted for disassembly. This method has been deprecated; use ICorDebugCode2::GetCodeChunks instead.|
|GetEnCRemapSequencePoints Method|Not implemented.|
|GetFunction Method|Gets the "ICorDebugFunction" associated with this `ICorDebugCode`.|
|GetILToNativeMapping Method|Gets an array of "COR_DEBUG_IL_TO_NATIVE_MAP" instances that represent mappings from CIL offsets to native offsets.|
|GetSize Method|Gets the size, in bytes, of the binary code represented by this `ICorDebugCode`.|
|GetVersionNumber Method|Gets the one-based number that identifies the version of the code that this `ICorDebugCode` represents.|
|IsIL Method|Gets a value that indicates whether this `ICorDebugCode` is compiled in CIL.|

## Remarks

 `ICorDebugCode` can represent either CIL or native code. An "ICorDebugFunction" object that represents CIL code can have either zero or one `ICorDebugCode` objects associated with it. An "ICorDebugFunction" object that represents native code can have any number of `ICorDebugCode` objects associated with it.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebugCode3 Interface
