---
title: "ICorDebugExceptionObjectCallStackEnum Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugexceptionobjectcallstackenum-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugExceptionObjectCallStackEnum Interface

Provides an enumerator for call stack information that is embedded in an exception object. This interface is a subclass of the ICorDebugEnum interface.

## Methods

|Method|Description|
|------------|-----------------|
|ICorDebugExceptionObjectCallStackEnum::Next|Gets a specified number of CorDebugExceptionObjectStackFrame objects that contain information about an exception object's call stack.|

## Remarks

The `ICorDebugExceptionObjectCallStackEnum` interface implements the ICorDebugEnum interface.

An `ICorDebugExceptionObjectCallStackEnum` instance is populated with CorDebugExceptionObjectStackFrame objects by calling the ICorDebugExceptionObjectValue::EnumerateExceptionCallStack method. The call stack items in the collection can be enumerated by calling the ICorDebugExceptionObjectCallStackEnum::Next method

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5
