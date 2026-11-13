---
title: "ICorDebugModule::GetToken Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule-gettoken-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugModule::GetToken <example-value>

Gets the token for the table entry for this module.

## Syntax

```cpp
HRESULT GetToken(
    [out] mdModule *pToken
);
```

## Parameters

 `pToken`
 [out] A pointer to the `mdModule` token that references the module's metadata.

## Remarks

The token can be passed to the IMetaDataImport, IMetaDataImport2, and IMetaDataAssemblyImport metadata import interfaces.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
