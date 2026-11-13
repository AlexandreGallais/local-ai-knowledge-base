---
title: "ICorDebugDebugEvent::GetEventKind Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugdebugevent-geteventkind-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
