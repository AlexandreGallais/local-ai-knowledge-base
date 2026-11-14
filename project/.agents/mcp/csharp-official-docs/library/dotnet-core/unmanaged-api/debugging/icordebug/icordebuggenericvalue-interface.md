---
title: "ICorDebugGenericValue Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebuggenericvalue-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugGenericValue Interface

A subclass of "ICorDebugValue" that applies to all values. This interface provides Get and Set methods for the value.

## Methods

|Method|Description|
|------------|-----------------|
|GetValue Method|Copies the value into the specified buffer.|
|SetValue Method|Copies a new value from the specified buffer.|

## Remarks

 `ICorDebugGenericValue` is a sub-interface because it is non-remotable.

For reference types, the value is the reference rather than the contents of the reference.

This interface does not support being called remotely, either cross-machine or cross-process.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
