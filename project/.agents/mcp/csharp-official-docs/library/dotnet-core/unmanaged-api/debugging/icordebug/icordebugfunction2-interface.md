---
title: "ICorDebugFunction2 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugfunction2-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugFunction2 Interface

Logically extends the ICorDebugFunction interface to provide support for Just My Code step-through debugging, which skips non-user code.

## Methods

|Method|Description|
|------------|-----------------|
|EnumerateNativeCode Method|(Not yet implemented.) Gets an interface pointer to an ICorDebugCodeEnum that contains the native code statements in the function referenced by this ICorDebugFunction2 object.|
|GetJMCStatus Method|Gets a value that indicates whether this function is marked as user code.|
|GetVersionNumber Method|Gets the Edit and Continue version of this function.|
|SetJMCStatus Method|Marks this function for Just My Code stepping.|

## Remarks

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
