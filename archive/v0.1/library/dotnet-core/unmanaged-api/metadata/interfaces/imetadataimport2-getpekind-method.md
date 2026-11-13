---
title: "IMetaDataImport2::GetPEKind Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport2-getpekind-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport2::GetPEKind Method

Gets a value identifying the nature of the code in the portable executable (PE) file, typically a DLL or EXE file, that is defined in the current metadata scope.

## Syntax

```cpp
HRESULT GetPEKind (
   [out] DWORD *pdwPEKind,
   [out] DWORD *pdwMachine
);
```

## Parameters

 `pdwPEKind`
 [out] A pointer to a value of the CorPEKind enumeration that describes the PE file.

 `pdwMachine`
 [out] A pointer to a value that identifies the architecture of the machine. See the next section for possible values.

## Remarks

 The value referenced by the `pdwMachine` parameter can be one of the following.

| Value |Machine architecture|
|-----------|--------------------------|
|IMAGE_FILE_MACHINE_I386 0x014C|x86|
|IMAGE_FILE_MACHINE_IA64 0x0200|Intel IPF|
|IMAGE_FILE_MACHINE_AMD64 0x8664|x64|

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- IMetaDataImport2 Interface
- IMetaDataImport Interface
- CorPEKind Enumeration
