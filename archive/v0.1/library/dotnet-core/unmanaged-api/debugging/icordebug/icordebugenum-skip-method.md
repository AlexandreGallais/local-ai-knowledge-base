---
title: "ICorDebugEnum::Skip Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugenum-skip-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugEnum::Skip Method

Moves the cursor forward in the enumeration by the specified number of items.

## Syntax

```cpp
HRESULT Skip (
    [in] ULONG celt
);
```

## Parameters

 `celt`
 [in] The number of items by which to move the cursor forward.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebugEnum Interface
