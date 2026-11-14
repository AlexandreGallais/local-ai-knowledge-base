---
title: "ICorDebugValue::GetSize Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugvalue-getsize-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugValue::GetSize Method

Gets the size, in bytes, of this "ICorDebugValue" object.

## Syntax

```cpp
HRESULT GetSize (
    [out] ULONG32   *pSize
);
```

## Parameters

 `pSize`
 [out] The size, in bytes, of this value object.

## Remarks

If the value's type is a reference type, this method returns the size of the pointer rather than the size of the object.

The `ICorDebugValue::GetSize` method returns `COR_E_OVERFLOW` for objects that are larger than 4 GB on 64-bit platforms. Use the ICorDebugValue3::GetSize64 method instead for objects that are larger than 4 GB.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- GetSize64 Method
