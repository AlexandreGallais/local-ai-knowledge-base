---
title: "ICorDebugChain::IsManaged Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugchain-ismanaged-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugChain::IsManaged Method

Gets a value that indicates whether this chain is running managed code.

## Syntax

```cpp
HRESULT IsManaged (
    [out] BOOL               *pManaged
);
```

## Parameters

 `pManaged`
 [out] `true` if this chain is running managed code; otherwise, `false`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
