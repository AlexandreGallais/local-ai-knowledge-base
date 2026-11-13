---
title: "ICorDebugProcess5::GetTypeFields Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess5-gettypefields-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugProcess5::GetTypeFields Method

Provides information about the fields that belong to a type.

## Syntax

```cpp
HRESULT GetTypeFields(
    [in] COR_TYPEID id,
    [in] ULONG32 celt,
    [out] COR_FIELD fields[],
    [out] ULONG32 *pceltNeeded
);
```

## Parameters

 `id`
 [in] The identifier of the type whose field information is retrieved.

 `celt`
 [in] The number of COR_FIELD objects whose field information is to be retrieved.

 `fields`
 [out] An array of COR_FIELD objects that provide information about the fields that belong to the type.

 `pceltNeeded`
 [out] A pointer to the number of COR_FIELD objects included in `fields`.

## Remarks

The `celt` parameter, which specifies the number of fields whose field information the method uses to populate `fields`, should correspond to the value of the `COR_TYPE_LAYOUT::numFields` field.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5

## See also

- ICorDebugProcess5 Interface
