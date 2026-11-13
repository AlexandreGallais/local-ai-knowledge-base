---
title: "ICorDebugDebugEvent Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugdebugevent-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugDebugEvent Interface

Defines the base interface from which all `ICorDebug` debug events derive.

## Methods

| Method | Description |
|--------|-------------|
|GetEventKind Method|Indicates what kind of event this `ICorDebugDebugEvent` object represents.|
|GetThread Method|Gets the thread on which the event occurred.|

## Remarks

The following interfaces are derived from the `ICorDebugDebugEvent` interface:

- ICorDebugExceptionDebugEvent
- ICorDebugModuleDebugEvent

> **Note:**
> The interface is available with .NET Native only. Attempting to call `QueryInterface` to retrieve an interface pointer returns `E_NOINTERFACE` for ICorDebug scenarios outside of .NET Native.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6
