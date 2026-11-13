---
title: "ICorDebugProcess6::ProcessStateChanged Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess6-processstatechanged-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugProcess6::ProcessStateChanged Method

Notifies ICorDebug that the process is running.

## Syntax

```cpp
HRESULT ProcessStateChanged(   [in] CorDebugStateChange change);
```

## Parameters

 `change`
 [in] A member of the ProcessStateChanged enumeration

## Remarks

The debugger calls this method to notify ICorDebug that the process is running.

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugProcess6 Interface
