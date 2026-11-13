---
title: "ICorDebugClass::GetToken Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugclass-gettoken-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
