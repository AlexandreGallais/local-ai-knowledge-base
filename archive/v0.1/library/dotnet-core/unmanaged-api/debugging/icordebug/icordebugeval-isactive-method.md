---
title: "ICorDebugEval::IsActive Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugeval-isactive-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugEval::IsActive Method

Gets a value that indicates whether this ICorDebugEval object is currently executing.

## Syntax

```cpp
HRESULT IsActive (
    [out] BOOL              *pbActive
);
```

## Parameters

 `pbActive`
 [out] Pointer to a value that indicates whether this evaluation is active.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
