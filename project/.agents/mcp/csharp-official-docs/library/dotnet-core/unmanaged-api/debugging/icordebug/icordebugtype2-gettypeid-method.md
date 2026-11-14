---
title: "ICorDebugType2::GetTypeID Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugtype2-gettypeid-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugType2::GetTypeID Method

Gets a COR_TYPEID for this type.

## Syntax

```cpp
HRESULT GetTypeID(
    ([out] COR_TYPEID *id
);
```

## Parameters

 `id`
 [out] A pointer to the COR_TYPEID for this ICorDebugType.

## Return Value

The return value is `S_OK` on success, or a failure `HRESULT` code on failure. The `HRESULT` codes include the following:

|Return code|Description|
|-----------------|-----------------|
|`S_OK`|Method succeeded. The method has retrieved a valid COR_TYPEID.|
|`CORDBG_E_CLASS_NOT_LOADED`|The type has not been loaded.|
|`CORDBG_E_UNSUPPORTED`|The type is not supported.|

## Remarks

This method provides a mapping from the ICorDebugType, which represents a type that may or may not have been loaded into the runtime, to a COR_TYPEID, which serves as an opaque handle that identifies a type loaded into the runtime.

When the type that the ICorDebugType represents has not yet been loaded, this method returns `CORDBG_E_CLASS_NOT_LOADED`.  If the type is not supported, it returns `CORDBG_E_UNSUPPORTED`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6.2

## See also

- ICorDebugType2 Interface
