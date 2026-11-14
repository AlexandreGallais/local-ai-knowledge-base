---
title: "IMetaDataValidate::ValidatorInit Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadatavalidate-validatorinit-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataValidate::ValidatorInit Method

Sets a flag that specifies the type of the module in the current metadata scope, and registers the specified callback method for validation errors.

## Syntax

```cpp
HRESULT ValidatorInit (
   [in] DWORD       dwModuleType,
   [in] IUnknown    *pUnk
);
```

## Parameters

 `dwModule`
 [in] A value of the CorValidatorModuleType enumeration that specifies the type of the module in the current metadata scope.

 `pUnk`
 [in] A pointer to an IUnknown instance that serves as a function callback for validation errors.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataValidate Interface
