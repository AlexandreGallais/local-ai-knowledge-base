---
title: "ICorDebugExceptionDebugEvent::GetFlags Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugexceptiondebugevent-getflags-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
