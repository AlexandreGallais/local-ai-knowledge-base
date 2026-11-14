---
title: "ICorDebugObjectValue Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugobjectvalue-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugObjectValue Interface

A subclass of "ICorDebugValue" that represents a value that contains an object.

## Methods

|Method|Description|
|------------|-----------------|
|GetClass Method|Gets an interface pointer to the common language runtime (CLR) `System.Type` of the object that this `ICorDebugObjectValue` references.|
|GetContext Method|Not implemented.|
|GetFieldValue Method|Gets an interface pointer to an ICorDebugValue that represents the value of the specified field of the specified class.|
|GetManagedCopy Method|Obsolete. Do not call this method.|
|GetVirtualMethod Method|Not implemented.|
|IsValueClass Method|Gets a value that indicates whether the object referenced by this `ICorDebugObjectValue` is a value type.|
|SetFromManagedCopy Method|Obsolete. Do not call this method.|

## Remarks

An `ICorDebugObjectValue` remains valid until the process being debugged is continued.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
