---
title: "ICorDebugDebugEvent::GetEventKind Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugdebugevent-geteventkind-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugDebugEvent::GetEventKind Method

Indicates what kind of event this `ICorDebugDebugEvent` object represents.

## Syntax

```cpp
HRESULT GetEventKind(
    [out]CorDebugDebugEventKind *pDebugEventKind
);
```

## Parameters

pDebugEventKind
A pointer to a CorDebugDebugEventKind enumeration member that indicates the type of event.

## Remarks

Based on the value of `pDebugEventKind`, you can call `QueryInterface` to get a more precise debug event interface that has additional data.

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugDebugEvent Interface
