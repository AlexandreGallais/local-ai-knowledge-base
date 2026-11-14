---
title: "ICorDebugClass::GetToken Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugclass-gettoken-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugClass::GetToken <example-value>

Gets the `TypeDef` metadata token that references the definition of this class.

## Syntax

```cpp
HRESULT GetToken (
    [out] mdTypeDef          *pTypeDef
);
```

## Parameters

 `pTypeDef`
 [out] A pointer to an `mdTypeDef` token that references the definition of this class.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- Metadata interfaces
