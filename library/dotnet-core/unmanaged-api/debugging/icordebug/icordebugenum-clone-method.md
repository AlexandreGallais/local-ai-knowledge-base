---
title: "ICorDebugEnum::Clone Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugenum-clone-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugEnum::Clone Method

Creates a copy of this ICorDebugEnum object.

## Syntax

```cpp
HRESULT Clone (
    [out] ICorDebugEnum **ppEnum
);
```

## Parameters

 `ppEnum`
 [out] A pointer to the address of an `ICorDebugEnum` object that is a copy of this `ICorDebugEnum` object.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
