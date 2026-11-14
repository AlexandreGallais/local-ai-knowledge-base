---
title: "ICorDebugVariableSymbol Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugvariablesymbol-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
