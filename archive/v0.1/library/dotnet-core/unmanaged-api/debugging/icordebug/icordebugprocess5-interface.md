---
title: "ICorDebugProcess5 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess5-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugProcess5 Interface

Extends the ICorDebugProcess interface to support access to the managed heap, to provide information about garbage collection of managed objects, and to determine whether a debugger loads images from the application local native image cache.

## Methods

|Method|Description|
|------------|-----------------|
|EnableNGenPolicy Method|Sets a value that determines how an application loads native images while running under a managed debugger.|
|EnumerateGCReferences Method|Gets an enumerator for all objects that are to be garbage-collected in a process.|
|EnumerateHandles Method|Gets an enumerator for object handles in a process.|
|EnumerateHeap Method|Gets an enumerator for objects on the managed heap.|
|EnumerateHeapRegions Method|Gets an enumerator for regions of the managed heap.|
|GetArrayLayout Method|Gets information about the layout of an array in memory.|
|GetGCHeapInformation Method|Gets a pointer to a COR_HEAPINFO structure that contains information about objects that are to be garbage-collected on the managed heap.|
|GetObject Method|Gets a pointer to an object on the managed heap.|
|GetTypeFields Method|Gets a pointer to an array that contains field information for a type based on its type identifier.|
|GetTypeForTypeID Method|Gets a type object that provides information about an object based on its type identifiers.|
|GetTypeID Method|Gets the type identifier for the object at a specified address.|
|GetTypeLayout Method|Gets information about the layout of an object in memory based on its type identifier.|

## Remarks

This interface logically extends the ICorDebugProcess, ICorDebugProcess2, and ICorDebugProcess3 interfaces.

> **Note:**
> This interface does not support being called remotely, either from another machine or from another process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5
