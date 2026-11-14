---
title: "ICorDebugEval2 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugeval2-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugEval2 Interface

Extends "ICorDebugEval" to provide support for generic types.

## Methods

|Method|Description|
|------------|-----------------|
|CallParameterizedFunction Method|Sets up a call to the specified "ICorDebugFunction", which can be nested inside a type whose constructor takes type parameters, or can itself take type parameters.|
|CreateValueForType Method|Gets a pointer to a new "ICorDebugValue" of the specified type, with an initial value of null or zero.|
|NewParameterizedArray Method|Allocates a new array of the specified element type and dimensions.|
|NewParameterizedObject Method|Instantiates a new parameterized type object and calls the object's constructor method.|
|NewParameterizedObjectNoConstructor Method|Instantiates a new parameterized type object of the specified class without attempting to call a constructor method|
|NewStringWithLength Method|Creates a new string of the specified length with the specified contents.|
|RudeAbort Method|Aborts the computation that this `ICorDebugEval2` is currently performing.|

## Remarks

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
