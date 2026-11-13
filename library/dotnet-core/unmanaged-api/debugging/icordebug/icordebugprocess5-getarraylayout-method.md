---
title: "ICorDebugProcess5::GetArrayLayout Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess5-getarraylayout-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugProcess5::GetArrayLayout Method

Provides information about the layout of array types.

## Syntax

```cpp
HRESULT GetArrayLayout(    [in] COR_TYPEID id,     [out] COR_ARRAY_LAYOUT *pLayout);
```

## Parameters

 `id`
 [in] A COR_TYPEID token that specifies the array whose layout is desired.

 `pLayout`
 [out] A pointer to a COR_ARRAY_LAYOUT structure that contains information about the layout of the array in memory.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5

## See also

- ICorDebugProcess5 Interface
