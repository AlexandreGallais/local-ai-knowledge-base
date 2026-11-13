---
title: "ICorDebugVariableSymbol Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugvariablesymbol-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugVariableSymbol Interface

Retrieves the debug symbol information for a variable.

## Methods

|Method|Description|
|------------|-----------------|
|GetName Method|Gets the name of a variable.|
|GetSize Method|Gets the size of a variable in bytes.|
|GetSlotIndex Method|Gets the managed slot index of a local variable.|
|GetValue Method|Gets the value of a variable as a byte array.|
|SetValue Method|Assigns the value of a byte array to a variable.|

## Remarks

> **Note:**
> This interface is available with .NET Native only. If you implement this interface for ICorDebug scenarios outside of .NET Native, the common language runtime will ignore this interface.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6
