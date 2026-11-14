---
title: "ICorDebugAppDomain2 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugappdomain2-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugAppDomain2 Interface

Provides methods to work with arrays, pointers, function pointers, and reference types. This interface is an extension of the ICorDebugAppDomain interface.

## Methods

|Method|Description|
|------------|-----------------|
|GetArrayOrPointerType Method|Gets an array of the specified type, or a pointer or reference to the specified type.|
|GetFunctionPointerType|Gets a pointer to a function that has a given signature.|

## Remarks

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
