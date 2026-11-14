---
title: "ICorDebugProcess5::GetTypeLayout Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess5-gettypelayout-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugProcess5::GetTypeLayout Method

Gets information about the layout of an object in memory based on its type identifier.

## Syntax

```cpp
HRESULT GetTypeLayout(    [in] COR_TYPEID id,     [out] COR_TYPE_LAYOUT *pLayout);
```

## Parameters

 `id`
 [in] A COR_TYPEID token that specifies the type whose layout is desired.

 `pLayout`
 [out] A pointer to a COR_TYPE_LAYOUT structure that contains information about the layout of the object in memory.

## Remarks

The `ICorDebugProcess5::GetTypeLayout` method provides information about an object based on its COR_TYPEID, which is returned by a number of other ICorDebugProcess5 methods. The information is provided by a COR_TYPE_LAYOUT structure that is populated by the method.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5

## See also

- COR_TYPE_LAYOUT Structure
- ICorDebugProcess5 Interface
