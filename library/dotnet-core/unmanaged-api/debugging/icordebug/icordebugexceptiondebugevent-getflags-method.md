---
title: "ICorDebugExceptionDebugEvent::GetFlags Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugexceptiondebugevent-getflags-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugExceptionDebugEvent::GetFlags Method

Gets a flag that indicates whether the exception can be intercepted.

## Syntax

```cpp
HRESULT GetFlags(
   [out] CorDebugExceptionFlags *pdwFlags
);
```

## Parameters

 `pdwFlags`
 [out] A pointer to a CorDebugExceptionFlags value that indicates whether the exception can be intercepted.

## Remarks

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugExceptionDebugEvent Interface
