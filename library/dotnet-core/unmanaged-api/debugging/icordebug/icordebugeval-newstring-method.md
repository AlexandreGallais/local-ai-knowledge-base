---
title: "ICorDebugEval::NewString Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugeval-newstring-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
