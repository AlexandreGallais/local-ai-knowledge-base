---
title: "ICorDebugValue3::GetSize64 Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugvalue3-getsize64-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugValue3::GetSize64 Method

Gets the size, in bytes, of this ICorDebugValue3 object.

## Syntax

```cpp
HRESULT GetSize64(
    [out] ULONG64 *pSize
);
```

## Parameters

pSize
 [out] A pointer to the size, in bytes, of this object.

## Remarks

If this value's type is a reference type, this method returns the size of the pointer rather than the size of the object.

The `ICorDebugValue3::GetSize` method differs from the ICorDebugValue::GetSize method in the type of its output parameter. In ICorDebugValue::GetSize, the output parameter is a `ULONG32`; in `ICorDebugValue3::GetSize`, it is a `ULONG64`. This enables the ICorDebugValue3 interface to report the size of arrays that exceed 2GB.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5

## See also

- ICorDebugValue3 Interface
