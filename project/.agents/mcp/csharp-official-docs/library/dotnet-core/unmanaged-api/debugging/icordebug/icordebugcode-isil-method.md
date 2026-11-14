---
title: "ICorDebugCode::IsIL Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugcode-isil-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
