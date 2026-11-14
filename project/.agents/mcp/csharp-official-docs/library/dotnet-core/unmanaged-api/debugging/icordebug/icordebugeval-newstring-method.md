---
title: "ICorDebugEval::NewString Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugeval-newstring-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugEval::NewString Method

Allocates a new string instance with the specified contents.

## Syntax

```cpp
HRESULT NewString (
    [in] LPCWSTR   string
);
```

## Parameters

 `string`
 [in] Pointer to the contents for the string.

## Remarks

The string is always created in the application domain in which the thread is currently executing.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
