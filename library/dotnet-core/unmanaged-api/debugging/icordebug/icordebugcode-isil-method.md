---
title: "ICorDebugCode::IsIL Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugcode-isil-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugCode::IsIL Method

Gets a value that indicates whether this "ICorDebugCode" represents code that was compiled in common intermediate language (CIL).

## Syntax

```cpp
HRESULT IsIL (
    [out] BOOL       *pbIL
);
```

## Parameters

`pbIL`
[out] `true` if this `ICorDebugCode` represents code that was compiled in CIL; otherwise, `false`.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorDebug.idl, CorDebug.h

**Library:** CorGuids.lib

**.NET versions:** Available since .NET Framework 1.0
