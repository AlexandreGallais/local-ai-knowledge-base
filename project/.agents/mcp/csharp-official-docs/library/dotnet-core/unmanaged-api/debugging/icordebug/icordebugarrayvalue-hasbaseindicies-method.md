---
title: "ICorDebugArrayValue::HasBaseIndicies Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugarrayvalue-hasbaseindicies-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugArrayValue::HasBaseIndicies Method

Gets a value that indicates whether any dimensions of this array have a base index of non-zero.

## Syntax

```cpp
HRESULT HasBaseIndicies (
    [out] BOOL    *pbHasBaseIndicies
);
```

## Parameters

 `pbHasBaseIndicies`
 [out] A pointer to a Boolean value that is `true` if one or more dimensions of this `ICorDebugArrayValue` object have a base index of non-zero; otherwise, the Boolean value is `false`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.1
