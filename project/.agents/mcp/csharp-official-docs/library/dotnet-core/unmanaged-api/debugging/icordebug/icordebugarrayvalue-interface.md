---
title: "ICorDebugArrayValue Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugarrayvalue-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugArrayValue Interface

A subclass of ICorDebugHeapValue that represents a single-dimensional or multi-dimensional array.

## Methods

|Method|Description|
|------------|-----------------|
|GetBaseIndicies Method|Gets the base index of each dimension in the array.|
|GetCount Method|Gets the total number of elements in the array.|
|GetDimensions Method|Gets the dimensions of the array.|
|GetElement Method|Gets a value representing the given element in the array.|
|GetElementAtPosition Method|Gets the element at the given position, treating the array as a zero-based, single-dimensional array.|
|GetElementType Method|Gets the simple type of the elements in the array.|
|GetRank Method|Gets the number of dimensions in the array.|
|HasBaseIndicies Method|Determines whether the array has base indexes.|

## Remarks

 `ICorDebugArrayValue` supports both single-dimensional and multi-dimensional arrays.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
