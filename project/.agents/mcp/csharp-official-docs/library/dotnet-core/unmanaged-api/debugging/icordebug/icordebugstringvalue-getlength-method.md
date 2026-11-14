---
title: "ICorDebugStringValue::GetLength Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugstringvalue-getlength-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugStringValue::GetLength Method

Gets the number of characters in the string referenced by this ICorDebugStringValue.

## Syntax

```cpp
HRESULT GetLength (
    [out] ULONG32   *pcchString
);
```

## Parameters

 `pcchString`
 [out] A pointer to a value that specifies the length of the string referenced by this `ICorDebugStringValue` object.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
